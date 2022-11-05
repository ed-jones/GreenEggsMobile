/**
 * Author: Edward Jones
 */
import React, { ReactElement, useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Spinner } from '@ui-kitten/components'
import { useLoginForm } from './use-login-form'
import { AuthPageTemplate } from './auth-page-template'
import { LoginInput } from '@greeneggs/types/graphql'
import * as SecureStore from 'expo-secure-store'
import { AuthContext } from '@greeneggs/context'
import { ControlledInput, InputType } from '@greeneggs/ui/form'

const styles = StyleSheet.create({
  forgotPassword: {
    fontWeight: 'bold',
    textAlign: 'right',
    paddingTop: 8,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
})

/**
 * Screen that enables a user to log into Green Eggs with an email and password.
 */
export function Login(): ReactElement {
  const {
    formResult,
    handleSubmit,
    control,
    submitForm,
    formState: { isValid },
  } = useLoginForm({ reValidateMode: 'onChange' })
  const { setToken } = useContext(AuthContext)

  async function submitLoginForm() {
    const result = await submitForm()
    const token = result.data?.login.data?.token
    const error = result.data?.login.error
    if (error) {
      throw new Error(error.message)
    }
    if (token) {
      void SecureStore.setItemAsync('token', token)
      setToken && setToken(token)
    }
  }

  return (
    <AuthPageTemplate
      errorMessage={formResult.data?.login.error?.message}
      message='Log in to view and share recipes with your friends'
    >
      <ControlledInput<LoginInput>
        inputProps={{
          autoFocus: true,
          style: styles.input,
        }}
        controllerProps={{
          name: 'email',
          defaultValue: '',
          control,
        }}
        type={InputType.EMAIL}
      />
      <ControlledInput<LoginInput>
        inputProps={{
          style: styles.input,
        }}
        controllerProps={{
          name: 'password',
          defaultValue: '',
          control,
        }}
        type={InputType.PASSWORD}
      />
      <Button
        onPress={() => void handleSubmit(submitLoginForm)}
        disabled={formResult.loading || !isValid}
        accessoryLeft={formResult.loading ? () => <Spinner size='small' /> : undefined}
      >
        LOGIN
      </Button>
    </AuthPageTemplate>
  )
}
