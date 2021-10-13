import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Background,
  Icons,
  LazyList,
  TopNavigation,
  UserListItem,
  Input,
} from "@greeneggs/ui";
import {
  FollowingUsers,
  FollowingUsersVariables,
  FollowingUsers_followingUsers_data,
  RecipeFilter,
  Sort,
} from "@greeneggs/types/graphql";
import { Queries } from "@greeneggs/graphql";
import { RouteProp, useRoute } from "@react-navigation/core";

const styles = StyleSheet.create({
  found: {
    padding: 16,
  },
  search: {
    margin: 16,
  },
  view: {
    height: "100%",
  },
});

export const Following = () => {
  const [query, setQuery] = useState("");
  const {
    params: { userId },
  } = useRoute<RouteProp<{ params: { userId: string } }, "params">>();

  return (
    <Background style={{ ...styles.view }}>
      <TopNavigation title="Following" />
      <Input
        placeholder="Search users"
        size="medium"
        style={styles.search}
        accessoryLeft={Icons.Search}
        value={query}
        onChangeText={(newText) => setQuery(newText)}
      />
      <LazyList<
        FollowingUsers,
        FollowingUsersVariables,
        FollowingUsers_followingUsers_data,
        Sort,
        RecipeFilter
      >
        limit={15}
        query={Queries.GET_FOLLOWING_USERS}
        variables={{
          userId,
          query,
        }}
        dataKey="followingUsers"
        emptyMessage="This user hasn't followed anyone."
        renderItem={({ item: user }) => <UserListItem user={user} />}
      />
    </Background>
  );
};
