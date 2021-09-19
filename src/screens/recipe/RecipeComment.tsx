import React, { useEffect, useState } from "react";
import { LabelledIcon, Mutations, noavatar, Queries } from "@greeneggs/core";
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
  LikeComment,
  recipe_recipe_data_comments,
  recipe_recipe_data_comments_replies,
  UnlikeComment,
} from "@greeneggs/types/graphql";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { useApolloClient, useMutation } from "@apollo/client";

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

  const [likeComment] = useMutation<LikeComment>(Mutations.LIKE_COMMENT, {
    variables: {
      commentId: comment.id,
    },
    refetchQueries: [Queries.GET_RECIPE, "recipe"],
  });

  const [unlikeComment] = useMutation<UnlikeComment>(Mutations.UNLIKE_COMMENT, {
    variables: {
      commentId: comment.id,
    },
    refetchQueries: [Queries.GET_RECIPE, "recipe"],
  });

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
                iconName={comment.liked ? "heart" : "heart-outline"}
                onPress={comment.liked ? unlikeComment : likeComment}
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
