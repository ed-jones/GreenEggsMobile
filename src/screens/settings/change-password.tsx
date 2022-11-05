/**
 * Author: Wambugu Mutahi
 */
import React, { ReactElement } from 'react'
import { Mutations } from '@greeneggs/graphql'
import { ScrollView, StyleSheet } from 'react-native'
import { ChangePasswordDetails, changePasswordVariables, changePassword } from '@greeneggs/types/graphql'
import { Button, Spinner } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/core'
import { ControlledInput, InputType, useForm } from '@greeneggs/ui/form'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import * as Icons from '@greeneggs/ui/icons'

const styles = StyleSheet.create({
  view: {
    padding: 16,
  },
  buttonGroup: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  heading: {
    paddingVertical: 16,
  },
  input: {
    marginBottom: 10,
  },
})

/**
 * Screen that lets a user change their password.
 */
export function ChangePassword(): ReactElement {
  const form = useForm<ChangePasswordDetails, changePassword, changePasswordVariables>(
    Mutations.changePassword,
    'changePasswordDetails'
  )
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
      <ScrollView style={styles.view}>
        <ControlledInput
          controllerProps={{
            name: 'oldPassword',
            control: form.control,
          }}
          inputProps={{
            label: 'OLD PASSWORD',
            style: {
              ...styles.input,
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
              ...styles.input,
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
              ...styles.input,
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
