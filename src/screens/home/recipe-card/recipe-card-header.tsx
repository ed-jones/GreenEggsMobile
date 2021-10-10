import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Icon, Text } from "@ui-kitten/components";
import { recipes_recipes_data_submittedBy } from "@greeneggs/types/graphql";
import { noavatar } from "@greeneggs/core";

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    padding: 14,
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftElements: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rightElements: {
    flexDirection: "row",
  },
  avatar: {
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
  },
  ellipsisIcon: {
    width: 24,
    height: 24,
  },
});

export interface IRecipeCardHeaderProps
  extends Partial<recipes_recipes_data_submittedBy> {
  avatarURI?: string | null;
  firstName: string;
  lastName: string;
}

const RecipeCardHeader = ({
  avatarURI,
  firstName,
  lastName,
}: IRecipeCardHeaderProps) => (
  <View style={styles.view}>
    <View style={styles.leftElements}>
      <Avatar
        size="small"
        source={avatarURI ? { uri: avatarURI } : noavatar}
        style={styles.avatar}
      />
      <Text style={styles.username}>{`${firstName} ${lastName}`}</Text>
    </View>
  </View>
);

export default RecipeCardHeader;
