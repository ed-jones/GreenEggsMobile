import React, { FC, useState } from "react";
import { Queries } from "@greeneggs/graphql";
import {
  Categories,
  CategoriesVariables,
  Categories_categories_data,
  RecipeFilter,
  Sort,
} from "@greeneggs/types/graphql";
import {
  AlphabetType,
  Background,
  Icons,
  Input,
  LazyList,
  LazyListAlpha,
  TopNavigation,
} from "@greeneggs/ui";
import { Divider, ListItem } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/core";

export const AllCategories: FC = () => {
  const [query, setQuery] = useState("");
  const navigation = useNavigation();
  return (
    <Background>
      <TopNavigation title="All Categories" />
      <Input
        placeholder="Search categories"
        size="large"
        accessoryLeft={Icons.Search}
        value={query}
        onChangeText={setQuery}
        style={{ padding: 16 }}
      />
      <LazyListAlpha<
        Categories,
        CategoriesVariables,
        Categories_categories_data,
        Sort,
        RecipeFilter
      >
        renderItem={(item) => (
          <ListItem
            title={item.name}
            onPress={() =>
              navigation.navigate("Category", {
                categoryId: item.id,
                categoryName: item.name,
              })
            }
          />
        )}
        categoriseItem={(item) => item.name[0].toLowerCase() as AlphabetType}
        query={Queries.GET_CATEGORIES}
        emptyMessage={"No categories found"}
        variables={{
          query,
        }}
        dataKey="categories"
      />
    </Background>
  );
};
