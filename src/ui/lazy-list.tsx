/**
 * Author: Edward Jones
 */
import { ApolloQueryResult, DocumentNode, QueryResult, useQuery } from '@apollo/client'
import { ReactNode, useEffect, useState } from 'react'
import { FlatList, FlatListProps, View } from 'react-native'
import { Spinner, Text } from '@ui-kitten/components'
import { EmptyState } from './empty-state'
import { Callout } from './callout'

export interface UseLazyListProps<TVariables, TData> {
  query: DocumentNode
  variables: Partial<Omit<TVariables, 'offset' | 'limit'>>
  dataKey: keyof TData
  limit?: number
}

interface UseListRefetchResult {
  isRefetching: boolean
  refetch: () => Promise<void>
}

/**
 * Hook that manages refreshing state for lists
 */
export function useListRefetch<TData, TVariables>(
  refetchFunction: (variables?: Partial<TVariables> | undefined) => Promise<ApolloQueryResult<TData>>
): UseListRefetchResult {
  const [isRefetching, setIsRefetching] = useState(false)
  const refetch = async () => {
    setIsRefetching(true)
    const { data } = await refetchFunction()
    if (data) {
      setIsRefetching(false)
    }
  }

  return { isRefetching, refetch }
}

interface UseLazyListResult<TData, TVariables, TDataType>
  extends Omit<QueryResult<TData, TVariables>, 'refetch' | 'data'>,
    UseListRefetchResult {
  data: TDataType[]
  nextPage: () => Promise<void>
  isDone: boolean
  isLoading: boolean
}

/**
 * Hook that manages stateful logic for lazy list components
 */
export function useLazyList<
  TData extends TDataWithData<TData, TDataType>,
  TVariables extends Partial<CommonVariables<TSortType, TFilterType>>,
  TDataType,
  TSortType,
  TFilterType
>({
  query,
  variables,
  dataKey,
  limit = 10,
}: UseLazyListProps<TVariables, TData>): UseLazyListResult<TData, TVariables, TDataType> {
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    setIsDone(false)
  }, [variables])

  const queryResult = useQuery<TData, TVariables>(query, {
    variables: {
      ...variables,
      offset: 0,
      limit,
    } as TVariables,
    onCompleted: (data) => {
      if ((data[dataKey].data?.length ?? limit) < limit) {
        setIsDone(true)
      } else {
        void queryResult
          .fetchMore<TData, TVariables>({
            variables: {
              ...variables,
              offset: data[dataKey]?.data?.length ?? limit,
              limit,
            } as TVariables,
          })
          .then((data) => {
            if (data.data[dataKey].data?.length === 0) {
              setIsDone(true)
            }
          })
      }
    },
  })

  async function nextPage() {
    if (!isDone) {
      const result = await queryResult.fetchMore<TData, TVariables>({
        variables: {
          ...variables,
          offset: queryResult?.data?.[dataKey]?.data?.length,
          limit,
        } as TVariables,
        updateQuery: (prev, { fetchMoreResult }) => {
          const merged = {
            ...prev,
            [dataKey]: {
              error: null,
              data: [...(prev?.[dataKey]?.data ?? []), ...(fetchMoreResult?.[dataKey]?.data ?? [])],
            },
          }
          return merged
        },
      })
      const d = result.data[dataKey]?.data
      if (d) {
        if (d.length === 0) {
          setIsDone(true)
        }
      }
    }
  }

  const { refetch, isRefetching } = useListRefetch(queryResult.refetch)

  return {
    ...queryResult,
    isLoading: queryResult.loading,
    refetch,
    isRefetching,
    data: queryResult?.data?.[dataKey]?.data ?? [],
    nextPage,
    isDone,
  }
}

export type TDataWithData<TData, TDataType> = {
  [key in keyof TData]: {
    data: TDataType[] | null
  }
}

export interface CommonVariables<TSortType, TFilterType> {
  offset: number
  limit: number
  query: string
  sort: TSortType
  filter: TFilterType
}

export interface LazyListProps<TData, TVariables, TDataType>
  extends UseLazyListProps<TVariables, TData>,
    Omit<FlatListProps<TDataType>, 'data'> {
  emptyMessage?: string
  emptyState?: ReactNode
}

/**
 * Component that renders the result of a GraphQL query as an infinite scrolling list.
 */
export function LazyList<
  TData extends TDataWithData<TData, TDataType>,
  TVariables extends Partial<CommonVariables<TSortType, TFilterType>>,
  TDataType,
  TSortType,
  TFilterType
>({
  query,
  variables,
  dataKey,
  renderItem,
  emptyMessage,
  emptyState,
  limit,
  ListFooterComponent,
  ...props
}: LazyListProps<TData, TVariables, TDataType>) {
  const { isLoading, error, data, refetch, isRefetching, nextPage, isDone } = useLazyList<
    TData,
    TVariables,
    TDataType,
    TSortType,
    TFilterType
  >({
    query,
    variables,
    dataKey,
    limit,
  })

  if (error) {
    return (
      <>
        {props.ListHeaderComponent}
        <Callout message='There was an error' type='danger' />
      </>
    )
  }

  return (
    <FlatList
      ListEmptyComponent={
        <View style={{ flexGrow: 1, justifyContent: 'center' }}>
          {isLoading ? (
            <View style={{ alignItems: 'center' }}>
              <Spinner />
            </View>
          ) : (
            <EmptyState description={emptyMessage} />
          )}
        </View>
      }
      {...props}
      initialNumToRender={limit}
      refreshing={isRefetching}
      onRefresh={() => void refetch()}
      onEndReached={() => void nextPage()}
      onEndReachedThreshold={0.5}
      data={data}
      extraData={data}
      renderItem={renderItem}
      keyExtractor={(_item, index) => index.toString()}
      contentContainerStyle={{ flexGrow: 1 }}
      ListFooterComponent={
        ListFooterComponent ||
        (data.length > 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 16,
            }}
          >
            {!isDone ? <Spinner /> : <Text style={{ marginVertical: 16 }}>Found {data.length} items.</Text>}
          </View>
        ) : undefined)
      }
    />
  )
}
