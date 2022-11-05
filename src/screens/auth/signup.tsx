/**
 * Author: Edward Jones
 */
import React, { ReactElement, useContext, useState } from 'react'

import { StyleSheet } from 'react-native'
import { Button, CheckBox, Spinner, Text } from '@ui-kitten/components'
import { SignupInput } from '@greeneggs/types/graphql'
import { AuthContext } from '@greeneggs/context'
import * as SecureStore from 'expo-secure-store'

import { useSignupForm } from './use-sign-up-form'
import { AuthPageTemplate } from './auth-page-template'
import { useNavigation } from '@react-navigation/native'
import { LoggedOutNavigationProp } from '@greeneggs/navigation/types'
import { ControlledInput, InputType } from '@greeneggs/ui/form'

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
})

/**
 * Screen that enables a user to sign up to Green Eggs.
 */
export function Signup(): ReactElement {
  const navigation = useNavigation<LoggedOutNavigationProp>()
  const { formResult, handleSubmit, control, submitForm } = useSignupForm()
  const { setToken } = useContext(AuthContext)
  const [consent, setConsent] = useState(false)

  async function handleSignupFormSubmit() {
    const result = await submitForm()
    const token = result.data?.signup.data?.token
    const error = result.data?.signup.error
    if (token && !error) {
      void SecureStore.setItemAsync('token', token)
      setToken && setToken(token)
    }
  }

  return (
    <AuthPageTemplate message='Sign up to view and share recipes with your friends'>
      {/* FIRST NAME */}
      <ControlledInput<SignupInput>
        controllerProps={{
          control,
          name: 'firstName',
        }}
        inputProps={{
          label: 'FIRST NAME',
          defaultValue: '',
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
          name: 'lastName',
        }}
        inputProps={{
          label: 'LAST NAME',
          defaultValue: '',
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
          name: 'email',
          defaultValue: '',
          control,
        }}
        submitError={formResult.data?.signup.error}
        type={InputType.EMAIL}
      />
      {/* PASSWORD */}
      <ControlledInput<SignupInput>
        inputProps={{
          style: styles.input,
          label: 'PASSWORD',
        }}
        controllerProps={{
          name: 'password',
          defaultValue: '',
          control,
        }}
        submitError={formResult.data?.signup.error}
        type={InputType.PASSWORD}
      />
      {/* CONFIRM PASSWORD */}
      <ControlledInput<SignupInput>
        inputProps={{
          style: styles.input,
          label: 'CONFIRM PASSWORD',
        }}
        controllerProps={{
          name: 'confirmPassword',
          defaultValue: '',
          control,
        }}
        submitError={formResult.data?.signup.error}
        type={InputType.PASSWORD}
      />
      <CheckBox checked={consent} style={{ paddingVertical: 16 }} onChange={(nextChecked) => setConsent(nextChecked)}>
        <Text>
          I have read and agreed to the{' '}
          <Text style={{ fontWeight: 'bold' }} onPress={() => navigation.navigate('Privacy')}>
            Privacy Policy
          </Text>
        </Text>
      </CheckBox>
      <Button
        onPress={() => void handleSubmit(handleSignupFormSubmit)}
        disabled={formResult.loading || !consent}
        accessoryLeft={formResult.loading ? () => <Spinner size='small' /> : undefined}
      >
        SIGN UP
      </Button>
    </AuthPageTemplate>
  )
}
