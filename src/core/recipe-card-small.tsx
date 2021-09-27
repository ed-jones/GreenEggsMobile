import { recipes_recipes_data } from "@greeneggs/types/graphql";
import { Card, Text } from "@ui-kitten/components";
import React, { FC } from "react";
import { View, StyleSheet, Image } from "react-native";

import { convertTimeEstimate } from "./convertTimeEstimate/convertTimeEstimate";
import imagenotfound from "./image-not-found/imagenotfound.jpg";
import LabelledIcon from "./labelled-icon/LabelledIcon";

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
  },
  cardContents: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    marginHorizontal: -24,
    marginVertical: -16,
  },
  image: {
    width: undefined,
    height: 128,
    aspectRatio: 1,
  },
  labelledIcons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "center",
  },
});

interface IRecipeCardSmall {
  recipe: recipes_recipes_data;
  onPress: () => void;
}

const RecipeCardSmall: FC<IRecipeCardSmall> = ({ recipe, onPress }) => {
  return (
    <Card appearance="filled" style={styles.card} onPress={onPress}>
      <View style={styles.cardContents}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            paddingRight: 24,
          }}
        >
          <Text category="h6">{recipe.title}</Text>
          <Text category="s1">{`${recipe.submittedBy.firstName} ${recipe.submittedBy.lastName}`}</Text>
          <Text>{`${convertTimeEstimate(recipe.createdAt)} ago`}</Text>
          <View style={styles.labelledIcons}>
            <LabelledIcon
              label={String(recipe.likeCount)}
              iconName="heart-outline"
            />
            <LabelledIcon
              label={String(recipe.commentCount)}
              iconName="message-square-outline"
            />
            <LabelledIcon
              label={convertTimeEstimate(recipe.timeEstimate).toUpperCase()}
              iconName="clock-outline"
            />
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={
              recipe.coverImage ? { uri: recipe.coverImage } : imagenotfound
            }
          />
        </View>
      </View>
    </Card>
  );
};

export default RecipeCardSmall;
