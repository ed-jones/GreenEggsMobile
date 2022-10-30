/**
 * Author: Edward Jones
 */
import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  NewsFeed as NewsFeedType,
  NewsFeedVariables,
  NewsFeed_newsFeed_data,
  RecipeFilter,
  Sort,
} from '@greeneggs/types/graphql'
import { Queries } from '@greeneggs/graphql'
import { Background, LazyList, RecipeCard } from '@greeneggs/ui'
import { useNavigation } from '@react-navigation/native'
import { LoggedInNavigationProp } from '@greeneggs/navigation/routes/logged-in-routes'

const CardVerticalMargin = 20
const CardHorizontalMargin = 24

const styles = StyleSheet.create({
  firstCard: {
    marginTop: CardVerticalMargin,
  },
  card: {
    marginBottom: CardVerticalMargin,
    marginHorizontal: CardHorizontalMargin,
  },
})

/**
 * Screen that shows an infinite scrolling list of recipes from users that the logged in user follows.
 */
export function NewsFeed(): ReactElement {
  const navigation = useNavigation<LoggedInNavigationProp>()
  return (
    <Background>
      <LazyList<NewsFeedType, NewsFeedVariables, NewsFeed_newsFeed_data, Sort, RecipeFilter>
        limit={4}
        query={Queries.NEWS_FEED}
        variables={{}}
        dataKey='newsFeed'
        emptyMessage='Try following some users to see their latest recipes.'
        renderItem={({ item: recipe, index }) => (
          <View key={recipe?.id} style={index === 0 ? { ...styles.firstCard, ...styles.card } : styles.card}>
            <RecipeCard recipe={recipe} onPress={() => navigation.navigate('Recipe', { recipeId: recipe?.id })} />
          </View>
        )}
      />
    </Background>
  )
}
