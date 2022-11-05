/**
 * Author: Wambugu Mutahi
 */
import { useState, ReactElement } from 'react';
import { Button, IndexPath, List, ListItem, Spinner, Text, SelectItem, TopNavigation } from '@ui-kitten/components'
import { View } from 'react-native'
import { Mutations, Queries } from '@greeneggs/graphql'
import {} from '@ui-kitten/components'
import { useMutation, useQuery } from '@apollo/client'
import {
  Diets,
  Diets_diets_data,
  Me,
  RemoveDietaryPreferences,
  RemoveDietaryPreferencesVariables,
  UpdateDietaryPreferences,
  UpdateDietaryPreferencesVariables,
} from '@greeneggs/types/graphql'
import { LoadingScreen } from '../../ui/loading-screen'
import { fullUserFragment } from '@greeneggs/graphql/fragments'
import { Background } from '@greeneggs/ui/background'
import { Callout } from '@greeneggs/ui/callout'
import { Select } from '@greeneggs/ui/select'
import * as Icons from '@greeneggs/ui/icons'

function indexToNumber(selectedIndex: IndexPath | IndexPath[]) {
  return Number(selectedIndex.toString()) - 1
}

/**
 * Screen that lets a user edit their dietary preferences.
 * For instance, a user can choose to filter out all non-vegan recipes globally in the app.
 */
export function DietaryPreferences(): ReactElement {
  const getDiet = useQuery<Diets>(Queries.getDiets, {
    variables: {
      query: '',
      offset: 0,
      limit: 100,
    },
  })
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0))
  const getMe = useQuery<Me>(Queries.getMe)

  const [removeDietaryPreferences] = useMutation<RemoveDietaryPreferences, RemoveDietaryPreferencesVariables>(
    Mutations.removeDietaryPreferences
  )
  const [updateDietaryPreferences, updateDietaryPreferencesResult] = useMutation<
    UpdateDietaryPreferences,
    UpdateDietaryPreferencesVariables
  >(Mutations.updateDietaryPreferences)

  if (getDiet.loading || getMe.loading) return <LoadingScreen />
  if (getDiet.error) {
    return <Text>Error!{getDiet.error.message}</Text>
  }
  if (getMe.error) {
    return <Text>Error!{getMe.error.message}</Text>
  }
  const me = getMe.data?.me.data
  const diets = getDiet.data?.diets.data || []
  const unselectedDiets = diets.filter((diet) => !me?.dietaryPreferences.includes(diet))

  function handleSubmit() {
    if (me?.dietaryPreferences) {
      void updateDietaryPreferences({
        variables: {
          dietaryPreferences: {
            diets: [
              ...me.dietaryPreferences.map((selectedDiet) => selectedDiet.id),
              unselectedDiets[indexToNumber(selectedIndex)].id,
            ],
          },
        },
        update(cache) {
          cache.writeFragment({
            id: `FullUser:${me.id}`,
            data: {
              ...me,
              dietaryPreferences: [
                ...new Set([...me.dietaryPreferences, unselectedDiets[indexToNumber(selectedIndex)]]),
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

  function removeDiet(diet: Diets_diets_data) {
    if (me?.dietaryPreferences) {
      void removeDietaryPreferences({
        variables: {
          dietaryPreferences: {
            diets: [diet.id],
          },
        },
        update(cache) {
          cache.writeFragment({
            id: `FullUser:${me.id}`,
            data: {
              ...me,
              dietaryPreferences: me.dietaryPreferences.filter((allDiets) => allDiets.id !== diet.id),
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
      <TopNavigation title='Dietary Preferences' />
      <View>
        <View style={{ padding: 16 }}>
          <Callout
            message='Here you can tell us your dietary preferences so that we can better show you recipes relevant to you.'
            type='info'
          />
          <View style={{ flexDirection: 'row' }}>
            <Select
              style={{ flex: 1, marginHorizontal: 8 }}
              onSelect={(index) => setSelectedIndex(index)}
              selectedIndex={selectedIndex}
              disabled={unselectedDiets.length === 0}
              value={unselectedDiets[indexToNumber(selectedIndex)]?.name || 'NO DIETS FOUND'}
            >
              {unselectedDiets.map((diet) => (
                <SelectItem key={diet.id} title={diet.name} />
              ))}
            </Select>
            <Button
              size='small'
              onPress={handleSubmit}
              disabled={unselectedDiets.length === 0}
              accessoryLeft={
                updateDietaryPreferencesResult.loading ? () => <Spinner size='small' status='control' /> : Icons.Add
              }
            >
              Add
            </Button>
          </View>
        </View>
        <List
          data={me?.dietaryPreferences}
          renderItem={({ item }: { item: Diets_diets_data }) => (
            <ListItem
              title={item.name}
              accessoryRight={(props) => <Icons.Cross {...props} onPress={() => removeDiet(item)} />}
            />
          )}
        />
      </View>
    </Background>
  )
}
