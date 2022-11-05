import { View } from 'react-native'
import { Card, Text, TopNavigation } from '@ui-kitten/components'
import { RouteProp, useRoute } from '@react-navigation/native'
import { LoggedInRouteParams } from '@greeneggs/navigation/types'
import { Background } from '@greeneggs/ui/background'

/**
 * Screen for displaying a recipe's complete description and recipe upload date.
 */
export function RecipeDescription() {
  const route = useRoute<RouteProp<LoggedInRouteParams, 'RecipeDescription'>>()
  const { description, createdAt, title, submittedBy } = route.params

  return (
    <Background>
      <TopNavigation title='Description' />
      <Card
        header={() => (
          <View style={{ paddingHorizontal: 28, paddingVertical: 16 }}>
            <Text category='h6'>{title}</Text>
            <Text category='s1'>{`Created by ${submittedBy.firstName} ${submittedBy.lastName}`}</Text>
          </View>
        )}
        footer={() => (
          <Text style={{ paddingHorizontal: 28, paddingVertical: 16 }}>
            {new Date(Number(createdAt)).toDateString()}
          </Text>
        )}
      >
        <Text>{description}</Text>
      </Card>
    </Background>
  )
}
