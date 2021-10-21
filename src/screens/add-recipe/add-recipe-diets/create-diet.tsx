/**
 * Author: Edward Jones
 */
import React, { useContext, useState } from "react";
import { Divider, ListItem } from "@ui-kitten/components";
import {
  AlphabetType,
  Background,
  Icons,
  Input,
  LazyListAlpha,
  TopNavigation,
} from "@greeneggs/ui";
import {
  DietInput,
  Diets,
  DietsVariables,
  Diets_diets_data,
  RecipeFilter,
  Sort,
} from "@greeneggs/types/graphql";
import { Queries } from "@greeneggs/graphql";
import { AddRecipeContext } from "@greeneggs/providers";
import { useNavigation } from "@react-navigation/core";

export const CreateDiet = () => {
  const [query, setQuery] = useState("");
  const { dietsFieldArray } = useContext(AddRecipeContext);
  const navigation = useNavigation();

  function pick(diet: DietInput) {
    dietsFieldArray?.append(diet);
    navigation.goBack();
  }

  return (
    <Background>
      <TopNavigation title="Choose a diet" />
      <Input
        style={{ padding: 16 }}
        placeholder="Search diets..."
        accessoryLeft={Icons.Search}
        onChangeText={setQuery}
        value={query}
        autoFocus
      />
      <LazyListAlpha<
        Diets,
        DietsVariables,
        Diets_diets_data,
        Sort,
        RecipeFilter
      >
        renderItem={(item) => (
          <>
            <ListItem
              title={item.name}
              onPress={() => {
                pick({ name: item.name });
              }}
            />
            <Divider />
          </>
        )}
        categoriseItem={(item) => item.name[0].toLowerCase() as AlphabetType}
        query={Queries.GET_DIETS}
        variables={{
          query,
        }}
        dataKey="diets"
      />
    </Background>
  );
};
