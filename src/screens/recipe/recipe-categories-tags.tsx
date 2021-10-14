import React from "react";
import { Tags } from "@greeneggs/ui";
import { recipe_recipe_data_categories } from "@greeneggs/types/graphql";
import { useNavigation } from "@react-navigation/core";

interface IRecipeCategoriesTags {
  categories: recipe_recipe_data_categories[];
}

export const RecipeCategoriesTags = ({ categories }: IRecipeCategoriesTags) => {
  const navigation = useNavigation();
  return (
  <Tags
    tags={categories.map((category) => ({
      name: category.name,
      onPress: () => navigation.navigate("Category", { categoryId: category.id, categoryName: category.name })
    }))}
  />
)};
