/**
 * Author: Edward Jones
 */
import { ReactElement } from 'react'
import { ScrollView } from 'react-native'
import { RecipeInput } from '@greeneggs/types/graphql'
import { RecipeForm } from './add-recipe'
import { ControlledInput, InputType, rules } from '@greeneggs/ui/form'

interface Props {
  form: RecipeForm
}

/**
 * Last screen in the recipe creation process.
 * Lets a user add a cover photo for a recipe and publish.
 */
export function PublishRecipe({ form }: Props): ReactElement {
  return (
    <ScrollView style={{ padding: 16 }}>
      <ControlledInput<RecipeInput>
        controllerProps={{
          name: 'coverImage',
          control: form.control,
          rules: {
            ...rules.REQUIRED,
          },
        }}
        inputProps={{ label: 'COVER IMAGE' }}
        submitError={form.formResult.data?.addRecipe.error}
        type={InputType.PHOTO}
      />
    </ScrollView>
  )
}
