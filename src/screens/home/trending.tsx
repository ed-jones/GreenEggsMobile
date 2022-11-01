/**
 * Author: Edward Jones
 */
import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  RecipeFilter,
  Sort,
  Trending as TrendingType,
  TrendingVariables,
  Trending_trending_data,
} from '@greeneggs/types/graphql'
import { Queries } from '@greeneggs/graphql'
import { useNavigation } from '@react-navigation/core'
import { Background, LazyList, RecipeCard } from '@greeneggs/ui'
import { LoggedInNavigationProp } from '@greeneggs/navigation/routes/logged-in-routes'

const cardVerticalMargin = 20
const cardHorizontalMargin = 24

const styles = StyleSheet.create({
  firstCard: {
    marginTop: cardVerticalMargin,
  },
  card: {
    marginBottom: cardVerticalMargin,
    marginHorizontal: cardHorizontalMargin,
  },
})

/**
 * Screen that shows a list of the most popular new recipes within the app.
 */
export function Trending(): ReactElement {
  const navigation = useNavigation<LoggedInNavigationProp>()
  return (
    <Background>
      <LazyList<TrendingType, TrendingVariables, Trending_trending_data, Sort, RecipeFilter>
        limit={4}
        query={Queries.getTrending}
        variables={{}}
        dataKey='trending'
        emptyMessage='There are no trending recipes! This means nobody has uploaded a recipe for a while.'
        renderItem={({ item: recipe, index }) => (
          <View key={recipe?.id} style={index === 0 ? { ...styles.firstCard, ...styles.card } : styles.card}>
            <RecipeCard recipe={recipe} onPress={() => navigation.navigate('Recipe', { recipeId: recipe?.id })} />
          </View>
        )}
      />
    </Background>
  )
}
