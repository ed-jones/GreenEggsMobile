import React from "react";
import { recipe_recipe_data_allergies } from "@greeneggs/types/graphql";
import Alert from "@greeneggs/core/alert/Alert";
import { Text } from "@ui-kitten/components";

interface IRecipeAllergies {
  allergies: recipe_recipe_data_allergies[];
}

function stringifyAllergies(allergies: recipe_recipe_data_allergies[]) {
  let allergyString = "";
  allergies.forEach((allergy, index) => {
    if (index === 0) {
      allergyString = allergy.name.toLowerCase();
    } else if (index < allergies.length - 1) {
      allergyString = `${allergyString}, ${allergy.name.toLowerCase()}`;
    } else {
      allergyString = `${allergyString} and ${allergy.name.toLowerCase()}.`;
    }
  });
  return allergyString;
}

const RecipeAllergies = ({ allergies }: IRecipeAllergies) => {
  console.log(allergies);
  if (allergies.length > 0)
    return (
      <Alert
        type="danger"
        message={
          <Text>
            This recipe is unsuitable for those with allergies to{" "}
            <Text style={{ fontWeight: "bold" }}>
              {stringifyAllergies(allergies)}
            </Text>
          </Text>
        }
        // message={`This recipe is unsuitable for those with allergies to${allergies.map(
        //   (allergy) => ` ${allergy.name.toLowerCase()}`
        // )}.`}
      />
    );
  return null;
};

export default RecipeAllergies;
