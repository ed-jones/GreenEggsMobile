/**
 * Author: Edward Jones
 */
import React, { FC } from "react";
import { recipes_recipes_data } from "@greeneggs/types/graphql";
import { Card, Text } from "@ui-kitten/components";
import { View, StyleSheet, Image } from "react-native";
import { convertTimeEstimate, convertSubmittedAt } from "@greeneggs/utils";
import { imageNotFound } from "@greeneggs/assets";
import { CommentCounter, LabelledIcon, RecipeLikeCounter } from "@greeneggs/ui";

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
    marginLeft: 16,
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

export const RecipeCardSmall: FC<IRecipeCardSmall> = ({ recipe, onPress }) => {
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
          <Text category="h6" numberOfLines={1}>
            {recipe.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              category="s1"
              numberOfLines={1}
              style={{ flexShrink: 1 }}
            >{`${recipe.submittedBy.firstName} ${recipe.submittedBy.lastName}`}</Text>
            <Text style={{ marginLeft: 8 }}>{`${convertSubmittedAt(
              recipe.createdAt
            )} ago`}</Text>
          </View>
          <View
            style={{ ...styles.labelledIcons, justifyContent: "space-between" }}
          >
            <View style={{ ...styles.labelledIcons, marginBottom: 8 }}>
              <RecipeLikeCounter
                likeCount={recipe.likeCount}
                liked={recipe.liked}
                recipeId={recipe.id}
                submittedById={recipe.submittedBy.id}
              />
              <CommentCounter
                commentCount={recipe.commentCount}
                comments={recipe.comments}
              />
            </View>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={
              recipe.coverImage ? { uri: recipe.coverImage } : imageNotFound
            }
          />
        </View>
      </View>
    </Card>
  );
};
