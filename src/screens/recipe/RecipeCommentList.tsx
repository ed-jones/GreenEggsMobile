import React from "react";
import { LabelledIcon } from "@greeneggs/core";
import { Divider, ListItem } from "@ui-kitten/components";
import { View, Text } from "react-native";
import ViewMore from "@greeneggs/core/view-more/ViewMore";
import { recipe_recipe_data_comments } from "@greeneggs/types/graphql";
import { useNavigation } from "@react-navigation/core";

interface RecipeCommentListProps {
  comments: recipe_recipe_data_comments[];
  viewMore?: () => void;
}

const RecipeCommentList = ({ comments, viewMore }: RecipeCommentListProps) => {
  return (
    <View style={{ marginHorizontal: -16 }}>
      {comments.map((comment) => (
        <ListItem>
          <View style={{ flexDirection: "column", padding: 10, width: "100%" }}>
            <Text numberOfLines={2} style={{ marginBottom: 16 }}>
              {comment.contents}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text style={{ fontWeight: "bold" }}>Bobby Rutherford</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <LabelledIcon
                  label={comment.likeCount.toString()}
                  iconName="heart-outline"
                />
                <LabelledIcon label="Reply" iconName="undo-outline" />
              </View>
            </View>
          </View>
        </ListItem>
      ))}
      <Divider />
      {viewMore && <ViewMore onPress={viewMore} />}
    </View>
  );
};

export default RecipeCommentList;
