import React from "react";
import { ListItem, Text } from "@ui-kitten/components";
import { recipe_recipe_data_ingredients } from "@greeneggs/types/graphql";
import { Icons } from '@greeneggs/ui';
import { toTitleCase } from "@greeneggs/utils";

interface IIngredientListItem {
  ingredient: Partial<recipe_recipe_data_ingredients>;
  remove?: () => void;
}

export const IngredientListItem = ({ ingredient, remove }: IIngredientListItem) => {
  if (ingredient.name) {
    return (
      <ListItem
        title={toTitleCase(ingredient.name || "")}
        description={ingredient.description || undefined}
        accessoryRight={(props) => (
          <>
            <Text category="label" style={{ marginRight: 16 }}>
              {`${ingredient.quantity || ""} ${ingredient.unit || ""}`}
            </Text>
            {remove && <Icons.Cross {...props} onPress={remove} />}
          </>
        )}
      />
    );
  } else {
    return null;
  }
};
