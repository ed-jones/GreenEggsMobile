import React from "react";
import { Icons, LabelledIcon, noavatar } from "@greeneggs/core";
import { ListItem, Button, Divider, Avatar } from "@ui-kitten/components";
import { View, Text, StyleSheet } from "react-native";
import { recipe_recipe_data_comments } from "@greeneggs/types/graphql";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

const styles = StyleSheet.create({
  avatar: {
    marginRight: 10,
  },
});

interface RecipeCommentProps {
  comment: recipe_recipe_data_comments;
  replyButton?: boolean;
}

export default function RecipeComment({
  comment,
  replyButton,
}: RecipeCommentProps) {
  const navigation: StackNavigationProp<any, any> = useNavigation();
  return (
    <>
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar
                size="small"
                source={
                  comment.submittedBy.avatarURI
                    ? { uri: comment.submittedBy.avatarURI }
                    : noavatar
                }
                style={styles.avatar}
              />
              <Text
                style={{ fontWeight: "bold" }}
              >{`${comment.submittedBy.firstName} ${comment.submittedBy.lastName}`}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <LabelledIcon
                label={comment.likeCount.toString()}
                iconName="heart-outline"
              />
              <LabelledIcon
                label="Reply"
                iconName="message-square-outline"
                onPress={() =>
                  navigation.push("RecipeCommentReplies", {
                    comment,
                  })
                }
              />
            </View>
          </View>
          {comment.replyCount > 0 && replyButton && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 16,
              }}
            >
              <Button
                onPress={() =>
                  navigation.push("RecipeAllComments", {
                    comments: comment.replies,
                    commentCount: comment.replyCount,
                    isReply: true,
                  })
                }
                size="small"
                status="basic"
              >{`SHOW ALL REPLIES (${comment.replyCount.toString()})`}</Button>
            </View>
          )}
        </View>
      </ListItem>
      <Divider />
    </>
  );
}
