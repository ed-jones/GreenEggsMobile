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
  comment_comment_data_replies,
  recipe_recipe_data_comments,
} from "@greeneggs/types/graphql";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { useApolloClient, useLazyQuery } from "@apollo/client";

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
            comments: data.comment.data?.replies,
            commentCount: comment.replyCount,
            isReply: true,
            commentId: comment.id,
          });
        }
      });
  }

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
                onPress={handleLoadReplies}
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
