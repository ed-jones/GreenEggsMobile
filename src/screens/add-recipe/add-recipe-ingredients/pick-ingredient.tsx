import React, { FC, useContext, useState } from "react";
import {
  AlphabetType,
  Background,
  Icons,
  Input,
  LazyListAlpha,
  TopNavigation,
} from "@greeneggs/ui";
import {
  IngredientInput,
  Ingredients,
  IngredientsVariables,
  Ingredients_ingredients_data,
  RecipeFilter,
  Sort,
} from "@greeneggs/types/graphql";
import { Button, Divider, ListItem } from "@ui-kitten/components";
import { Queries } from "@greeneggs/graphql";
import { toTitleCase } from "@greeneggs/utils";
import { useNavigation } from "@react-navigation/core";
import { AddRecipeContext } from "@greeneggs/providers";

export const PickIngredient: FC = () => {
  const [query, setQuery] = useState("");
  const navigation = useNavigation();
  const { ingredientsFieldArray } = useContext(AddRecipeContext);

  function pick(ingredient: IngredientInput) {
    ingredientsFieldArray?.append(ingredient);
    navigation.goBack();
  }

  return (
    <Background>
      <TopNavigation title="Pick an ingredient" />
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
            <ListItem title={item.name} onPress={() => pick(item)} />
            <Divider />
          </>
        )}
        categoriseItem={(item) => item.name[0].toLowerCase() as AlphabetType}
        query={Queries.GET_INGREDIENTS}
        ListFooterComponent={
          query.length > 0 ? (
            <Button
              style={{ marginHorizontal: 16, marginTop: 16 }}
              onPress={() => pick({ name: toTitleCase(query) })}
            >
              {`CREATE "${query.toUpperCase()}"`}
            </Button>
          ) : undefined
        }
        variables={{
          query,
        }}
        dataKey="ingredients"
      />
    </Background>
  );
};
