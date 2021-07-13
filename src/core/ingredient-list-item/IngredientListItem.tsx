import React from "react";
import { ListItem, Text } from "@ui-kitten/components";
import { recipe_recipe_data_ingredients } from "@greeneggs/types/graphql";
import toTitleCase from "../to-title-case/toTitleCase";

interface IIngredientListItem {
  ingredient: recipe_recipe_data_ingredients;
}

const IngredientListItem = ({ ingredient }: IIngredientListItem) => (
  <ListItem
    title={toTitleCase(ingredient.name || "")}
    description={ingredient.description || undefined}
    accessoryRight={() => (
      <Text category="label" style={{ marginRight: 16 }}>
        {`${ingredient.quantity} ${ingredient.unit || ""}`}
      </Text>
    )}
  />
);

export default IngredientListItem;
