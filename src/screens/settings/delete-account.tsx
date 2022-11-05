/**
 * Author: Wambugu Mutahi
 */
import React, { useContext, useEffect, ReactElement } from 'react'
import { Mutations, Queries } from '@greeneggs/graphql'
import { ScrollView, StyleSheet, View, Alert as RNAlert } from 'react-native'
import { deleteUser, LoginInput } from '@greeneggs/types/graphql'
import { Button, Text } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/core'
import { useMutation, useQuery } from '@apollo/client'
import { Me } from '@greeneggs/types/graphql'
import { LoadingScreen } from '../../ui/loading-screen'
import { useLoginForm } from '../auth/use-login-form'
import { AuthContext } from '@greeneggs/context'
import * as SecureStore from 'expo-secure-store'
import { Background } from '@greeneggs/ui/background'
import { Callout } from '@greeneggs/ui/callout'
import { ControlledInput, InputType } from '@greeneggs/ui/form'
import * as Icons from '@greeneggs/ui/icons'
import { TopNavigation } from '@greeneggs/ui/top-navigation'

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
 * Screen that lets a user delete their account.
 * Requires the user to to re-enter their password.
 */
export function DeleteAccount(): ReactElement {
  const navigation = useNavigation()
  const { loading, error, data } = useQuery<Me>(Queries.getMe)
  const { formResult, handleSubmit, control, submitForm, register, setValue } = useLoginForm()
  const { setToken } = useContext(AuthContext)

  const [deleteAccount] = useMutation<deleteUser>(Mutations.deleteUser)

  useEffect(() => {
    register('email')
  }, [register, setValue])

  if (loading) return <LoadingScreen />
  if (error) {
    return <Text>Error! {error.message}</Text>
  }
  const me = data?.me.data

  setValue('email', me?.email || '')

  async function onSubmit() {
    const result = await submitForm()
    const token = result.data?.login.data?.token
    const error = result.data?.login.error
    if (token && !error) {
      RNAlert.alert(
        'Delete your account',
        'This action is permanent',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => navigation.goBack(),
          },
          {
            text: 'OK',
            onPress: () => {
              void SecureStore.deleteItemAsync('token').then(() => {
                void deleteAccount().then(() => {
                  setToken && setToken(null)
                })
              })
            },
          },
        ],
        { cancelable: false }
      )
    }
  }

  return (
    <Background>
      <TopNavigation title='Delete Account' />
      <ScrollView style={styles.view}>
        <Callout
          message={
            <Text>
              If you delete your account you will lose all
              <Text style={{ fontWeight: 'bold' }}>{` ${me?.recipeCount ?? 0}\u00a0recipes `}</Text>
              all other personal data. This action cannot be undone.
              {'\n'}
              {'\n'}
              Are you sure?
            </Text>
          }
          type='danger'
        />
        <ControlledInput<LoginInput>
          inputProps={{
            style: styles.input,
            label: 'CONFIRM PASSWORD',
          }}
          controllerProps={{
            name: 'password',
            defaultValue: '',
            control,
          }}
          submitError={formResult.data?.login.error}
          type={InputType.PASSWORD}
        />
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            accessoryLeft={Icons.Trash}
            status='danger'
            style={{ marginRight: 8 }}
            onPress={() => void handleSubmit(onSubmit)}
          >
            DELETE MY ACCOUNT
          </Button>
          <Button status='control' onPress={() => navigation.goBack()}>
            CANCEL
          </Button>
        </View>
      </ScrollView>
    </Background>
  )
}
