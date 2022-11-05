/**
 * Author: Edward Jones
 */
import { ReactElement } from 'react';

import * as React from 'react';

import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { FieldArrayMethodProps } from 'react-hook-form'
import { Alert, BackHandler, ScrollView } from 'react-native'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'

type AppendType = (value: Partial<unknown> | Partial<unknown>[], options?: FieldArrayMethodProps | undefined) => void

export interface RecipeFormPart {
  append: AppendType
}

interface ICreateRecipePartTemplate {
  title: string
  formComponent: (props: RecipeFormPart) => React.ReactElement
}

/**
 * Template for screens that allow for the creation of array elements in a recipe, i.e. single ingredients, categories, allergies, diets.
 */
export function CreateRecipePartTemplate({ title, formComponent }: ICreateRecipePartTemplate): ReactElement {
  const navigation = useNavigation()
  const route = useRoute()
  const { append } = route.params as {
    append: AppendType
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        void goBack()
        return true
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [])
  )

  async function goBackAlert(): Promise<boolean> {
    return new Promise<boolean>(function (resolve) {
      Alert.alert(
        'Exit without saving?',
        'If you go back now you will lose your changes',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => resolve(false),
          },
          { text: 'OK', onPress: () => resolve(true) },
        ],
        { cancelable: false }
      )
    })
  }

  async function goBack() {
    if (await goBackAlert()) {
      navigation.goBack()
    }
  }
  return (
    <Background>
      <TopNavigation title={title} />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {React.createElement(formComponent, {
          navigation,
          append,
        })}
      </ScrollView>
    </Background>
  )
}
