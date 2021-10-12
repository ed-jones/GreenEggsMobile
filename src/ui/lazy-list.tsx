import { ApolloQueryResult, DocumentNode, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FlatList, FlatListProps, View } from "react-native";
import { Callout } from "@greeneggs/ui";
import { LoadingScreen } from "../screens/loading-screen";
import { ListRenderItem } from "react-native";
import { Spinner } from "@ui-kitten/components";

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
  limit = 2,
}: UseLazyListProps<TVariables, TData>) {
  const [done, setDone] = useState(false);
  const [data, setData] = useState<TDataType[]>([]);
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
      const d = data[dataKey]?.data;
      if (d) {
        setData(d);
      }
    },
  });

  useEffect(() => {
    const d = queryResult.data?.[dataKey]?.data;
    if (d) {
      setData(d);
    }
  }, [queryResult.data]);

  async function nextPage() {
    if (!done) {
      const result = await queryResult.fetchMore<TData, TVariables>({
        variables: {
          ...variables,
          offset: data.length,
          limit,
        } as TVariables,
      });
      const d = result.data[dataKey]?.data;
      if (d) {
        if (d.length === 0) {
          setDone(true);
        } else {
          setData([...data, ...d]);
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

  return { ...queryResult, refetch, refetching, data, nextPage, done };
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
  errorMessage: string;
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
  errorMessage,
  ...props
}: LazyListProps<TData, TVariables, TDataType>) => {
  const { loading, error, data, refetch, refetching, nextPage, done } =
    useLazyList<TData, TVariables, TDataType, SortType, FilterType>({
      query,
      variables,
      dataKey,
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
      refreshing={refetching}
      onRefresh={refetch}
      onEndReached={() => nextPage()}
      onEndReachedThreshold={0.5}
      data={data}
      extraData={data}
      renderItem={renderItem}
      keyExtractor={(_item, index) => index.toString()}
      ListEmptyComponent={
        <Callout
          style={{ marginHorizontal: 16 }}
          message={errorMessage}
          type="info"
        />
      }
      ListFooterComponent={
        !done && data.length > 0 ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <Spinner />
          </View>
        ) : undefined
      }
    />
  );
};
