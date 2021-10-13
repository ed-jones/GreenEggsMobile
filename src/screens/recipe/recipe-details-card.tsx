import React from "react";
import { noAvatar } from '@greeneggs/assets';
import { LabelledIcon, ViewMore } from "@greeneggs/ui";
import { Mutations, Queries } from '@greeneggs/graphql';
import { convertTimeEstimate } from "@greeneggs/utils";
import { View, StyleSheet, Pressable } from "react-native";
import {
  LikeRecipe,
  recipe_recipe_data,
  UnlikeRecipe,
} from "@greeneggs/types/graphql";
import { Text, Card, Avatar } from "@ui-kitten/components";
import { useMutation } from "@apollo/client";
import { RecipeCategoriesTags } from "./recipe-categories-tags";
import { LikeCounter } from "@greeneggs/ui/like-counter";

const styles = StyleSheet.create({
  cardSection: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    marginRight: 10,
  },
});

interface IRecipeDetailsCard extends recipe_recipe_data {
  navigation: any;
}

export const RecipeDetailsCard = ({
  navigation,
  title,
  subtitle,
  timeEstimate,
  description,
  createdAt,
  submittedBy,
  likeCount,
  commentCount,
  categories,
  id,
  liked,
  comments,
}: IRecipeDetailsCard) => {
  const navigateToDescription = () => {
    navigation.navigate("RecipeDescription", {
      description: description,
      createdAt: createdAt,
      title: title,
      submittedBy: submittedBy,
    });
  };
  return (
    <Card
      header={() => (
        <View style={styles.cardSection}>
          <View style={styles.row}>
            <View>
              <Text category="h5">{title}</Text>
              <Text category="s1">{subtitle}</Text>
            </View>
            <LabelledIcon
              label={convertTimeEstimate(timeEstimate)}
              iconName="clock-outline"
            />
          </View>
          <View style={{ ...styles.row, marginTop: 8 }}>
            <RecipeCategoriesTags categories={categories} />
          </View>
        </View>
      )}
      footer={() => (
        <View style={styles.cardSection}>
          <Text numberOfLines={2}>{description}</Text>
          <ViewMore
            style={{ paddingHorizontal: 0, marginTop: 8 }}
            onPress={navigateToDescription}
          />
        </View>
      )}
    >
      <View style={styles.row}>
        <Pressable
          onPress={() =>
            navigation.navigate("Profile", {
              userId: submittedBy.id,
            })
          }
        >
          <View style={styles.row}>
            <Avatar
              size="small"
              source={
                submittedBy.avatarURI
                  ? { uri: submittedBy.avatarURI }
                  : noAvatar
              }
              style={styles.avatar}
            />
            <Text
              style={{ fontWeight: "bold" }}
            >{`${submittedBy.firstName} ${submittedBy.lastName}`}</Text>
          </View>
        </Pressable>
        <View style={styles.row}>
          <LikeCounter likeCount={likeCount} liked={liked} recipeId={id} />
          <LabelledIcon
            label={String(commentCount)}
            iconName="message-square-outline"
            onPress={() => {
              navigation.navigate("RecipeAllComments", {
                comments,
                commentCount,
              });
            }}
          />
        </View>
      </View>
    </Card>
  );
};
