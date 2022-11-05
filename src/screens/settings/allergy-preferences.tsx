/**
 * Author: Wambugu Mutahi
 */
import React, { useState } from 'react'
import { Button, IndexPath, List, ListItem, SelectItem, Spinner, Text } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { Mutations, Queries } from '@greeneggs/graphql'
import { useMutation, useQuery } from '@apollo/client'
import {
  Allergies,
  Allergies_allergies_data,
  Me,
  RemoveAllergyPreferences,
  RemoveAllergyPreferencesVariables,
  UpdateAllergyPreferences,
  UpdateAllergyPreferencesVariables,
} from '@greeneggs/types/graphql'
import { LoadingScreen } from '../../ui/loading-screen'
import { fullUserFragment } from '@greeneggs/graphql/fragments'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import { Callout } from '@greeneggs/ui/callout'
import { Select } from '@greeneggs/ui/select'
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

function indexToNumber(selectedIndex: IndexPath | IndexPath[]) {
  return Number(selectedIndex.toString()) - 1
}

/**
 * Screen that lets a user update their allergy preferences.
 * For instance, a user may want to only see gluten free recipes globally in the app.
 */
export function AllergyPreferences() {
  const getAllergy = useQuery<Allergies>(Queries.getAllergies, {
    variables: {
      query: '',
      offset: 0,
      limit: 100,
    },
  })
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0))
  const getMe = useQuery<Me>(Queries.getMe)

  const [removeAllergyPreferences] = useMutation<RemoveAllergyPreferences, RemoveAllergyPreferencesVariables>(
    Mutations.removeAllergyPreferences
  )
  const [updateAllergyPreferences, updateAllergyPreferencesResult] = useMutation<
    UpdateAllergyPreferences,
    UpdateAllergyPreferencesVariables
  >(Mutations.updateAllergyPreferences)

  if (getAllergy.loading || getMe.loading) return <LoadingScreen />
  if (getAllergy.error) {
    return <Text>Error!{getAllergy.error.message}</Text>
  }
  if (getMe.error) {
    return <Text>Error!{getMe.error.message}</Text>
  }
  const me = getMe.data?.me.data
  const allergies = getAllergy.data?.allergies.data || []
  const unselectedAllergies = allergies.filter((allergy) => !me?.allergyPreferences.includes(allergy))

  function handleSubmit() {
    if (me?.allergyPreferences) {
      void updateAllergyPreferences({
        variables: {
          allergyPreferences: {
            allergies: [
              ...me.allergyPreferences.map((selectedAllergy) => selectedAllergy.id),
              unselectedAllergies[indexToNumber(selectedIndex)].id,
            ],
          },
        },
        update(cache) {
          cache.writeFragment({
            id: `FullUser:${me.id}`,
            data: {
              ...me,
              allergyPreferences: [
                ...new Set([...me.allergyPreferences, unselectedAllergies[indexToNumber(selectedIndex)]]),
              ],
            },
            fragment: fullUserFragment,
            fragmentName: 'FullUserFragment',
          })
        },
      })
    }
    setSelectedIndex(new IndexPath(0))
  }

  function removeAllergy(allergy: Allergies_allergies_data) {
    if (me?.allergyPreferences) {
      void removeAllergyPreferences({
        variables: {
          allergyPreferences: {
            allergies: [allergy.id],
          },
        },
        update(cache) {
          cache.writeFragment({
            id: `FullUser:${me.id}`,
            data: {
              ...me,
              allergyPreferences: me.allergyPreferences.filter((allAllergies) => allAllergies.id !== allergy.id),
            },
            fragment: fullUserFragment,
            fragmentName: 'FullUserFragment',
          })
        },
      })
    }
  }
  return (
    <Background>
      <TopNavigation title='Allergy Preferences' />
      <View>
        <View style={styles.view}>
          <Callout
            message='Here you can tell us if you have any allergies so that we can better show you recipes relevant to you.'
            type='info'
          />
          <View style={{ flexDirection: 'row' }}>
            <Select
              style={{ flex: 1, marginHorizontal: 8 }}
              onSelect={(index) => setSelectedIndex(index)}
              selectedIndex={selectedIndex}
              disabled={unselectedAllergies.length === 0}
              value={unselectedAllergies[indexToNumber(selectedIndex)]?.name || 'NO ALLERGIES FOUND'}
            >
              {unselectedAllergies.map((allergy) => (
                <SelectItem key={allergy.id} title={allergy.name} />
              ))}
            </Select>
            <Button
              size='small'
              onPress={handleSubmit}
              disabled={unselectedAllergies.length === 0}
              accessoryLeft={
                updateAllergyPreferencesResult.loading ? () => <Spinner size='small' status='control' /> : Icons.Add
              }
            >
              Add
            </Button>
          </View>
        </View>
        <List
          data={me?.allergyPreferences}
          renderItem={({ item }: { item: Allergies_allergies_data }) => (
            <ListItem
              title={item.name}
              accessoryRight={(props) => <Icons.Cross {...props} onPress={() => removeAllergy(item)} />}
            />
          )}
        />
      </View>
    </Background>
  )
}
