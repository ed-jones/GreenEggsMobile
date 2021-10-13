import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { LabelledIcon, LikeCounter } from "@greeneggs/ui";
import { recipes_recipes_data } from "@greeneggs/types/graphql";
import { convertTimeEstimate } from "@greeneggs/utils";

const styles = StyleSheet.create({
  view: {
    padding: 14,
  },
  recipeTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  recipeDescription: {
    marginBottom: 16,
    marginTop: 8,
  },
  labelledIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelledIconGroup: {
    flexDirection: "row",
  },
});

export interface IRecipeCardFooterProps extends Partial<recipes_recipes_data> {
  title: string;
  subtitle: string;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  servingCount: number;
  timeEstimate: string;
  liked: boolean;
  id: string;
}

export const RecipeCardFooter = ({
  title,
  subtitle,
  commentCount,
  likeCount,
  timeEstimate,
  createdAt,
  liked,
  id,
}: IRecipeCardFooterProps) => (
  <View style={styles.view}>
    <View style={styles.labelledIcons}>
      <View>
        <Text category="h1" style={styles.recipeTitle}>
          {title}
        </Text>
        <Text category="s1" style={styles.recipeDescription}>
          {subtitle}
        </Text>
      </View>
      <View style={styles.labelledIconGroup}>
        <Text>{`${convertTimeEstimate(createdAt)} ago`}</Text>
      </View>
    </View>
    <View style={styles.labelledIcons}>
      <View style={styles.labelledIconGroup}>
        <LabelledIcon
          label={convertTimeEstimate(timeEstimate)}
          iconName="clock-outline"
        />
      </View>
      <View style={styles.labelledIconGroup}>
        <LikeCounter likeCount={likeCount} liked={liked} recipeId={id} />
        <LabelledIcon
          label={String(commentCount)}
          iconName="message-square-outline"
        />
      </View>
    </View>
  </View>
);
