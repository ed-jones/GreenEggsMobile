/**
 * Author: Dimitri Zvolinski
 */
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Text } from '@ui-kitten/components'
import { TopNavigation, Background } from '@greeneggs/ui'

const styles = StyleSheet.create({
  cardElement: {
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
})

/**
 * Screen for displaying a recipe's complete description and recipe upload date.
 */
export const RecipeDescription = ({ route }: any) => {
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
        footer={() => (
          <Text style={styles.cardElement}>{new Date(Number(createdAt)).toDateString()}</Text>
        )}
      >
        <Text>{description}</Text>
      </Card>
    </Background>
  )
}
