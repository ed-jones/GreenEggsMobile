/**
 * Author: Dimitri Zvolinski
 */
import { useState } from 'react'
import { Icon, Menu, MenuItem, Popover } from '@ui-kitten/components'
import { View } from 'react-native'
import { useMutation } from '@apollo/client'
import { DeleteRecipe } from '@greeneggs/types/graphql'
import { Mutations, Queries } from '@greeneggs/graphql'
import { useNavigation } from '@react-navigation/core'

interface RecipeMoreButtonProps {
  recipeId: string | null
}

/**
 * More icon that opens a context menu with options for that recipe.
 * Includes delete. In the future could include edit and privacy options.
 */
export function RecipeMoreButton({ recipeId }: RecipeMoreButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const navigation = useNavigation()
  const [deleteRecipe] = useMutation<DeleteRecipe>(Mutations.deleteRecipe, {
    variables: {
      recipeId,
    },
    refetchQueries: [Queries.getMe, 'me'],
  })

  function handleDeleteRecipe() {
    void deleteRecipe()
    navigation.goBack()
  }

  return (
    <Popover
      visible={isVisible}
      anchor={() => (
        <Icon
          name='more-vertical-outline'
          fill='black'
          style={{ width: 24, height: 24 }}
          onPress={() => setIsVisible(true)}
        />
      )}
      onBackdropPress={() => setIsVisible(false)}
    >
      <View style={{ width: 132 }}>
        <Menu>
          <MenuItem title='DELETE RECIPE' onPress={() => handleDeleteRecipe()} />
        </Menu>
      </View>
    </Popover>
  )
}
