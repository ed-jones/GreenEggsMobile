/**
 * Author: Dimitri Zvolinski
 */
import React, { ReactElement } from 'react'
import { Card, Text } from '@ui-kitten/components'
import { Image, Dimensions, View } from 'react-native'
import { TopNavigation, Background } from '@greeneggs/ui'
import { RouteProp, useRoute } from '@react-navigation/native'
import { LoggedInRouteParams } from '@greeneggs/navigation/routes/logged-in-routes'

/**
 * Expanded view for recipe steps. Useful when a step has a long description.
 */
export function RecipeDirectionExpanded(): ReactElement {
  const route = useRoute<RouteProp<LoggedInRouteParams, 'RecipeDirectionExpanded'>>()
  if (!route.params) throw new Error('Could not find route params')

  const direction = route.params.direction
  const { width } = Dimensions.get('window')

  return (
    <Background>
      <TopNavigation title={direction.title} />
      <Card
        style={{ marginHorizontal: 16 }}
        footer={() => (
          <View style={{ margin: 16 }}>
            <Text category='h6' style={{ marginBottom: 8 }}>
              {direction.title}
            </Text>
            <Text numberOfLines={2}>{direction.description}</Text>
          </View>
        )}
      >
        {direction.image ? (
          <Image
            style={{
              width,
              aspectRatio: 1 / 1,
              marginHorizontal: -24,
              marginVertical: -16,
            }}
            source={{
              uri: direction.image,
            }}
          />
        ) : undefined}
      </Card>
    </Background>
  )
}
