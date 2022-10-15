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
 * Screen that shows a list of the most popular new recipes within the app.
 */
export function Trending(): ReactElement {
  const navigation = useNavigation()
  return (
    <Background>
      <LazyList<TrendingType, TrendingVariables, Trending_trending_data, Sort, RecipeFilter>
        limit={4}
        query={Queries.TRENDING}
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
