import React from "react";
import {
  ControlledInput,
  Icons,
  InputType,
  Mutations,
  Queries,
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
  Text,
  Spinner,
} from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";

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
    "profileDetails"
  );

export default function EditProfile() {
  const form = useEditProfile();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  function onSubmit() {
    form
      .submitForm()
      .then((data) => console.log(data.data?.editProfile.error))
      .catch((e) => console.log(e));
  }

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
            name: "profileImage",
            control: form.control,
          }}
          inputProps={{
            label: "PROFILE PICTURE",
            style: {
              ...styles.input,
              width: "100%",
            },
          }}
          submitError={form.formResult.data?.editProfile.error}
          type={InputType.PHOTO}
        />
        <Button
          accessoryRight={
            form.formResult.loading
              ? () => <Spinner size="small" status="control" />
              : Icons.Save
          }
          onPress={form.handleSubmit(onSubmit)}
        >
          SAVE CHANGES
        </Button>
      </ScrollView>
    </>
  );
}
