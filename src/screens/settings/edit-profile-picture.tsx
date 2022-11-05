/**
 * Author: Wambugu Mutahi
 */
import { ReactElement } from 'react';
import { Mutations } from '@greeneggs/graphql'
import { ScrollView } from 'react-native'
import { editProfile, editProfileVariables, ProfileDetails } from '@greeneggs/types/graphql'
import { Button, Spinner } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/core'
import { ControlledInput, InputType, useForm } from '@greeneggs/ui/form'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import * as Icons from '@greeneggs/ui/icons'

const useEditProfile = () =>
  useForm<ProfileDetails, editProfile, editProfileVariables>({
    Mutation: Mutations.editProfile,
    mutationVariableName: 'profileDetails',
  })

/**
 * Screen that lets a user edit their profile picture.
 */
export function EditProfilePicture(): ReactElement {
  const form = useEditProfile()
  const navigation = useNavigation()

  function onSubmit() {
    void form.submitForm().then(() => navigation.goBack())
  }

  return (
    <Background>
      <TopNavigation title='Edit Profile Picture' />
      <ScrollView style={{ padding: 16 }}>
        <ControlledInput<ProfileDetails>
          controllerProps={{
            name: 'profileImage',
            control: form.control,
          }}
          inputProps={{
            label: 'PROFILE PICTURE',
            style: {
              marginBottom: 10,
              width: '100%',
            },
          }}
          submitError={form.formResult.data?.editProfile.error}
          type={InputType.PHOTO}
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
