/**
 * Author: Edward Jones
 */
import { ReactElement, useContext } from 'react'
import { View, Alert } from 'react-native'
import { Button, Divider, Layout, Spinner, useTheme } from '@ui-kitten/components'
import { addRecipe, addRecipeVariables, RecipeInput } from '@greeneggs/types/graphql'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { UseFormReturn } from '@greeneggs/ui/form'
import * as Icons from '@greeneggs/ui/icons'
import { Stepper } from './stepper'
import { addRecipeStyles } from './add-recipe-styles'
import { LoadingScreen } from '../../ui/loading-screen'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AddRecipeContext } from '@greeneggs/context'
import { Background } from '@greeneggs/ui/background'

export type RecipeForm = UseFormReturn<RecipeInput, addRecipe, addRecipeVariables>

/**
 * Screen that enables the creation of recipes.
 * Contains the multi-step form.
 */
export function AddRecipe(): ReactElement {
  const navigation: StackNavigationProp<Record<string, Record<string, unknown>>, string> = useNavigation()
  const { form, steps } = useContext(AddRecipeContext)
  const theme = useTheme()

  if (form === undefined || steps === undefined) {
    return <LoadingScreen />
  }

  const insets = useSafeAreaInsets()

  const onSubmit = async () => {
    const { data } = await form.submitForm()
    if (!data?.addRecipe.error) {
      form.reset()
      steps.reset()
      navigation.push('Recipe', { recipeId: data?.addRecipe.data?.id })
    }
  }

  function publish() {
    Alert.alert(
      'Publish recipe',
      'Are you sure you want to publish this recipe?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => void onSubmit() },
      ],
      { cancelable: false }
    )
  }

  return (
    <Background>
      <Layout level='1' style={{ ...addRecipeStyles.view, marginTop: insets.top }}>
        <Stepper
          index={steps.index}
          length={steps.length}
          currentStep={steps.currentStep.title}
          nextStep={steps.nextStep?.title}
        />
      </Layout>
      <Divider />
      {steps.currentStep.component}
      <Divider />
      <Layout level='1' style={addRecipeStyles.view}>
        <View style={addRecipeStyles.buttonGroup}>
          {steps.isEnd ? (
            <Button
              size='small'
              onPress={() => {
                void form.trigger().then((isValid) => {
                  if (isValid) {
                    publish()
                  }
                })
              }}
              status='success'
              accessoryRight={form.formResult.loading ? () => <Spinner size='small' status='control' /> : Icons.Publish}
            >
              PUBLISH
            </Button>
          ) : (
            <Button
              size='small'
              onPress={() => {
                void form.trigger().then((isValid) => {
                  if (isValid) steps.next()
                })
              }}
              accessoryRight={Icons.Forward}
            >
              NEXT
            </Button>
          )}
          {steps.isStart ? null : (
            <Button
              size='small'
              onPress={steps.previous}
              accessoryLeft={(props) => <Icons.Back {...props} fill={theme['color-primary-500']} />}
              status='basic'
            >
              PREVIOUS
            </Button>
          )}
        </View>
      </Layout>
    </Background>
  )
}
