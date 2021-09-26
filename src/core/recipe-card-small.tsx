import { recipes_recipes_data } from "@greeneggs/types/graphql";
import { Card } from "@ui-kitten/components";
import React, { FC } from "react";
import { View, StyleSheet, Image } from "react-native";
import imagenotfound from "./image-not-found/imagenotfound.jpg";

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
  },
  imageContainer: {
    marginHorizontal: -24,
    marginVertical: -16,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1 / 1,
    resizeMode: "cover",
  },
});

interface IRecipeCardSmall {
  recipe: recipes_recipes_data;
  onPress: () => void;
}

const RecipeCardSmall: FC<IRecipeCardSmall> = ({ recipe, onPress }) => {
  return (
    <Card appearance="filled" style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={
            recipe.coverImage ? { uri: recipe.coverImage } : imagenotfound
          }
        />
      </View>
    </Card>
  );
};

export default RecipeCardSmall;
