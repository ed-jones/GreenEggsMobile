/**
 * Author: Edward Jones
 */
import { ReactElement } from 'react';
import { Text } from '@ui-kitten/components'
import { ScrollView } from 'react-native'
import { RecipeInput } from '@greeneggs/types/graphql'
import { RecipeForm } from './add-recipe'
import { addRecipeStyles } from './add-recipe-styles'
import { ControlledInput, InputType, rules } from '@greeneggs/ui/form'

interface ICreateRecipeDetails {
  form: RecipeForm
}

/**
 * Screen for adding all recipe details, including name, description, serving count
 * and time estimate.
 */
export function AddRecipeDetails({ form }: ICreateRecipeDetails): ReactElement {
  return (
    <ScrollView style={{ paddingHorizontal: 16 }}>
      <Text category='h5' style={addRecipeStyles.heading}>
        New Recipe
      </Text>
      <ControlledInput<RecipeInput>
        controllerProps={{
          name: 'title',
          control: form.control,
          rules: {
            ...rules.REQUIRED,
          },
        }}
        inputProps={{
          label: 'TITLE',
          placeholder: 'Name of your recipe',
          defaultValue: '',
          style: addRecipeStyles.input,
        }}
        submitError={form.formResult.data?.addRecipe.error}
        type={InputType.TEXT}
      />
      <ControlledInput<RecipeInput>
        controllerProps={{
          name: 'description',
          control: form.control,
        }}
        inputProps={{
          label: 'DESCRIPTION (OPTIONAL)',
          placeholder: 'Tell us a little about yourself and your recipe',
          defaultValue: '',
          style: addRecipeStyles.input,
        }}
        submitError={form.formResult.data?.addRecipe.error}
        type={InputType.TEXTAREA}
      />
      <ControlledInput<RecipeInput>
        controllerProps={{
          name: 'servingCount',
          control: form.control,
          rules: {
            max: {
              value: 99,
              message: 'Serving count must be below 100 ',
            },
          },
        }}
        inputProps={{
          label: 'SERVES (OPTIONAL)',
          placeholder: 'How many people does your recipe serve?',
          defaultValue: '',
          style: addRecipeStyles.input,
        }}
        submitError={form.formResult.data?.addRecipe.error}
        type={InputType.NUMERIC}
      />
      <ControlledInput<RecipeInput>
        controllerProps={{
          name: 'timeEstimate',
          control: form.control,
        }}
        inputProps={{
          label: 'TIME ESTIMATE (OPTIONAL)',
          placeholder: '5 hours',
          defaultValue: '',
          style: addRecipeStyles.input,
          caption: 'How long does it take to make this recipe?',
        }}
        submitError={form.formResult.data?.addRecipe.error}
        type={InputType.TIME}
      />
    </ScrollView>
  )
}
