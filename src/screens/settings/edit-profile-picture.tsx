/**
 * Author: Wambugu Mutahi
 */
import React from 'react'
import { Mutations } from '@greeneggs/graphql'
import { ScrollView, StyleSheet } from 'react-native'
import { editProfile, editProfileVariables, ProfileDetails } from '@greeneggs/types/graphql'
import { Button, Spinner } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/core'
import {
  TopNavigation,
  Background,
  Icons,
  ControlledInput,
  InputType,
  useForm,
} from '@greeneggs/ui'

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
  useForm<ProfileDetails, editProfile, editProfileVariables>(
    Mutations.EDIT_PROFILE,
    'profileDetails'
  )

/**
 * Screen that lets a user edit their profile picture.
 */
export function EditProfilePicture() {
  const form = useEditProfile()
  const navigation = useNavigation()

  function onSubmit() {
    form.submitForm().then(() => navigation.goBack())
  }

  return (
    <Background>
      <TopNavigation title='Edit Profile Picture' />
      <ScrollView style={styles.view}>
        <ControlledInput<ProfileDetails>
          controllerProps={{
            name: 'profileImage',
            control: form.control,
          }}
          inputProps={{
            label: 'PROFILE PICTURE',
            style: {
              ...styles.input,
              width: '100%',
            },
          }}
          submitError={form.formResult.data?.editProfile.error}
          type={InputType.PHOTO}
        />
        <Button
          accessoryRight={
            form.formResult.loading ? () => <Spinner size='small' status='control' /> : Icons.Save
          }
          onPress={form.handleSubmit(onSubmit)}
        >
          SAVE CHANGES
        </Button>
      </ScrollView>
    </Background>
  )
}
