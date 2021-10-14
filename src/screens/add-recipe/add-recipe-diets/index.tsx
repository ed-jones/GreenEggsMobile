import React from "react";
import { Button, List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView, View } from "react-native";
import { Icons, Callout, AddListItem } from "@greeneggs/ui";
import { useFieldArray } from "react-hook-form";

import { RecipeForm } from "../add-recipe";
import { AddRecipeStyles } from "../add-recipe-styles";
import { EmptyState } from "@greeneggs/ui/empty-state";
import { AddRecipePartTemplate } from "../add-recipe-part-template";
import { useNavigation } from "@react-navigation/native";

interface IAddRecipeDiets {
  form: RecipeForm;
}

export const AddRecipeDiets = ({ form }: IAddRecipeDiets) => {
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "diets",
  });
  const navigation = useNavigation();

  return (
    <AddRecipePartTemplate
      title="Diets"
      createButtonTitle="ADD DIET"
      onPressCreate={() =>
        navigation.navigate("CreateDiet", {
          append,
        })
      }
      emptyStateTitle="No diets"
      emptyStateDescription="Let us know if your recipe satisfies any special diets."
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
