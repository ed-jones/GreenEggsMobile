import React, { FC, useState } from "react";
import {
  AlphabetType,
  Background,
  Icons,
  Input,
  LazyListAlpha,
  TopNavigation,
} from "@greeneggs/ui";
import {
  Ingredients,
  IngredientsVariables,
  Ingredients_ingredients_data,
  RecipeFilter,
  Sort,
} from "@greeneggs/types/graphql";
import { Divider } from "react-native-elements";
import { ListItem } from "@ui-kitten/components";
import { Queries } from "@greeneggs/graphql";

export const IngredientList: FC = () => {
  const [query, setQuery] = useState("");
  return (
    <Background>
      <TopNavigation title="Ingredients (included)" />
      <Input
        style={{ padding: 16, backgroundColor: "white" }}
        placeholder="Search Ingredients"
        accessoryLeft={Icons.Search}
        onChangeText={setQuery}
        value={query}
      />
      <LazyListAlpha<
        Ingredients,
        IngredientsVariables,
        Ingredients_ingredients_data,
        Sort,
        RecipeFilter
      >
        renderItem={(item) => (
          <>
            <ListItem title={item.name} />
            <Divider />
          </>
        )}
        categoriseItem={(item) => item.name[0].toLowerCase() as AlphabetType}
        query={Queries.GET_INGREDIENTS}
        emptyMessage={"No ingredients found"}
        variables={{
          query,
        }}
        dataKey="ingredients"
      />
    </Background>
  );
};
