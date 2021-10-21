/**
 * Author: Andrew Wilkie
 */
import React from "react";
import { GenericProfile } from "./generic-profile";

export const Profile = ({ route }: any) => {
  const { userId } = route.params;

  return <GenericProfile userId={userId} />;
};
