import React, { FC } from "react";
import {
  CommonVariables,
  LazyListProps,
  TDataWithData,
  useLazyList,
  useListRefetch,
} from "./lazy-list";
import { LoadingScreen } from "../screens/loading-screen";
import { AlphaList, buildAlphaListItems, CategoriseItem } from "./alpha-list";
import { View } from "react-native";
import { Background, Callout, EmptyState } from '@greeneggs/ui';

interface LazyListAlphaProps<TData, TVariables, TDataType>
  extends Omit<LazyListProps<TData, TVariables, TDataType>, "renderItem"> {
  renderItem: FC<TDataType>;
  categoriseItem: CategoriseItem<TDataType>;
}

export const LazyListAlpha = <
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
  categoriseItem,
  ListEmptyComponent,
}: LazyListAlphaProps<TData, TVariables, TDataType>) => {
  const { loading, data, refetch: nextPage } = useLazyList<
    TData,
    TVariables,
    TDataType,
    SortType,
    FilterType
  >({ query, variables, dataKey, limit: 10 });

  if (loading) {
    return (
      <LoadingScreen />
    );
  }

  if (data === null || data === undefined || data.length === 0) {
    if (ListEmptyComponent) {
      return <>{ListEmptyComponent}</>
    }
    return (
      <View style={{flex: 1}}>
        <EmptyState description={emptyMessage} />
      </View>
    );
  }

  const items = buildAlphaListItems({
    items: data,
    categoriseItem,
  });

  return (
    <AlphaList
      onEndReached={() => nextPage()}
      onEndReachedThreshold={0.5}
      items={items}
      renderItem={renderItem}
    />
  );
};
