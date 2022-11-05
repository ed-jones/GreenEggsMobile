/**
 * Author: Edward Jones
 */
import React, { ReactElement } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Avatar, Text } from '@ui-kitten/components'
import { recipes_recipes_data_submittedBy } from '@greeneggs/types/graphql'
import { noAvatar } from '@greeneggs/assets'
import { useNavigateToProfile } from '@greeneggs/navigation/utils'

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    padding: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftElements: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightElements: {
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  ellipsisIcon: {
    width: 24,
    height: 24,
  },
})

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
    <View style={styles.view}>
      <Pressable style={styles.leftElements} onPress={() => navigateToProfile(id)}>
        <Avatar size='small' source={avatarURI ? { uri: avatarURI } : noAvatar} style={styles.avatar} />
        <Text style={styles.username}>{`${firstName} ${lastName}`}</Text>
      </Pressable>
    </View>
  )
}
