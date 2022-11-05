/**
 * Author: Wambugu Mutahi
 */
import { ReactElement } from 'react';
import { Mutations } from '@greeneggs/graphql'
import { ScrollView } from 'react-native'
import { ChangePasswordDetails, changePasswordVariables, changePassword } from '@greeneggs/types/graphql'
import { Button, Spinner } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/core'
import { ControlledInput, InputType, useForm } from '@greeneggs/ui/form'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import * as Icons from '@greeneggs/ui/icons'

/**
 * Screen that lets a user change their password.
 */
export function ChangePassword(): ReactElement {
  const form = useForm<ChangePasswordDetails, changePassword, changePasswordVariables>({
    Mutation: Mutations.changePassword,
    mutationVariableName: 'changePasswordDetails',
  })
  const navigation = useNavigation()

  function onSubmit() {
    void form.submitForm().then((data) => {
      if (!data.data?.changePassword.error) {
        navigation.goBack()
      }
    })
  }

  return (
    <Background>
      <TopNavigation title='Change Password' />
      <ScrollView style={{ padding: 16 }}>
        <ControlledInput
          controllerProps={{
            name: 'oldPassword',
            control: form.control,
          }}
          inputProps={{
            label: 'OLD PASSWORD',
            style: {
              marginBottom: 10,
            },
          }}
          submitError={form.formResult.data?.changePassword.error}
          type={InputType.PASSWORD}
        />
        <ControlledInput
          controllerProps={{
            name: 'newPassword',
            control: form.control,
          }}
          inputProps={{
            label: 'NEW PASSWORD',
            style: {
              marginBottom: 10,
            },
          }}
          submitError={form.formResult.data?.changePassword.error}
          type={InputType.PASSWORD}
        />
        <ControlledInput
          controllerProps={{
            name: 'confirmNewPassword',
            control: form.control,
          }}
          inputProps={{
            label: 'CONFIRM NEW PASSWORD',
            style: {
              marginBottom: 10,
            },
          }}
          submitError={form.formResult.data?.changePassword.error}
          type={InputType.PASSWORD}
        />
        <Button
          accessoryRight={form.formResult.loading ? () => <Spinner size='small' status='control' /> : Icons.Save}
          onPress={() => void form.handleSubmit(onSubmit)}
        >
          SAVE CHANGES
        </Button>
      </ScrollView>
    </Background>
  )
}
