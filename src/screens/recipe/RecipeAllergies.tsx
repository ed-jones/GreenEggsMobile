import React from "react";
import { recipe_recipe_data_allergies } from "@greeneggs/types/graphql";
import Alert from "@greeneggs/core/alert/Alert";

interface IRecipeAllergies {
  allergies: recipe_recipe_data_allergies[];
}

const RecipeAllergies = ({ allergies }: IRecipeAllergies) => {
  if (allergies.length > 0)
    return (
      <Alert
        type="danger"
        message={`This recipe is unsuitable for those with allergies to ${allergies.map(
          (allergy) => allergy.name.toLowerCase()
        )}.`}
      />
    );
  return null;
};

export default RecipeAllergies;
