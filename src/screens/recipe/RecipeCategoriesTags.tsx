import React from "react";
import { Tags } from "@greeneggs/ui";
import { recipe_recipe_data_categories } from "@greeneggs/types/graphql";

interface IRecipeCategoriesTags {
  categories: recipe_recipe_data_categories[];
}

const RecipeCategoriesTags = ({ categories }: IRecipeCategoriesTags) => (
  <Tags
    tags={categories.map((category) => ({
      name: category.name,
      onPress: () => null,
    }))}
  />
);

export default RecipeCategoriesTags;
