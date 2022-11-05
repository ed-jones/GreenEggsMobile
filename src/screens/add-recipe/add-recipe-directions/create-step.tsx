/**
 * Author: Edward Jones
 */
import React, { ReactElement, useContext } from 'react'
import { Button } from '@ui-kitten/components'
import { RecipeStepInput } from '@greeneggs/types/graphql'
import { useForm } from 'react-hook-form'
import { addRecipeStyles } from '../add-recipe-styles'
import { useNavigation } from '@react-navigation/core'
import { ScrollView } from 'react-native'
import { AddRecipeContext } from '@greeneggs/context'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import { ControlledInput, InputType, rules } from '@greeneggs/ui/form'

/**
 * Screen that lets a user create a new step. Includes an image and a description.
 */
export function CreateStep(): ReactElement {
  const form = useForm<RecipeStepInput>({ mode: 'all' })
  const navigation = useNavigation()
  const { stepsFieldArray } = useContext(AddRecipeContext)

  return (
    <Background>
      <TopNavigation title='Create step' />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <ControlledInput<RecipeStepInput>
          controllerProps={{
            name: `description`,
            control: form.control,
            rules: {
              ...rules.UNDER100CHARS,
              ...rules.REQUIRED,
            },
          }}
          inputProps={{
            label: 'DESCRIPTION',
            placeholder: 'After washing the carrots, finely dice them...',
            defaultValue: '',
            style: addRecipeStyles.input,
            autoFocus: true,
          }}
          type={InputType.TEXTAREA}
        />
        <ControlledInput<RecipeStepInput>
          controllerProps={{
            name: `image`,
            control: form.control,
          }}
          inputProps={{
            label: 'IMAGE (OPTIONAL)',
          }}
          type={InputType.PHOTO}
        />
        <Button
          onPress={() => {
            void form.trigger([`description`, `image`]).then((isValid) => {
              if (isValid) {
                stepsFieldArray?.append(form.getValues())
                navigation.goBack()
              }
            })
          }}
        >
          ADD STEP
        </Button>
      </ScrollView>
    </Background>
  )
}
