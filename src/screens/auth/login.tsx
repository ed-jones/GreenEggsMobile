/**
 * Author: Edward Jones
 */
import { ReactElement, useContext, useState } from 'react'
import { Button, Spinner } from '@ui-kitten/components'
import { useLoginForm } from './use-login-form'
import { AuthPageTemplate } from './auth-page-template'
import * as SecureStore from 'expo-secure-store'
import { AuthContext } from '@greeneggs/context'
import { ControlledInput, InputType } from '@greeneggs/ui/form'

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
  } = useLoginForm({ mode: 'onChange' })
  const { setToken } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  function submitLoginForm(): void {
    async function handle() {
      const result = await submitForm()
      const token = result.data?.login.data?.token
      const error = result.data?.login.error?.message
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
    <AuthPageTemplate errorMessage={errorMessage} subtitle='Log in to view and share recipes with your friends'>
      <ControlledInput
        inputProps={{
          autoFocus: true,
          style: { marginBottom: 10 },
        }}
        controllerProps={{
          name: 'email',
          defaultValue: '',
          control,
        }}
        type={InputType.EMAIL}
      />
      <ControlledInput
        inputProps={{
          style: { marginBottom: 10 },
        }}
        controllerProps={{
          name: 'password',
          defaultValue: '',
          control,
        }}
        type={InputType.PASSWORD}
      />
      <Button
        onPress={(e) => void handleSubmit(submitLoginForm)(e)}
        disabled={formResult.loading || !isValid}
        accessoryLeft={formResult.loading ? () => <Spinner size='small' /> : undefined}
      >
        LOGIN
      </Button>
    </AuthPageTemplate>
  )
}
