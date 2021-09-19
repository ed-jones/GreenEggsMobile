import React from "react";
import { Icons, LabelledIcon } from "@greeneggs/core";
import { Button, Divider, ListItem } from "@ui-kitten/components";
import { View, Text } from "react-native";
import ViewMore from "@greeneggs/core/view-more/ViewMore";
import { recipe_recipe_data_comments } from "@greeneggs/types/graphql";
import { useNavigation } from "@react-navigation/core";
import RecipeComment from "./RecipeComment";

interface RecipeCommentListProps {
  comments: recipe_recipe_data_comments[];
  viewMore?: () => void;
}

const RecipeCommentList = ({ comments, viewMore }: RecipeCommentListProps) => {
  return (
    <View style={{ marginHorizontal: -16 }}>
      {comments.map((comment) => (
        <RecipeComment comment={comment} replyButton />
      ))}
      <Divider />
      {viewMore && <ViewMore onPress={viewMore} />}
    </View>
  );
};

export default RecipeCommentList;
