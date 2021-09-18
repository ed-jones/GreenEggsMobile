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
  ChangePasswordDetails,
  changePasswordVariables,
  changePassword,
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
import { useQuery } from "@apollo/client";
import { Me } from "@greeneggs/types/graphql";
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
  },
});

export default function ChangePassword() {
  const form = useForm<
    ChangePasswordDetails,
    changePassword,
    changePasswordVariables
  >(Mutations.CHANGE_PASSWORD, "changePasswordDetails");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { loading, error, data } = useQuery<Me>(Queries.ME);

  if (loading) return <LoadingScreen />;
  if (error) {
    return <Text>Error! {error.message}</Text>;
  }

  function onSubmit() {
    form.submitForm().then((data) => {
      if (!data.data?.changePassword.error) {
        navigation.goBack();
      }
    });
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
        title="Change Password"
      />
      <ScrollView style={styles.view}>
        <ControlledInput
          controllerProps={{
            name: "oldPassword",
            control: form.control,
          }}
          inputProps={{
            label: "OLD PASSWORD",
            style: {
              ...styles.input,
            },
          }}
          submitError={form.formResult.data?.changePassword.error}
          type={InputType.PASSWORD}
        />
        <ControlledInput
          controllerProps={{
            name: "newPassword",
            control: form.control,
          }}
          inputProps={{
            label: "NEW PASSWORD",
            style: {
              ...styles.input,
            },
          }}
          submitError={form.formResult.data?.changePassword.error}
          type={InputType.PASSWORD}
        />
        <ControlledInput
          controllerProps={{
            name: "confirmNewPassword",
            control: form.control,
          }}
          inputProps={{
            label: "CONFIRM NEW PASSWORD",
            style: {
              ...styles.input,
            },
          }}
          submitError={form.formResult.data?.changePassword.error}
          type={InputType.PASSWORD}
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
