/**
 * Author: Edward Jones
 */
import { ReactElement, useContext, useState } from 'react'
import { Button, CheckBox, Spinner, Text } from '@ui-kitten/components'
import { AuthContext } from '@greeneggs/context'
import * as SecureStore from 'expo-secure-store'
import { useSignupForm } from './use-sign-up-form'
import { AuthPageTemplate } from './auth-page-template'
import { useNavigation } from '@react-navigation/native'
import { LoggedOutNavigationProp } from '@greeneggs/navigation/types'
import { ControlledInput, InputType } from '@greeneggs/ui/form'

/**
 * Screen that enables a user to sign up to Green Eggs.
 */
export function Signup(): ReactElement {
  const navigation = useNavigation<LoggedOutNavigationProp>()
  const {
    formResult,
    handleSubmit,
    control,
    submitForm,
    formState: { isValid },
  } = useSignupForm({ mode: 'onChange' })
  const { setToken } = useContext(AuthContext)
  const [hasConsent, setHasConsent] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  function handleSignupFormSubmit() {
    async function handle() {
      const result = await submitForm()
      const token = result.data?.signup.data?.token
      const error = result.data?.signup.error?.message
      if (error) {
        throw new Error(error)
      }
      if (token) {
        void SecureStore.setItemAsync('token', token)
        setToken && setToken(token)
      }
    }
    handle().catch((e: Error) => setErrorMessage(e.message))
  }

  return (
    <AuthPageTemplate errorMessage={errorMessage} subtitle='Sign up to view and share recipes with your friends'>
      {/* FIRST NAME */}
      <ControlledInput
        controllerProps={{
          control,
          name: 'firstName',
        }}
        inputProps={{
          label: 'FIRST NAME',
          defaultValue: '',
          style: { marginBottom: 10 },
          autoFocus: true,
        }}
        submitError={formResult.data?.signup.error}
        type={InputType.FIRSTNAME}
      />
      {/* LAST NAME */}
      <ControlledInput
        controllerProps={{
          control,
          name: 'lastName',
        }}
        inputProps={{
          label: 'LAST NAME',
          defaultValue: '',
          style: { marginBottom: 10 },
        }}
        submitError={formResult.data?.signup.error}
        type={InputType.LASTNAME}
      />
      {/* EMAIL */}
      <ControlledInput
        inputProps={{
          style: { marginBottom: 10 },
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
      <ControlledInput
        inputProps={{
          style: { marginBottom: 10 },
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
      <ControlledInput
        inputProps={{
          style: { marginBottom: 10 },
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
      <CheckBox
        checked={hasConsent}
        style={{ paddingVertical: 16 }}
        onChange={(nextChecked) => setHasConsent(nextChecked)}
      >
        <Text>
          I have read and agreed to the{' '}
          <Text style={{ fontWeight: 'bold' }} onPress={() => navigation.navigate('Privacy')}>
            Privacy Policy
          </Text>
        </Text>
      </CheckBox>
      <Button
        onPress={(e) => void handleSubmit(handleSignupFormSubmit)(e)}
        disabled={formResult.loading || !hasConsent || !isValid}
        accessoryLeft={formResult.loading ? () => <Spinner size='small' /> : undefined}
      >
        SIGN UP
      </Button>
    </AuthPageTemplate>
  )
}
