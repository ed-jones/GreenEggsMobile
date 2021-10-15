import React, { FC, useContext, useState } from "react";
import {
  AlphabetType,
  Background,
  ControlledInput,
  Icons,
  Input,
  InputType,
  LazyListAlpha,
  Rules,
  TopNavigation,
} from "@greeneggs/ui";
import {
  Categories,
  CategoriesVariables,
  Categories_categories_data,
  CategoryInput,
  RecipeFilter,
  Sort,
} from "@greeneggs/types/graphql";
import { Button, Divider, ListItem } from "@ui-kitten/components";
import { Queries } from "@greeneggs/graphql";
import { useForm } from "react-hook-form";
import { AddRecipeContext } from "@greeneggs/providers";
import { useNavigation } from "@react-navigation/core";
import { AddRecipeStyles } from "../add-recipe-styles";
import { toTitleCase } from "@greeneggs/utils";

export const PickCategory: FC = () => {
  const [query, setQuery] = useState("");
  const form = useForm<CategoryInput>({ mode: "all" });
  const { categoriesFieldArray } = useContext(AddRecipeContext)
  const navigation = useNavigation();

  function pick(category: CategoryInput) {
    categoriesFieldArray?.append(category);
    navigation.goBack();
  }

  return (
    <Background>
      <TopNavigation title="Choose a category" />
      <Input
        style={{ padding: 16 }}
        placeholder="Search categories..."
        accessoryLeft={Icons.Search}
        onChangeText={setQuery}
        value={query}
      />
      <LazyListAlpha<
        Categories,
        CategoriesVariables,
        Categories_categories_data,
        Sort,
        RecipeFilter
      >
        renderItem={(item) => (
          <>
            <ListItem title={item.name} onPress={() => {
              pick(item);
            }}/>
            <Divider />
          </>
        )}
        categoriseItem={(item) => item.name[0].toLowerCase() as AlphabetType}
        query={Queries.GET_CATEGORIES}
        ListEmptyComponent={
          <Button
            style={{ marginHorizontal: 16 }}
            onPress={() => pick({ name: toTitleCase(query) })}
          >
            {`ADD "${query.toUpperCase()}"`}
          </Button>
        }
        variables={{
          query,
        }}
        dataKey="categories"
      />
    </Background>
  );
};
