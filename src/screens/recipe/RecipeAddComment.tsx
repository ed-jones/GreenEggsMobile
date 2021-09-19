import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Icons, Mutations, Queries } from "@greeneggs/core";
import {
  AddRecipeComment,
  AddRecipeCommentReply,
  AddRecipeCommentReplyVariables,
  AddRecipeCommentVariables,
  comment,
  recipe,
  recipeVariables,
} from "@greeneggs/types/graphql";
import { Button, Input, Spinner } from "@ui-kitten/components";
import {
  ApolloCache,
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { RecipeFragment } from "@greeneggs/graphql/fragments";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

export const styles = StyleSheet.create({
  view: {
    padding: 16,
  },
  buttonGroup: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  heading: {
    paddingVertical: 16,
  },
  input: {
    marginBottom: 10,
  },
});

interface RecipeAddCommentProps {
  recipeId?: string;
  commentId?: string;
}

export default function RecipeAddComment({
  recipeId,
  commentId,
}: RecipeAddCommentProps) {
  const [addRecipeComment, addRecipeCommentResult] = useMutation<
    AddRecipeComment,
    AddRecipeCommentVariables
  >(Mutations.ADD_RECIPE_COMMENT);
  const [addRecipeReply, addRecipeCommentReply] = useMutation<
    AddRecipeCommentReply,
    AddRecipeCommentReplyVariables
  >(Mutations.ADD_RECIPE_COMMENT_REPLY);
  const [comment, setComment] = useState<string>("");
  const navigation: StackNavigationProp<any, any> = useNavigation();
  const client = useApolloClient();

  function handleSubmit() {
    if (recipeId) {
      addRecipeComment({
        variables: {
          comment,
          recipeId,
        },
        refetchQueries: [Queries.GET_RECIPE, "recipe"],
      });
    }
    if (commentId) {
      client
        .mutate<AddRecipeCommentReply, AddRecipeCommentReplyVariables>({
          mutation: Mutations.ADD_RECIPE_COMMENT_REPLY,
          variables: {
            comment,
            commentId,
          },
        })
        .then(() => {
          client
            .query<comment>({
              query: Queries.GET_COMMENT,
              variables: {
                commentId,
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
        });
    }

    setComment("");
  }

  return (
    <>
      <Input
        style={styles.input}
        numberOfLines={5}
        multiline
        textAlignVertical="top"
        placeholder="Add a comment here..."
        value={comment}
        onChangeText={(newValue) => setComment(newValue)}
      />
      <Button
        onPress={handleSubmit}
        accessoryRight={
          addRecipeCommentResult.loading || addRecipeCommentReply.loading
            ? () => <Spinner size="small" status="control" />
            : undefined
        }
      >
        ADD COMMENT
      </Button>
    </>
  );
}
