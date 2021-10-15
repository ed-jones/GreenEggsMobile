import React, { useContext } from "react";
import { Button, List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView, View } from "react-native";
import {
  Icons,
  Callout,
  AddListItem,
  EmptyState,
  Background,
} from "@greeneggs/ui";
import { useFieldArray } from "react-hook-form";

import { RecipeForm } from "../add-recipe";
import { AddRecipeStyles } from "../add-recipe-styles";
import { AddRecipePartTemplate } from "../add-recipe-part-template";
import { useNavigation } from "@react-navigation/native";
import { AddRecipeContext } from "@greeneggs/providers";

interface IAddRecipeCategories {
  form: RecipeForm;
}

export const AddRecipeCategories = ({
  form,
}: IAddRecipeCategories) => {
  const { categoriesFieldArray } = useContext(AddRecipeContext)
  const navigation = useNavigation();

  return (
    <AddRecipePartTemplate
      title="Categories"
      createButtonTitle="ADD CATEGORY"
      onPressCreate={() =>
        navigation.navigate("PickCategory")
      }
      emptyStateTitle="No categories"
      emptyStateDescription="Adding categories will help people find your recipe."
      listItem={({ item, index }) => (
        <>
          <ListItem
            title={item.name}
            accessoryRight={(props) => (
              <Icons.Cross {...props} onPress={() => categoriesFieldArray?.remove(index)} />
            )}
          />
        </>
      )}
      data={categoriesFieldArray?.fields}
    />
  );
};
