import React, { useEffect, useState } from "react";
import { LabelledIcon, noavatar, Queries } from "@greeneggs/core";
import {
  ListItem,
  Button,
  Divider,
  Avatar,
  Spinner,
} from "@ui-kitten/components";
import { View, Text, StyleSheet } from "react-native";
import {
  comment,
  recipe_recipe_data_comments,
  recipe_recipe_data_comments_replies,
} from "@greeneggs/types/graphql";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { useApolloClient } from "@apollo/client";

const styles = StyleSheet.create({
  avatar: {
    marginRight: 10,
  },
});

interface RecipeCommentProps {
  comment: recipe_recipe_data_comments | recipe_recipe_data_comments_replies;
  replyButton?: boolean;
}

export default function RecipeComment({
  comment,
  replyButton,
}: RecipeCommentProps) {
  const navigation: StackNavigationProp<any, any> = useNavigation();
  const client = useApolloClient();

  function handleLoadReplies() {
    client
      .query<comment>({
        query: Queries.GET_COMMENT,
        variables: {
          commentId: comment.id,
        },
      })
      .then(({ data }) => {
        if (data.comment.data?.replies) {
          navigation.push("RecipeAllComments", {
            comments: data.comment.data.replies,
            commentCount: data.comment.data.replyCount,
            isReply: true,
            commentId: data.comment.data.id,
          });
        }
      });
  }

  return (
    <>
      <ListItem>
        <View style={{ flexDirection: "column", padding: 10, width: "100%" }}>
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
                  navigation.navigate("RecipeCommentReplies", {
                    commentId: comment.id,
                    replying: true,
                  })
                }
              />
            </View>
          </View>

          <Text numberOfLines={2} style={{ marginTop: 16 }}>
            {comment.contents}
          </Text>
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
                  navigation.push("RecipeCommentReplies", {
                    commentId: comment.id,
                    replying: false,
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
