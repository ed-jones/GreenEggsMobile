import { ListItem } from "@ui-kitten/components";
import React, { FC } from "react";

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

export type AlphaListItems<T> = Record<AlphabetType, T[]>

interface BuildAlphaListItemProps<T> {
  items: T[]
  categoriseItem: (item: T) => AlphabetType
}

export function buildAlphaListItems <T, >({ items, categoriseItem }: BuildAlphaListItemProps<T>): AlphaListItems<T> {
  const alphaListItems: AlphaListItems<T> = Object.assign({}, ...AlphabetArray.map((letter) => ({ [letter]: [] as T[] })))

  items.forEach((item) => {
    alphaListItems[categoriseItem(item)].push(item);
  });

  return alphaListItems;
}

interface AlphaListProps<T> {
  items: AlphaListItems<T>;
  renderItem: FC<T>;
}

const AlphaList = <T,>({ items, renderItem }: AlphaListProps<T>) => {
  return (
    <>
      {AlphabetArray.map((letter) => (
        <>
          {items[letter].length > 0 && <ListItem title={letter} />}
          {items[letter].map(renderItem)}
        </>
      ))}
    </>
  );
};

export default AlphaList;
