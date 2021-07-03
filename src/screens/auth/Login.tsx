import React from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Spinner } from "@ui-kitten/components";
import useLoginForm from "./useLoginForm";
import { setContext } from "@apollo/client/link/context";
import AuthPageTemplate from "./AuthPageTemplate";
import { Controller } from "react-hook-form";
import ControlledInput, {
  InputType,
} from "@greeneggs/core/controlled-input/ControlledInput";
import { LoginInput } from "@greeneggs/types/graphql";

const styles = StyleSheet.create({
  forgotPassword: {
    fontWeight: "bold",
    textAlign: "right",
    paddingTop: 8,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
});

const Login = ({ navigation }: any) => {
  const { formResult, handleSubmit, control, submitForm } = useLoginForm();

  async function onSubmit() {
    const result = await submitForm();
    const token = result.data?.login.data?.token;
    const error = result.data?.login.error;
    if (token && !error) {
      // SET CONTEXT
      navigation.navigate("Home");
    }
  }

  return (
    <AuthPageTemplate
      navigation={navigation}
      message="Log in to view and share recipes with your friends"
    >
      <ControlledInput<LoginInput>
        inputProps={{
          autoFocus: true,
          style: styles.input,
        }}
        controllerProps={{
          name: "email",
          defaultValue: "",
          control,
        }}
        submitError={formResult.data?.login.error}
        type={InputType.EMAIL}
      />
      <ControlledInput<LoginInput>
        inputProps={{
          style: styles.input,
        }}
        controllerProps={{
          name: "password",
          defaultValue: "",
          control,
        }}
        submitError={formResult.data?.login.error}
        type={InputType.PASSWORD}
      />
      {/* <Text category="p2" style={styles.forgotPassword}>Forgot Password?</Text> */}
      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={formResult.loading}
        accessoryLeft={
          formResult.loading ? () => <Spinner size="small" /> : undefined
        }
      >
        LOGIN
      </Button>
    </AuthPageTemplate>
  );
};

export default Login;
