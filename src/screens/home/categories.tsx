import React, { FC } from "react";
import { Queries } from "@greeneggs/graphql";
import {
  CategoriesVariables,
  Categories_categories_data,
  RecipeFilter,
  Sort,
  Categories as CategoriesType,
} from "@greeneggs/types/graphql";
import { Background, Icons, LazyList } from "@greeneggs/ui";
import { ListItem } from "@ui-kitten/components";

export const Categories: FC = () => {
  return (
    <Background>
      <LazyList<
        CategoriesType,
        CategoriesVariables,
        Categories_categories_data,
        Sort,
        RecipeFilter
      >
        query={Queries.GET_CATEGORIES}
        variables={{
          query: "",
        }}
        dataKey="categories"
        emptyMessage="No categories found."
        errorMessage="No categories found."
        renderItem={({ item: category, index }) => (
          <ListItem title={category.name} accessoryRight={Icons.Forward} />
        )}
      />
    </Background>
  );
};
