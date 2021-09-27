import React from "react";
import { Text } from "@ui-kitten/components";
import { useQuery } from "@apollo/client";
import { Alert, Queries } from "@greeneggs/core";
import { Me } from "@greeneggs/types/graphql";
import LoadingScreen from "../loading/LoadingScreen";
import GenericProfile from "./GenericProfile";

const MyProfile = () => {
  const meResult = useQuery<Me>(Queries.ME);

  if (meResult.loading) {
    return <LoadingScreen />;
  }

  if (meResult.error) {
    return <Alert message="There was an error" type="danger" />;
  }

  const me = meResult.data?.me.data;

  if (me === undefined || me === null) {
    return <Text>Error! User not found</Text>;
  }

  return <GenericProfile userId={me.id} isMe />;
};

export default MyProfile;
