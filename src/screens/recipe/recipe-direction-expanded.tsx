/**
 * Author: Dimitri Zvolinski
 */
import React, { ReactElement } from 'react'
import { Text } from '@ui-kitten/components'
import { ScrollView, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TopNavigation, Background } from '@greeneggs/ui'
import { RouteProp, useRoute } from '@react-navigation/native'
import { LoggedInRouteParams } from '@greeneggs/navigation/routes/logged-in-routes'

/**
 * Expanded view for recipe steps. Useful when a step has a long description.
 */
export const RecipeDirectionExpanded = (): ReactElement => {
  const route = useRoute<RouteProp<LoggedInRouteParams, 'RecipeDirectionExpanded'>>()
  if (!route.params) throw new Error('Could not find route params')

  const direction = route.params.direction
  const insets = useSafeAreaInsets()

  return (
    <Background>
      <ScrollView style={{ paddingTop: insets.top }}>
        <TopNavigation title={direction.title} />
        {direction.image && (
          <Image
            style={{
              height: undefined,
              width: '100%',
              aspectRatio: 1 / 1,
            }}
            source={{
              uri: direction.image,
            }}
          />
        )}
        <Text style={{ margin: 16 }}>{direction.description}</Text>
      </ScrollView>
    </Background>
  )
}
