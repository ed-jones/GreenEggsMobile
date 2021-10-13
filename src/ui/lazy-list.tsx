import { DocumentNode, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FlatList, FlatListProps, View } from "react-native";
import { Callout } from "@greeneggs/ui";
import { Spinner, Text } from "@ui-kitten/components";
import { EmptyState } from "./empty-state";

interface UseLazyListProps<TVariables, TData> {
  query: DocumentNode;
  variables: Partial<Omit<TVariables, "offset" | "limit">>;
  dataKey: keyof TData;
  limit?: number;
}

export function useLazyList<
  TData extends TDataWithData<TData, TDataType>,
  TVariables extends Partial<CommonVariables<SortType, FilterType>>,
  TDataType,
  SortType,
  FilterType
>({
  query,
  variables,
  dataKey,
  limit = 5,
}: UseLazyListProps<TVariables, TData>) {
  const [done, setDone] = useState(false);
  const [refetching, setRefetching] = useState(false);

  useEffect(() => {
    setDone(false);
  }, [variables]);

  const queryResult = useQuery<TData, TVariables>(query, {
    variables: {
      ...variables,
      offset: 0,
      limit,
    } as TVariables,
    onCompleted: (data) => {
      if ((data[dataKey].data?.length ?? limit) < limit) {
        setDone(true);
      } else {
        queryResult.fetchMore<TData, TVariables>({
          variables: {
            ...variables,
            offset: data[dataKey]?.data?.length ?? limit,
            limit,
          } as TVariables,
        }).then((data) => {
          console.log(data)
          if (data.data[dataKey].data?.length === 0 ) {
            setDone(true);
          }
        })
      }
    }
  });

  async function nextPage() {
    if (!done) {
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
              data: [
                ...(prev?.[dataKey]?.data ?? []),
                ...(fetchMoreResult?.[dataKey]?.data ?? []),
              ],
            },
          };
          return merged;
        },
      });
      const d = result.data[dataKey]?.data;
      if (d) {
        if (d.length === 0) {
          setDone(true);
        }
      }
    }
  }

  const refetch = async () => {
    setRefetching(true);
    const { data } = await queryResult.refetch();
    if (data) {
      setRefetching(false);
    }
  };

  return {
    ...queryResult,
    refetch,
    refetching,
    data: queryResult?.data?.[dataKey]?.data ?? [],
    nextPage,
    done,
  };
}

export type TDataWithData<TData, TDataType> = {
  [key in keyof TData]: {
    data: TDataType[] | null;
  };
};

export interface CommonVariables<SortType, FilterType> {
  offset: number;
  limit: number;
  query: string;
  sort: SortType;
  filter: FilterType;
}

export interface LazyListProps<TData, TVariables, TDataType>
  extends UseLazyListProps<TVariables, TData>,
    Omit<FlatListProps<TDataType>, "data"> {
  emptyMessage: string;
}

export const LazyList = <
  TData extends TDataWithData<TData, TDataType>,
  TVariables extends Partial<CommonVariables<SortType, FilterType>>,
  TDataType,
  SortType,
  FilterType
>({
  query,
  variables,
  dataKey,
  renderItem,
  emptyMessage,
  limit,
  ...props
}: LazyListProps<TData, TVariables, TDataType>) => {
  const { loading, error, data, refetch, refetching, nextPage, done } =
    useLazyList<TData, TVariables, TDataType, SortType, FilterType>({
      query,
      variables,
      dataKey,
      limit,
    });

  if (error) {
    return (
      <>
        {props.ListHeaderComponent}
        <Callout message="There was an error" type="danger" />
      </>
    );
  }

  return (
    <FlatList
      {...props}
      initialNumToRender={limit}
      refreshing={refetching}
      onRefresh={refetch}
      onEndReached={() => nextPage()}
      onEndReachedThreshold={0.5}
      data={data}
      extraData={data}
      renderItem={renderItem}
      keyExtractor={(_item, index) => index.toString()}
      contentContainerStyle={{ flexGrow: 1 }}
      ListEmptyComponent={
        <View style={{ flexGrow: 1, justifyContent: "center" }}>
          {loading ? (
            <View style={{ alignItems: "center" }}>
              <Spinner />
            </View>
          ) : (
            <EmptyState title="Nothing here!" description={emptyMessage} />
          )}
        </View>
      }
      ListFooterComponent={
        data.length > 0 ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 16,
            }}
          >
            {!done ? (
              <Spinner />
            ) : (
              <Text style={{ marginVertical: 16 }}>
                Found {data.length} items.
              </Text>
            )}
          </View>
        ) : undefined
      }
    />
  );
};
