import { DocumentNode, useQuery } from "@apollo/client";
import { RecipeFilter, Sort } from "@greeneggs/types/graphql";
import React, { ReactElement, useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import Alert from "./alert/Alert";
import LoadingScreen from "../screens/loading/LoadingScreen";
import { ListRenderItem } from "react-native";

interface TDataWithData<TDataType> {
  [key: string]: {
    data: TDataType[];
  };
}

interface CommonVariables {
  offset: number;
  limit: number;
  query: string;
  sort: Sort;
  filter: RecipeFilter;
}

interface LazyListProps<TData, TVariables, TDataType> {
  query: DocumentNode;
  variables: TVariables;
  key: keyof TData;
  renderItem: ListRenderItem<TDataType>;
}

const LazyList = <
  TData extends TDataWithData<TDataType>,
  TVariables extends CommonVariables,
  TDataType
>({
  query,
  variables,
  key,
  renderItem,
}: LazyListProps<TData, TVariables, TDataType>) => {
  const [done, setDone] = useState(false);
  const limit = 2;
  const [data, setData] = useState<TDataType[]>([]);

  const queryResult = useQuery<TData, TVariables>(query, {
    variables: {
      ...variables,
      offset: 0,
      limit,
    },
    onCompleted: (data) => {
      if (data[key].data) {
        setData(data[key].data);
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
        message="You haven't uploaded any recipes! Once you've uploaded some recipes they'll be shown here."
        type="info"
      />
    );
  }

  if (data.length === 0) {
    return (
      <Alert
        style={{ marginHorizontal: 16 }}
        message="No results found!"
        type="info"
      />
    );
  }

  async function nextPage() {
    if (!done) {
      const result = await queryResult.fetchMore({
        variables: {
          ...variables,
          offset: data.length,
          limit,
        },
      });
      if (result.data[key].data) {
        if (result.data[key].data.length === 0) {
          setDone(true);
        } else {
          setData([...data, ...result.data[key].data]);
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
