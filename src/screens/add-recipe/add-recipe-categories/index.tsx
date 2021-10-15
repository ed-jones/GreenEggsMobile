import React from "react";
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

interface IAddRecipeCategories {
  form: RecipeForm;
}

export const AddRecipeCategories = ({
  form,
}: IAddRecipeCategories) => {
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "categories",
  });
  const navigation = useNavigation();

  return (
    <AddRecipePartTemplate
      title="Categories"
      createButtonTitle="ADD CATEGORY"
      onPressCreate={() =>
        navigation.navigate("ChooseCategory")
      }
      emptyStateTitle="No categories"
      emptyStateDescription="Adding categories will help people find your recipe."
      listItem={({ item, index }) => (
        <>
          <ListItem
            title={item.name}
            accessoryRight={(props) => (
              <Icons.Cross {...props} onPress={() => remove(index)} />
            )}
          />
        </>
      )}
      data={fields}
    />
  );
};
