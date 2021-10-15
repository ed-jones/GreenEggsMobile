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
  Categories,
  CategoriesVariables,
  Categories_categories_data,
  RecipeFilter,
  Sort,
} from "@greeneggs/types/graphql";
import { Divider } from "react-native-elements";
import { ListItem } from "@ui-kitten/components";
import { Queries } from "@greeneggs/graphql";

export const ChooseCategory: FC = () => {
  const [query, setQuery] = useState("");
  return (
    <Background>
      <TopNavigation title="Choose a category" />
      <Input
        style={{ padding: 16 }}
        placeholder="Search categories..."
        // accessoryLeft={Icons.Search}
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
            <ListItem title={item.name} />
            <Divider />
          </>
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
