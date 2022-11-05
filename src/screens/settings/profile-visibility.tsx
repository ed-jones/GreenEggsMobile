/**
 * Author: Wambugu Mutahi
 */
import React, { ReactElement } from 'react'
import { Button, Spinner, Text } from '@ui-kitten/components'
import { ScrollView } from 'react-native'
import { Mutations, Queries } from '@greeneggs/graphql'
import { useNavigation } from '@react-navigation/core'
import {
  Me,
  ProfileVisibilityDetails,
  UpdateProfileVisibility,
  UpdateProfileVisibilityVariables,
} from '@greeneggs/types/graphql'
import { useQuery } from '@apollo/client'
import { fullUserFragment } from '@greeneggs/graphql/fragments'

import { LoadingScreen } from '../../ui/loading-screen'
import { ControlledInput, InputType, rules, useForm } from '@greeneggs/ui/form'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import { Callout } from '@greeneggs/ui/callout'
import * as Icons from '@greeneggs/ui/icons'

/**
 * Note: Privacy features are not currently all implemented, so this screen is disabled.
 *
 * Setting screen for profile visibility.
 * Lets the user edit who can see their profile.
 */
export function ProfileVisibility(): ReactElement {
  const navigation = useNavigation()

  const { loading, error, data } = useQuery<Me>(Queries.getMe)
  const form = useForm<ProfileVisibilityDetails, UpdateProfileVisibility, UpdateProfileVisibilityVariables>({
    Mutation: Mutations.updateProfileVisibility,
    mutationVariableName: 'profileVisibilityDetails',
  })

  if (loading) return <LoadingScreen />
  if (error) {
    return <Text>Error!{error.message}</Text>
  }
  const me = data?.me.data

  function handleSubmit() {
    void form
      .submitForm({
        variables: {
          profileVisibilityDetails: {
            visibility: form.getValues('visibility'),
          },
        },
        update: (cache) => {
          if (me?.id) {
            cache.writeFragment({
              id: `FullUser:${me.id}`,
              data: {
                ...me,
                visibility: form.getValues('visibility'),
              },
              fragment: fullUserFragment,
              fragmentName: 'FullUserFragment',
            })
          }
        },
      })
      .then(() => navigation.goBack())
  }

  return (
    <Background>
      <TopNavigation title='Profile Visibility' />
      <ScrollView style={{ padding: 16 }}>
        <Callout
          message={
            <Text>
              Here you can control which users are able to follow you.{'\n\n'}
              <Text style={{ fontWeight: 'bold' }}>EVERYONE</Text> means your profile is public and anyone can follow
              you.{'\n\n'}
              <Text style={{ fontWeight: 'bold' }}>FRIENDS</Text> means your profile is only visible to friends and you
              have to approve follow requests.{'\n\n'}
              <Text style={{ fontWeight: 'bold' }}>ONLY ME</Text> means nobody can follow you. Your profile is hidden
              and you won{"'"}t appear in any searches.{'\n\n'}
            </Text>
          }
          type='info'
        />
        <ControlledInput<ProfileVisibilityDetails>
          controllerProps={{
            name: 'visibility',
            control: form.control,
            rules: {
              ...rules.REQUIRED,
            },
            defaultValue: me?.visibility,
          }}
          submitError={form.formResult.data?.updateProfileVisibility.error}
          type={InputType.PRIVACY}
        />
        <Button
          onPress={handleSubmit}
          accessoryRight={form.formResult.loading ? () => <Spinner size='small' status='control' /> : Icons.Save}
        >
          SAVE CHANGES
        </Button>
      </ScrollView>
    </Background>
  )
}
