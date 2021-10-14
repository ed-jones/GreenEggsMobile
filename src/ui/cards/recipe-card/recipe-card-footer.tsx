import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { CommentCounter, LabelledIcon, RecipeLikeCounter } from "@greeneggs/ui";
import {
  recipes_recipes_data,
  recipes_recipes_data_comments,
  recipes_recipes_data_submittedBy,
} from "@greeneggs/types/graphql";
import { convertTimeEstimate, convertSubmittedAt } from "@greeneggs/utils";

const styles = StyleSheet.create({
  view: {
    padding: 14,
  },
  recipeTitle: {
    fontWeight: "bold",
    fontSize: 18,
    flexShrink: 1,
  },
  recipeDescription: {
    marginBottom: 16,
    marginTop: 8,
  },
  labelledIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
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
  comments: recipes_recipes_data_comments[];
  submittedBy: recipes_recipes_data_submittedBy;
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
  comments,
  submittedBy,
}: IRecipeCardFooterProps) => {
  return (
    <View style={styles.view}>
      <View style={styles.labelledIcons}>
        <Text category="h1" style={styles.recipeTitle}>
          {title}
        </Text>
        <Text style={{marginLeft: 8}}>{`${convertSubmittedAt(createdAt)} ago`}</Text>
      </View>
      <Text category="s1" style={styles.recipeDescription}>
        {subtitle}
      </Text>
      <View style={styles.labelledIcons}>
        <View style={styles.labelledIconGroup}>
          <LabelledIcon
            label={convertTimeEstimate(timeEstimate).toUpperCase()}
            iconName="clock-outline"
          />
        </View>
        <View style={styles.labelledIconGroup}>
          <RecipeLikeCounter
            likeCount={likeCount}
            liked={liked}
            recipeId={id}
            submittedById={submittedBy.id}
          />
          <CommentCounter commentCount={commentCount} comments={comments} />
        </View>
      </View>
    </View>
  );
};
