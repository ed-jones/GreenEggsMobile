import React, { FC } from "react";
import {
  CommonVariables,
  LazyListProps,
  TDataWithData,
  useLazyList,
} from "./lazy-list";
import { LoadingScreen } from "../screens/loading-screen";
import { AlphaList, AlphaListProps, buildAlphaListItems, CategoriseItem } from "./alpha-list";

interface LazyListAlphaProps<TData, TVariables, TDataType>
  extends Omit<AlphaListProps<TDataType>, 'items'>, Pick<LazyListProps<TData, TVariables, TDataType>, 'query' | 'variables' | 'dataKey' | 'limit'> {
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
  categoriseItem,
  limit = 15,
  ...props
}: LazyListAlphaProps<TData, TVariables, TDataType>) => {
  const { loading, data, refetch: nextPage } = useLazyList<
    TData,
    TVariables,
    TDataType,
    SortType,
    FilterType
  >({ query, variables, dataKey, limit, });

  if (loading) {
    return (
      <LoadingScreen />
    );
  }
  const items = buildAlphaListItems({
    items: data,
    categoriseItem,
  });

  return (
    <AlphaList
      {...props}
      onEndReached={() => nextPage()}
      onEndReachedThreshold={0.5}
      items={items}
      renderItem={renderItem}
    />
  );
};
