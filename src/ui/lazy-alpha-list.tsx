/**
 * Author: Edward Jones
 */
import { ReactElement } from 'react'
import { CommonVariables, TDataWithData, useLazyList, UseLazyListProps } from './lazy-list'
import { LoadingScreen } from './loading-screen'
import { AlphaList, AlphaListProps, buildAlphaListItems, CategoriseItem } from './alpha-list'

interface LazyListAlphaProps<TData, TVariables, TDataType>
  extends Omit<AlphaListProps<TDataType>, 'items'>,
    UseLazyListProps<TVariables, TData> {
  renderItem: (props: TDataType) => ReactElement | null
  categoriseItem: CategoriseItem<TDataType>
}

/**
 * Component that takes the result of a GraphQL query and renders it as an infinite scrolling alphabetised list
 */
export function LazyListAlpha<
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
  categoriseItem,
  limit = 15,
  ...props
}: LazyListAlphaProps<TData, TVariables, TDataType>) {
  const { isLoading, data, nextPage } = useLazyList<TData, TVariables, TDataType, TSortType, TFilterType>({
    query,
    variables,
    dataKey,
    limit,
  })

  if (isLoading) {
    return <LoadingScreen />
  }
  const items = buildAlphaListItems({
    items: data,
    categoriseItem,
  })

  return (
    <AlphaList
      {...props}
      onEndReached={() => void nextPage()}
      onEndReachedThreshold={0.5}
      items={items}
      renderItem={renderItem}
    />
  )
}
