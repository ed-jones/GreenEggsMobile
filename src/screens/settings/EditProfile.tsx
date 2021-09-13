import React from "react";
import {
  ControlledInput,
  Icons,
  InputType,
  Mutations,
  Rules,
  useForm,
} from "@greeneggs/core";
import { ScrollView, StyleSheet } from "react-native";
import {
  editProfile,
  editProfileVariables,
  ProfileDetails,
} from "@greeneggs/types/graphql";
import {
  Button,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import { useQuery } from "@apollo/client";
// import { Me } from "@greeneggs/types/graphql";

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

const useEditProfile = () =>
  useForm<ProfileDetails, editProfile, editProfileVariables>(
    Mutations.EDIT_PROFILE,
    "profileDetails",
    {},
    {
      mode: "all",
    }
  );

const EditProfile = () => {
  const form = useEditProfile();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  // const { loading, error, data, refetch } = useQuery<Me>(Queries.TRENDING, {
  //   variables: {
  //     offset: 0,
  //     limit: 10,
  //   },
  // });

  return (
    <>
      <TopNavigation
        style={{ backgroundColor: "transparent", paddingTop: insets.top }}
        accessoryLeft={() => (
          <TopNavigationAction
            icon={Icons.Back}
            onPress={() => navigation.goBack()}
          />
        )}
        alignment="center"
        title="Edit Profile"
      />
      <ScrollView style={styles.view}>
        <ControlledInput<ProfileDetails>
          controllerProps={{
            name: "firstName",
            control: form.control,
            rules: {
              ...Rules.REQUIRED,
            },
          }}
          inputProps={{
            label: "FIRST NAME",
            defaultValue: "",
            style: {
              ...styles.input,
            },
          }}
          submitError={form.formResult.data?.editProfile.error}
          type={InputType.TEXT}
        />
        <ControlledInput<ProfileDetails>
          controllerProps={{
            name: "lastName",
            control: form.control,
            rules: {
              ...Rules.REQUIRED,
            },
          }}
          inputProps={{
            label: "LAST NAME",
            defaultValue: "",
            style: {
              ...styles.input,
            },
          }}
          submitError={form.formResult.data?.editProfile.error}
          type={InputType.TEXT}
        />
        <ControlledInput<ProfileDetails>
          controllerProps={{
            name: "bio",
            control: form.control,
            rules: {
              ...Rules.REQUIRED,
            },
          }}
          inputProps={{
            label: "BIO",
            defaultValue: "",
            style: {
              ...styles.input,
            },
          }}
          submitError={form.formResult.data?.editProfile.error}
          type={InputType.TEXTAREA}
        />
        <ControlledInput<ProfileDetails>
          controllerProps={{
            name: "profileImage",
            control: form.control,
            rules: {
              ...Rules.REQUIRED,
            },
          }}
          inputProps={{
            label: "PROFILE PICTURE",
            defaultValue: "",
            style: {
              ...styles.input,
              width: "100%",
            },
          }}
          submitError={form.formResult.data?.editProfile.error}
          type={InputType.PHOTO}
        />
        <Button>SAVE CHANGES</Button>
      </ScrollView>
    </>
  );
};

export default EditProfile;
