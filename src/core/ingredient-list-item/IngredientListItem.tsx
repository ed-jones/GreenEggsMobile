import React from "react";
import { ListItem, Text } from "@ui-kitten/components";

// TEMPORARY
// REPLACE WITH GRAPHQL GENERATED TYPE
export interface IIngredient {
  name: string;
  descriptor?: string;
  quantity: number;
  unit: string;
}

interface IIngredientListItem {
  ingredient: IIngredient;
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
