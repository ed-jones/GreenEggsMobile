import { DocumentNode, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import Alert from "./alert/Alert";
import LoadingScreen from "../screens/loading/LoadingScreen";
import { ListRenderItem } from "react-native";

type TDataWithData<TData, TDataType> = {
  [key in keyof TData]: {
    data: TDataType[] | null;
  };
};

interface CommonVariables<SortType, FilterType> {
  offset: number;
  limit: number;
  query: string;
  sort: SortType;
  filter: FilterType;
}

interface LazyListProps<TData, TVariables, TDataType> {
  query: DocumentNode;
  variables: Partial<Omit<TVariables, "offset" | "limit">>;
  dataKey: keyof TData;
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
  const [done, setDone] = useState(false);
  const limit = 2;
  const [data, setData] = useState<TDataType[]>([]);

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
    setDone(false);
  }, [variables.query]);

  if (queryResult.loading) {
    return <LoadingScreen />;
  }

  if (queryResult.error) {
    return <Alert message="There was an error" type="danger" />;
  }

  if (data === null || data === undefined) {
    return (
      <Alert
        style={{ marginHorizontal: 16 }}
        message={emptyMessage}
        type="info"
      />
    );
  }

  if (data.length === 0) {
    return (
      <Alert
        style={{ marginHorizontal: 16 }}
        message={errorMessage}
        type="info"
      />
    );
  }

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

  return (
    <FlatList
      onEndReached={() => nextPage()}
      onEndReachedThreshold={0.5}
      data={data}
      renderItem={renderItem}
    />
  );
};

export default LazyList;
