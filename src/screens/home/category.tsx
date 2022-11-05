/**
 * Author: Edward Jones
 */
import { useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { Queries } from '@greeneggs/graphql'
import { recipes, recipesVariables, recipes_recipes_data, Sort, RecipeFilter } from '@greeneggs/types/graphql'
import { View } from 'react-native'
import { LoggedInRouteParams, LoggedInNavigationProp } from '@greeneggs/navigation/types'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import { Input } from '@greeneggs/ui/input'
import * as Icons from '@greeneggs/ui/icons'
import { LazyList } from '@greeneggs/ui/lazy-list'
import { RecipeCardSmall } from '@greeneggs/ui/cards'

/**
 * Screen that shows an infinite scrolling list of recipes for a given category.
 */
export function Category() {
  const {
    params: { categoryId, categoryName },
  } = useRoute<RouteProp<LoggedInRouteParams, 'Category'>>()
  const navigation = useNavigation<LoggedInNavigationProp>()
  const [query, setQuery] = useState('')

  return (
    <Background>
      <TopNavigation title={categoryName} />
      <Input
        placeholder='Search recipes...'
        size='large'
        accessoryLeft={Icons.Search}
        value={query}
        onChangeText={setQuery}
        style={{ padding: 16 }}
      />
      <LazyList<recipes, recipesVariables, recipes_recipes_data, Sort, RecipeFilter>
        limit={15}
        query={Queries.getRecipes}
        variables={{
          query,
          sort: Sort.RELEVANT,
          filter: {
            categories: [categoryId],
          },
        }}
        dataKey='recipes'
        emptyMessage='No recipes found!'
        renderItem={({ item: myRecipe }) => (
          <View style={{ marginBottom: 16, marginHorizontal: 16 }}>
            <RecipeCardSmall
              recipe={myRecipe}
              onPress={() =>
                navigation.navigate('Recipe', {
                  recipeId: myRecipe.id,
                })
              }
            />
          </View>
        )}
      />
    </Background>
  )
}
