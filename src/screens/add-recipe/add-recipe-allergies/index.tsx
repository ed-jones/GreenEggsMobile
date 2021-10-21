/**
 * Author: Edward Jones
 */
import React, { useContext } from "react";
import { ListItem } from "@ui-kitten/components";
import { RecipeForm } from "../add-recipe";
import { Icons } from "@greeneggs/ui";
import { AddRecipePartTemplate } from "../add-recipe-part-template";
import { useNavigation } from "@react-navigation/native";
import { AddRecipeContext } from "@greeneggs/providers";

interface IAddRecipeAllergies {
  form: RecipeForm;
}

export const AddRecipeAllergies = ({
  form,
}: IAddRecipeAllergies) => {
  const { allergiesFieldArray } = useContext(AddRecipeContext);

  const navigation = useNavigation();

  return (
    <AddRecipePartTemplate
      title="Allergies"
      createButtonTitle="ADD ALLERGIES"
      onPressCreate={() =>
        navigation.navigate("CreateAllergy")
      }
      emptyStateTitle="No allergies"
      emptyStateDescription="Add any potential allergies your recipe may trigger."
      listItem={({ item, index }) => (
        <>
          <ListItem
            title={item.name}
            accessoryRight={(props) => (
              <Icons.Cross {...props} onPress={() => allergiesFieldArray?.remove(index)} />
            )}
          />
        </>
      )}
      data={allergiesFieldArray?.fields}
    />
  );
};
