/**
 * Author: Dimitri Zvolinski
 */
import React, { ReactElement } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Text } from '@ui-kitten/components'
import { TopNavigation, Background } from '@greeneggs/ui'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Users_users_data } from '@greeneggs/types/graphql'

const styles = StyleSheet.create({
  cardElement: {
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
})

type RecipeRoute = RouteProp<
  { params: { description: string; createdAt: string; title: string; submittedBy: Users_users_data } },
  'params'
>

/**
 * Screen for displaying a recipe's complete description and recipe upload date.
 */
export const RecipeDescription = (): ReactElement => {
  const route = useRoute<RecipeRoute>()
  const { description, createdAt, title, submittedBy } = route.params

  return (
    <Background>
      <TopNavigation title='Description' />
      <Card
        header={() => (
          <View style={styles.cardElement}>
            <Text category='h6'>{title}</Text>
            <Text category='s1'>{`Created by ${submittedBy.firstName} ${submittedBy.lastName}`}</Text>
          </View>
        )}
        footer={() => <Text style={styles.cardElement}>{new Date(Number(createdAt)).toDateString()}</Text>}
      >
        <Text>{description}</Text>
      </Card>
    </Background>
  )
}
