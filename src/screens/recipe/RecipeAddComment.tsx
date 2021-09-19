import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Icons, Mutations, Queries } from "@greeneggs/core";
import {
  AddRecipeComment,
  AddRecipeCommentReply,
  AddRecipeCommentReplyVariables,
  AddRecipeCommentVariables,
  recipe,
  recipeVariables,
} from "@greeneggs/types/graphql";
import { Button, Input, Spinner } from "@ui-kitten/components";
import {
  ApolloCache,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { RecipeFragment } from "@greeneggs/graphql/fragments";

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
      addRecipeReply({
        variables: {
          comment,
          commentId,
        },
        refetchQueries: [Queries.GET_RECIPE, "recipe"],
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
