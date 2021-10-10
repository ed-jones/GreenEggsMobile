import React from "react";
import { Mutations } from "@greeneggs/graphql";
import { ScrollView, StyleSheet } from "react-native";
import {
  ChangePasswordDetails,
  changePasswordVariables,
  changePassword,
} from "@greeneggs/types/graphql";
import {
  Button,
  Spinner,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/core";
import { TopNavigation, Background, Icons, ControlledInput, InputType, useForm } from "@greeneggs/ui";

const styles = StyleSheet.create({
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

export function ChangePassword() {
  const form = useForm<
    ChangePasswordDetails,
    changePassword,
    changePasswordVariables
  >(Mutations.CHANGE_PASSWORD, "changePasswordDetails");
  const navigation = useNavigation();

  function onSubmit() {
    form.submitForm().then((data) => {
      if (!data.data?.changePassword.error) {
        navigation.goBack();
      }
    });
  }

  return (
    <Background>
      <TopNavigation title="Change Password" />
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
    </Background>
  );
}
