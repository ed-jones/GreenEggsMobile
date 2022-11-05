/**
 * Author: Dimitri Zvolinski
 */
import { ReactElement } from 'react';
import { recipe_recipe_data_allergies } from '@greeneggs/types/graphql'
import { Text } from '@ui-kitten/components'
import { Callout } from '@greeneggs/ui/callout'

interface IRecipeAllergies {
  allergies: recipe_recipe_data_allergies[]
}

function stringifyAllergies(allergies: recipe_recipe_data_allergies[]) {
  let allergyString = ''
  allergies.forEach((allergy, index) => {
    if (index === 0) {
      allergyString = allergy.name.toLowerCase()
    } else if (index < allergies.length - 1) {
      allergyString = `${allergyString}, ${allergy.name.toLowerCase()}`
    } else {
      allergyString = `${allergyString} and ${allergy.name.toLowerCase()}.`
    }
  })
  return allergyString
}

/**
 * Screen that displays a callout if a recipe might trigger certain allergies.
 */
export function RecipeAllergies({ allergies }: IRecipeAllergies): ReactElement {
  if (allergies.length > 0)
    return (
      <Callout
        type='danger'
        message={
          <Text>
            This recipe is unsuitable for those with allergies to{' '}
            <Text style={{ fontWeight: 'bold' }}>{stringifyAllergies(allergies)}</Text>
          </Text>
        }
      />
    )
  return <></>
}
