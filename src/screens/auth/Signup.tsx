import React from "react";

import { StyleSheet } from "react-native";
import { Button, Input, Spinner } from "@ui-kitten/components";

import useSignupForm from "./useSignUpForm";
import AuthPageTemplate from "./AuthPageTemplate";
import { setContext } from "@apollo/client/link/context";
import { Controller } from "react-hook-form";
import ControlledInput, {
  InputType,
} from "@greeneggs/core/controlled-input/ControlledInput";
import { SignupInput } from "@greeneggs/types/graphql";

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
});

const Signup = ({ navigation }: any) => {
  const { formResult, handleSubmit, control, submitForm } = useSignupForm();

  async function handleSignupFormSubmit() {
    const result = await submitForm();
    const token = result.data?.signup.data?.token;
    const error = result.data?.signup.error;
    if (token && !error) {
      setContext((_request, _previousContext) => ({
        headers: {
          authorization: token,
        },
      }));
      navigation.navigate("Home");
    }
  }

  return (
    <AuthPageTemplate
      navigation={navigation}
      message="Sign up to view and share recipes with your friends"
    >
      {/* FIRST NAME */}
      <ControlledInput<SignupInput>
        controllerProps={{
          control,
          name: "firstName",
        }}
        inputProps={{
          label: "FIRST NAME",
          defaultValue: "",
          style: styles.input,
          autoFocus: true,
        }}
        submitError={formResult.data?.signup.error}
        type={InputType.FIRSTNAME}
      />
      {/* LAST NAME */}
      <ControlledInput<SignupInput>
        controllerProps={{
          control,
          name: "lastName",
        }}
        inputProps={{
          label: "LAST NAME",
          defaultValue: "",
          style: styles.input,
        }}
        submitError={formResult.data?.signup.error}
        type={InputType.LASTNAME}
      />
      {/* EMAIL */}
      <ControlledInput<SignupInput>
        inputProps={{
          style: styles.input,
        }}
        controllerProps={{
          name: "email",
          defaultValue: "",
          control,
        }}
        submitError={formResult.data?.signup.error}
        type={InputType.EMAIL}
      />
      {/* PASSWORD */}
      <ControlledInput<SignupInput>
        inputProps={{
          style: styles.input,
          label: "PASSWORD",
        }}
        controllerProps={{
          name: "password",
          defaultValue: "",
          control,
        }}
        submitError={formResult.data?.signup.error}
        type={InputType.PASSWORD}
      />
      {/* CONFIRM PASSWORD */}
      <ControlledInput<SignupInput>
        inputProps={{
          style: styles.input,
          label: "CONFIRM PASSWORD",
        }}
        controllerProps={{
          name: "confirmPassword",
          defaultValue: "",
          control,
        }}
        submitError={formResult.data?.signup.error}
        type={InputType.PASSWORD}
      />
      <Button
        onPress={handleSubmit(handleSignupFormSubmit)}
        disabled={formResult.loading}
        accessoryLeft={
          formResult.loading ? () => <Spinner size="small" /> : undefined
        }
      >
        SIGN UP
      </Button>
    </AuthPageTemplate>
  );
};

export default Signup;
