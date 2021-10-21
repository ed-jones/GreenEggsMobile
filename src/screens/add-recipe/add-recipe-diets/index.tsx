/**
 * Author: Edward Jones
 */
import React, { useContext } from "react";
import { ListItem } from "@ui-kitten/components";
import { Icons } from "@greeneggs/ui";

import { RecipeForm } from "../add-recipe";
import { AddRecipePartTemplate } from "../add-recipe-part-template";
import { useNavigation } from "@react-navigation/native";
import { AddRecipeContext } from "@greeneggs/providers";

interface IAddRecipeDiets {
  form: RecipeForm;
}

export const AddRecipeDiets = ({ form }: IAddRecipeDiets) => {
  const { dietsFieldArray } = useContext(AddRecipeContext);
  const navigation = useNavigation();

  return (
    <AddRecipePartTemplate
      title="Diets"
      createButtonTitle="ADD DIET"
      onPressCreate={() => navigation.navigate("CreateDiet")}
      emptyStateTitle="No diets"
      emptyStateDescription="Let us know if your recipe satisfies any special diets."
      listItem={({ item, index }) => (
        <>
          <ListItem
            title={item.name}
            accessoryRight={(props) => (
              <Icons.Cross
                {...props}
                onPress={() => dietsFieldArray?.remove(index)}
              />
            )}
          />
        </>
      )}
      data={dietsFieldArray?.fields}
    />
  );
};
