/**
 * Author: Edward Jones
 */
import { ListItem } from "@ui-kitten/components";
import React, { FC } from "react";
import { SectionList, SectionListProps } from "react-native";

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

export type CategoriseItem<T> = (item: T) => AlphabetType;

export type AlphaListItems<T> = Array<AlphaListItem<T>>

interface BuildAlphaListItemProps<T> {
  items: T[]
  categoriseItem: CategoriseItem<T>
}

/**
 * Function that converts a list of items to an alphabetised list using a categoriseItem function
 */
export function buildAlphaListItems <T, >({ items, categoriseItem }: BuildAlphaListItemProps<T>): AlphaListItems<T> {
  const alphaListItems: AlphaListItems<T> = AlphabetArray.map((letter) => ({ letter, data: [] as T[] }));
  items.forEach((item) => {
    alphaListItems?.find((alphaListItem) => alphaListItem.letter === categoriseItem(item))?.data.push(item);
  });
  return alphaListItems;
}

export interface AlphaListProps<T> extends Omit<SectionListProps<T, AlphaListItem<T>>, 'renderItem' | 'sections'> {
  items: AlphaListItems<T>;
  renderItem: FC<T>;
}

/**
 * Renders a list of items as an alphabetised list.
 */
export const AlphaList = <T,>({ items, renderItem, ...props }: AlphaListProps<T>) => {
  return (
    <SectionList
      {...props}
      sections={items.filter((item) => item.data.length > 0)}
      renderSectionHeader={({ section: { letter }}) => (
        <ListItem title={letter.toUpperCase()} style={{ backgroundColor: '#EDF1F7' }} />
      )}
      renderItem={({ item }) => renderItem(item)}
      stickySectionHeadersEnabled
    />
  )
};
