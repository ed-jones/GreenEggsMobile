import React from "react";
import { Divider } from "@ui-kitten/components";
import { View } from "react-native";
import ViewMore from "@greeneggs/core/view-more/ViewMore";
import {
  recipe_recipe_data_comments,
  recipe_recipe_data_comments_replies,
} from "@greeneggs/types/graphql";
import RecipeComment from "./RecipeComment";

interface RecipeCommentListProps {
  comments:
    | recipe_recipe_data_comments[]
    | recipe_recipe_data_comments_replies[];
}

const RecipeCommentList = ({ comments }: RecipeCommentListProps) => {
  return (
    <View style={{ marginHorizontal: -16 }}>
      {comments.map((comment, index) => (
        <RecipeComment comment={comment} replyButton key={index.toString()} />
      ))}
      <Divider />
    </View>
  );
};

export default RecipeCommentList;
