import { List, ListItem } from "@ui-kitten/components";
import React, { FC } from "react";
import { SectionList } from "react-native";

export const AlphabetArray = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
] as const;
export type AlphabetType = typeof AlphabetArray[number];

export interface AlphaListItem<T> {
  letter: AlphabetType
  data: T[]
}

export type AlphaListItems<T> = Array<AlphaListItem<T>>

interface BuildAlphaListItemProps<T> {
  items: T[]
  categoriseItem: (item: T) => AlphabetType
}

export function buildAlphaListItems <T, >({ items, categoriseItem }: BuildAlphaListItemProps<T>): AlphaListItems<T> {
  const alphaListItems: AlphaListItems<T> = AlphabetArray.map((letter) => ({ letter, data: [] as T[] }))

  items.forEach((item) => {
    alphaListItems?.find((alphaListItem) => alphaListItem.letter === categoriseItem(item))?.data.push(item);
  });

  return alphaListItems;
}

interface AlphaListProps<T> {
  items: AlphaListItems<T>;
  renderItem: FC<T>;
}

const AlphaList = <T,>({ items, renderItem }: AlphaListProps<T>) => {
  return (
    <SectionList
      sections={items.filter((item) => item.data.length > 0)}
      renderSectionHeader={({ section: { letter }}) => (
        <ListItem title={letter.toUpperCase()} style={{ backgroundColor: '#EDF1F7' }} />
      )}
      renderItem={({ item }) => renderItem(item)}
      stickySectionHeadersEnabled
    />
  )
};

export default AlphaList;
