/**
 * Author: Wambugu Mutahi
 */
import { ReactElement } from 'react'
import { Mutations, Queries } from '@greeneggs/graphql'
import { ScrollView } from 'react-native'
import { editProfile, editProfileVariables, ProfileDetails } from '@greeneggs/types/graphql'
import { Button, Text, Spinner } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/core'
import { useQuery } from '@apollo/client'
import { Me } from '@greeneggs/types/graphql'
import { LoadingScreen } from '../../ui/loading-screen'
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
 * Screen that lets a user edit their basic profile details,
 * including First Name, Last Name and Bio.
 */
export function EditProfile(): ReactElement {
  const form = useEditProfile()
  const navigation = useNavigation()
  const { loading: isLoading, error, data } = useQuery<Me>(Queries.getMe)

  if (isLoading) return <LoadingScreen />
  if (error) {
    return <Text>Error! {error.message}</Text>
  }

  function onSubmit() {
    void form.submitForm().then(() => {
      navigation.goBack()
    })
  }

  return (
    <Background>
      <TopNavigation title='Edit Profile' />
      <ScrollView style={{ padding: 16 }}>
        <ControlledInput<ProfileDetails>
          controllerProps={{
            name: 'firstName',
            control: form.control,
            defaultValue: data?.me.data?.firstName,
          }}
          inputProps={{
            label: 'FIRST NAME',
            style: {
              marginBottom: 10,
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
              marginBottom: 10,
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
              marginBottom: 10,
            },
          }}
          submitError={form.formResult.data?.editProfile.error}
          type={InputType.TEXTAREA}
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
