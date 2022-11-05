/**
 * Author: Edward Jones
 */
import React, { ReactElement } from 'react'
import { View, Pressable } from 'react-native'
import { Avatar, Text } from '@ui-kitten/components'
import { recipes_recipes_data_submittedBy } from '@greeneggs/types/graphql'
import { noAvatar } from '@greeneggs/assets'
import { useNavigateToProfile } from '@greeneggs/navigation/utils'

export type IRecipeCardHeaderProps = Pick<
  recipes_recipes_data_submittedBy,
  'avatarURI' | 'firstName' | 'lastName' | 'id'
>

/**
 * Header for the recipe card component.
 * Displays user info.
 */
export function RecipeCardHeader({ avatarURI, firstName, lastName, id }: IRecipeCardHeaderProps): ReactElement {
  const navigateToProfile = useNavigateToProfile()
  return (
    <View style={{ flexDirection: 'row', padding: 14, alignItems: 'center', justifyContent: 'space-between' }}>
      <Pressable
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => navigateToProfile(id)}
      >
        <Avatar size='small' source={avatarURI ? { uri: avatarURI } : noAvatar} style={{ marginRight: 10 }} />
        <Text style={{ fontWeight: 'bold' }}>{`${firstName} ${lastName}`}</Text>
      </Pressable>
    </View>
  )
}
