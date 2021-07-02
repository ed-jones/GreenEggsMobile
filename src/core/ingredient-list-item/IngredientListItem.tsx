import React from "react";
import { ListItem, Text } from "@ui-kitten/components";

// TEMPORARY
// REPLACE WITH GRAPHQL GENERATED TYPE
interface IRecipe {
  name: string;
  descriptor?: string;
  quantity: number;
  unit: string;
}

interface IIngredientListItem {
  ingredient: IRecipe;
}

const IngredientListItem = ({ ingredient }: IIngredientListItem) => (
  <ListItem
    title={ingredient.name}
    description={ingredient.descriptor}
    accessoryRight={() => (
      <Text category="label" style={{ marginRight: 16 }}>
        {`${ingredient.quantity} ${ingredient.unit}`}
      </Text>
    )}
  />
);

export default IngredientListItem;
