import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Icons, Mutations } from "@greeneggs/core";
import {
  AddRecipeComment,
  AddRecipeCommentVariables,
} from "@greeneggs/types/graphql";
import { Button, Input, Spinner } from "@ui-kitten/components";
import { useMutation } from "@apollo/client";

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
  recipeId: string;
}

export default function RecipeAddComment({ recipeId }: RecipeAddCommentProps) {
  const [addRecipeComment, addRecipeCommentResult] = useMutation<
    AddRecipeComment,
    AddRecipeCommentVariables
  >(Mutations.ADD_RECIPE_COMMENT);
  const [comment, setComment] = useState<string>("");

  function handleSubmit() {
    addRecipeComment({
      variables: {
        comment,
        recipeId,
      },
    });
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
          addRecipeCommentResult.loading
            ? () => <Spinner size="small" status="control" />
            : undefined
        }
      >
        ADD COMMENT
      </Button>
    </>
  );
}
