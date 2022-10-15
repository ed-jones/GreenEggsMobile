/**
 * Author: Edward Jones
 */
import React, { ReactElement, useContext } from 'react'
import { Button } from '@ui-kitten/components'
import { Background, ControlledInput, InputType, Rules, TopNavigation } from '@greeneggs/ui'
import { RecipeStepInput } from '@greeneggs/types/graphql'
import { useForm } from 'react-hook-form'
import { AddRecipeStyles } from '../add-recipe-styles'
import { useNavigation } from '@react-navigation/core'
import { AddRecipeContext } from '@greeneggs/providers'
import { ScrollView } from 'react-native'

/**
 * Screen that lets a user create a new step. Includes an image and a description.
 */
export const CreateStep = (): ReactElement => {
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
              ...Rules.UNDER100CHARS,
              ...Rules.REQUIRED,
            },
          }}
          inputProps={{
            label: 'DESCRIPTION',
            placeholder: 'After washing the carrots, finely dice them...',
            defaultValue: '',
            style: AddRecipeStyles.input,
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
            form.trigger([`description`, `image`]).then((isValid) => {
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
