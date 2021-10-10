import { ApolloQueryResult, DocumentNode, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Callout } from "@greeneggs/ui";
import LoadingScreen from "../screens/loading/LoadingScreen";
import { ListRenderItem } from "react-native";

export function useListRefresh<TData, TVariables>(
  refetch: (
    variables?: Partial<TVariables> | undefined
  ) => Promise<ApolloQueryResult<TData>>
) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    const result = await refetch();
    if (result.data) {
      setRefreshing(false);
    }
  };

  return { refreshing, onRefresh };
}

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
>({ query, variables, dataKey, limit = 2 }: UseLazyListProps<TVariables, TData>) {
  const [done, setDone] = useState(false);
  const [data, setData] = useState<TDataType[]>([]);

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

  return { ...queryResult, data, nextPage };
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
  extends UseLazyListProps<TVariables, TData> {
  renderItem: ListRenderItem<TDataType>;
  emptyMessage: string;
  errorMessage: string;
}

const LazyList = <
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
}: LazyListProps<TData, TVariables, TDataType>) => {
  const { loading, error, data, refetch, nextPage } = useLazyList<
    TData,
    TVariables,
    TDataType,
    SortType,
    FilterType
  >({ query, variables, dataKey });
  const { refreshing, onRefresh } = useListRefresh(refetch);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <Callout message="There was an error" type="danger" />;
  }

  if (data === null || data === undefined) {
    return (
      <Callout
        style={{ marginHorizontal: 16 }}
        message={emptyMessage}
        type="info"
      />
    );
  }

  if (data.length === 0) {
    return (
      <Callout
        style={{ marginHorizontal: 16 }}
        message={errorMessage}
        type="info"
      />
    );
  }

  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={() => nextPage()}
      onEndReachedThreshold={0.5}
      data={data}
      renderItem={renderItem}
      keyExtractor={(_item, index) => index.toString()}
    />
  );
};

export default LazyList;
