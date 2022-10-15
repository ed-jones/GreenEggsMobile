/**
 * Author: Wambugu Mutahi
 */
import React, { ReactElement } from 'react'
import { Mutations, Queries } from '@greeneggs/graphql'
import { ScrollView, StyleSheet } from 'react-native'
import { editProfile, editProfileVariables, ProfileDetails } from '@greeneggs/types/graphql'
import { Button, Text, Spinner } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/core'
import { useQuery } from '@apollo/client'
import { Me } from '@greeneggs/types/graphql'
import { LoadingScreen } from '../loading-screen'
import { TopNavigation, Background, Icons, ControlledInput, InputType, useForm } from '@greeneggs/ui'

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

const useEditProfile = () =>
  useForm<ProfileDetails, editProfile, editProfileVariables>(Mutations.EDIT_PROFILE, 'profileDetails')

/**
 * Screen that lets a user edit their basic profile details,
 * including First Name, Last Name and Bio.
 */
export function EditProfile(): ReactElement {
  const form = useEditProfile()
  const navigation = useNavigation()
  const { loading, error, data } = useQuery<Me>(Queries.ME)

  if (loading) return <LoadingScreen />
  if (error) {
    return <Text>Error! {error.message}</Text>
  }

  function onSubmit() {
    form.submitForm().then(() => {
      navigation.goBack()
    })
  }

  return (
    <Background>
      <TopNavigation title='Edit Profile' />
      <ScrollView style={styles.view}>
        <ControlledInput<ProfileDetails>
          controllerProps={{
            name: 'firstName',
            control: form.control,
            defaultValue: data?.me.data?.firstName,
          }}
          inputProps={{
            label: 'FIRST NAME',
            style: {
              ...styles.input,
            },
          }}
          submitError={form.formResult.data?.editProfile.error}
          type={InputType.TEXT}
        />
        <ControlledInput<ProfileDetails>
          controllerProps={{
            name: 'lastName',
            control: form.control,
            defaultValue: data?.me.data?.lastName,
          }}
          inputProps={{
            label: 'LAST NAME',
            style: {
              ...styles.input,
            },
          }}
          submitError={form.formResult.data?.editProfile.error}
          type={InputType.TEXT}
        />
        <ControlledInput<ProfileDetails>
          controllerProps={{
            name: 'bio',
            control: form.control,
            defaultValue: data?.me.data?.bio ?? '',
          }}
          inputProps={{
            label: 'BIO',
            style: {
              ...styles.input,
            },
          }}
          submitError={form.formResult.data?.editProfile.error}
          type={InputType.TEXTAREA}
        />
        <Button
          accessoryRight={form.formResult.loading ? () => <Spinner size='small' status='control' /> : Icons.Save}
          onPress={form.handleSubmit(onSubmit)}
        >
          SAVE CHANGES
        </Button>
      </ScrollView>
    </Background>
  )
}
