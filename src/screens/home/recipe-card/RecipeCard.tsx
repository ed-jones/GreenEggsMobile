import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Card } from "@ui-kitten/components";
import { recipes_recipes_data } from "@greeneggs/types/graphql";
import { imagenotfound } from "@greeneggs/core";
import RecipeCardHeader from "./RecipeCardHeader";
import RecipeCardFooter from "./RecipeCardFooter";

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

interface IRecipeCard {
  recipe: recipes_recipes_data;
  onPress: () => void;
}

const RecipeCard = ({ recipe, onPress }: IRecipeCard) => (
  <Card
    appearance="filled"
    style={styles.card}
    header={() => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <RecipeCardHeader {...recipe.submittedBy} />
    )}
    footer={() => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <RecipeCardFooter {...recipe} />
    )}
    onPress={onPress}
  >
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={recipe.coverImage ? { uri: recipe.coverImage } : imagenotfound}
      />
    </View>
  </Card>
);

export default RecipeCard;
