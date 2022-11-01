/**
 * Author: Edward Jones
 */
import React, { ReactElement, useContext } from 'react'
import { Button, Text } from '@ui-kitten/components'
import { Background, ControlledInput, Icons, InputType, rules, TopNavigation } from '@greeneggs/ui'
import { IngredientInput } from '@greeneggs/types/graphql'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { AddRecipeContext } from '@greeneggs/providers'
import { addRecipeStyles } from '../add-recipe-styles'
import { LoggedInNavigationProp, LoggedInRouteParams } from '@greeneggs/navigation/routes/logged-in-routes'

/**
 * Screen for adding details to a selected ingredient, including
 * a description, quantity and unit (for the quantity).
 */
export function AddIngredientDetails(): ReactElement {
  const form = useForm<IngredientInput>({ mode: 'all' })
  const { ingredientsFieldArray } = useContext(AddRecipeContext)
  const navigation = useNavigation<LoggedInNavigationProp>()
  const {
    params: { name },
  } = useRoute<RouteProp<LoggedInRouteParams, 'AddIngredientDetails'>>()

  return (
    <Background>
      <TopNavigation title='Add details' />
      <View style={{ paddingHorizontal: 16 }}>
        <Text category='h5' style={{ paddingBottom: 16 }}>
          {name}
        </Text>
        <ControlledInput<IngredientInput>
          controllerProps={{
            shouldUnregister: true,
            name: `description`,
            control: form.control,
            rules: {
              ...rules.UNDER100CHARS,
            },
          }}
          inputProps={{
            label: 'DESCRIPTION',
            placeholder: 'Finely chopped',
            defaultValue: '',
            style: addRecipeStyles.input,
          }}
          type={InputType.TEXT}
        />
        <View style={{ flexDirection: 'row', paddingBottom: 16 }}>
          <ControlledInput<IngredientInput>
            controllerProps={{
              shouldUnregister: true,
              name: `quantity`,
              control: form.control,
              rules: {
                max: {
                  value: 999,
                  message: 'Must be under 1000',
                },
              },
            }}
            inputProps={{
              label: 'QUANTITY',
              placeholder: '5',
              defaultValue: '',
              style: { width: '25%', ...addRecipeStyles.input },
            }}
            type={InputType.NUMERIC}
          />
          <ControlledInput<IngredientInput>
            controllerProps={{
              shouldUnregister: true,
              name: `unit`,
              control: form.control,
              rules: {
                ...rules.UNDER100CHARS,
              },
            }}
            inputProps={{
              label: 'UNIT',
              placeholder: 'Cups',
              defaultValue: '',
              style: {
                width: '75%',
                marginLeft: 16,
                flex: 1,
                ...addRecipeStyles.input,
              },
            }}
            type={InputType.TEXT}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            status='basic'
            onPress={() => {
              ingredientsFieldArray?.append({ name })
              navigation.goBack()
              navigation.goBack()
            }}
          >
            SKIP ADD DETAILS
          </Button>
          <Button
            accessoryLeft={Icons.Add}
            onPress={() => {
              void form.trigger([`description`, `quantity`, `unit`]).then((isValid) => {
                if (isValid) {
                  ingredientsFieldArray?.append({
                    ...form.getValues(),
                    name,
                  })
                  navigation.goBack()
                  navigation.goBack()
                }
              })
            }}
          >
            ADD DETAILS
          </Button>
        </View>
      </View>
    </Background>
  )
}
