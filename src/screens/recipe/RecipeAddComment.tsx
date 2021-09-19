import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icons, Mutations, noavatar, Queries } from "@greeneggs/core";
import {
  AddRecipeComment,
  AddRecipeCommentReply,
  AddRecipeCommentReplyVariables,
  AddRecipeCommentVariables,
  comment,
  Me,
  recipe,
  recipeVariables,
} from "@greeneggs/types/graphql";
import { Avatar, Button, Input, Text } from "@ui-kitten/components";
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
import LoadingScreen from "../loading/LoadingScreen";

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
    flex: 1,
  },
  avatar: {
    marginRight: 10,
  },
});

interface RecipeAddCommentProps {
  recipeId?: string;
  commentId?: string;
  isReply?: boolean;
  active?: boolean;
}

export default function RecipeAddComment({
  recipeId,
  commentId,
  isReply,
  active,
}: RecipeAddCommentProps) {
  const [comment, setComment] = useState<string>("");
  const navigation: StackNavigationProp<any, any> = useNavigation();
  const client = useApolloClient();
  const { loading, error, data } = useQuery<Me>(Queries.ME);
  if (loading) return <LoadingScreen />;
  if (error) {
    return <Text>Error! {error.message}</Text>;
  }
  const me = data?.me.data;

  function handleSubmit() {
    if (recipeId) {
      client
        .mutate<AddRecipeComment, AddRecipeCommentVariables>({
          mutation: Mutations.ADD_RECIPE_COMMENT,
          variables: {
            comment,
            recipeId,
          },
          refetchQueries: [Queries.GET_RECIPE, "recipe"],
        })
        .then(() => {
          client.query<recipe>({
            query: Queries.GET_RECIPE,
            variables: {
              recipeId,
            },
          });
        });
    }
    if (commentId) {
      client.mutate<AddRecipeCommentReply, AddRecipeCommentReplyVariables>({
        mutation: Mutations.ADD_RECIPE_COMMENT_REPLY,
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            height: "100%",
          }}
        >
          <Avatar
            size="small"
            source={me?.avatarURI ? { uri: me?.avatarURI } : noavatar}
            style={styles.avatar}
          />
        </View>
        <Input
          autoFocus={active}
          style={styles.input}
          numberOfLines={3}
          multiline
          textAlignVertical="top"
          placeholder={`Write a ${isReply ? "reply" : "comment"}...`}
          value={comment}
          onChangeText={(newValue) => setComment(newValue)}
        />
      </View>

      <Button onPress={handleSubmit}>{`POST ${
        isReply ? "REPLY" : "COMMENT"
      }`}</Button>
    </>
  );
}
