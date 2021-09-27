import React from "react";
import GenericProfile from "./GenericProfile";

const Profile = ({ route }: any) => {
  const { userId } = route.params;

  return <GenericProfile userId={userId} />;
};

export default Profile;
