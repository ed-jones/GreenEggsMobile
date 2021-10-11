import React, { FC } from "react";
import { Queries } from "@greeneggs/graphql";
import {
  CategoriesVariables,
  Categories_categories_data,
  RecipeFilter,
  Sort,
  Categories as CategoriesType,
} from "@greeneggs/types/graphql";
import { Background, Icons, LazyList } from "@greeneggs/ui";
import { ListItem, Text } from "@ui-kitten/components";
import { ImageBackground, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface CategoryWithImageProps {
  name: string;
  coverImage: string;
}

const styles = StyleSheet.create({
  categoryCard: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
})

const CategoryWithImage: FC<CategoryWithImageProps> = ({
  name,
  coverImage,
}) => {
  return (
    <View style={{ marginHorizontal: 16, marginTop: 16 }}>
      <ImageBackground source={{ uri: coverImage }} style={styles.categoryCard}>
        <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
            style={styles.gradient}
          />
        <Text category="h2" style={{ color: 'white' }}>{name.toUpperCase()}</Text>
      </ImageBackground>
    </View>
  );
};

export const Categories: FC = () => {
  return (
    <Background>
      <LazyList<
        CategoriesType,
        CategoriesVariables,
        Categories_categories_data,
        Sort,
        RecipeFilter
      >
        query={Queries.GET_CATEGORIES}
        variables={{
          query: "",
        }}
        dataKey="categories"
        emptyMessage="No categories found."
        errorMessage="No categories found."
        renderItem={({ item: category, index }) =>
          category.coverImage ? (
            <CategoryWithImage
              name={category.name}
              coverImage={category.coverImage}
            />
          ) : (
            <ListItem
              title={category.name}
              accessoryRight={Icons.Forward}
              key={index.toString()}
            />
          )
        }
      />
    </Background>
  );
};
