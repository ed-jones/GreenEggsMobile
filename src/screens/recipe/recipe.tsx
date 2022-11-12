/**
 * Author: Dimitri Zvolinski
 */
import { useContext, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ScrollView, View } from 'react-native'
import { Queries } from '@greeneggs/graphql'
import { Button, IndexPath, SelectItem, Text } from '@ui-kitten/components'
import { recipe, recipeVariables } from '@greeneggs/types/graphql'
import { RecipeDetailsCard } from './recipe-details-card'
import { RecipeAllergies } from './recipe-allergies'
import { RecipeIngredients } from './recipe-ingredients'
import { RecipeDirections } from './recipe-directions'
import { RecipeCommentList } from './recipe-comment-list'
import { LoadingScreen } from '../../ui/loading-screen'
import { RecipeAddComment } from './recipe-add-comment'
import { RecipeMoreButton } from './recipe-more-button'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { LoggedInRouteParams, LoggedInNavigationProp } from '@greeneggs/navigation/types'
import { UserContext } from '@greeneggs/context'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import { SaveRecipeButton } from '@greeneggs/ui/save-recipe-button'
import { Background } from '@greeneggs/ui/background'
import { Select } from '@greeneggs/ui/select'
import { EmptyState } from '@greeneggs/ui/empty-state'

/**
 * Screen to display a recipe, its steps and associated comments.
 */
export function Recipe() {
  const route = useRoute<RouteProp<LoggedInRouteParams, 'Recipe'>>()
  const navigation = useNavigation<LoggedInNavigationProp>()
  if (!route.params) throw new Error('Could not find route params')
  const { recipeId } = route.params
  if (!recipeId) throw new Error('Recipe ID not found')
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0))
  const { me } = useContext(UserContext)
  const {
    loading: isLoading,
    error,
    data,
  } = useQuery<recipe, recipeVariables>(Queries.getRecipe, {
    variables: { recipeId },
    onCompleted: (data) => setSelectedIndex(new IndexPath((data.recipe.data?.servingCount ?? 0) - 1)),
  })

  if (isLoading || !data || !data.recipe.data) return <LoadingScreen />
  if (error || data.recipe.error) return <Text>{error?.message || data.recipe.error?.message}</Text>

  const { data: recipe } = data.recipe

  return (
    <Background style={{ paddingBottom: 24 }}>
      <TopNavigation
        accessoryRight={() => (
          <>
            <SaveRecipeButton recipeId={recipeId} saved={recipe.saved} />
            {me?.id === recipe.submittedBy.id ? <RecipeMoreButton recipeId={recipeId} /> : undefined}
          </>
        )}
      />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <RecipeDetailsCard {...recipe} />
        <View style={{ marginVertical: 16 }}>
          <RecipeAllergies allergies={recipe.allergies} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text category='h5' style={{ marginVertical: 24 }}>
            Ingredients
          </Text>
          {recipe.servingCount ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text category='label' style={{ marginRight: 16 }}>
                SERVES
              </Text>
              <Select
                selectedIndex={selectedIndex}
                onSelect={(args) => {
                  setSelectedIndex(args)
                }}
                value={() => <Text>{selectedIndex.toString()}</Text>}
              >
                {[...Array(Math.max(recipe.servingCount, 10)).keys()].map((number) => (
                  <SelectItem title={number + 1} key={number} />
                ))}
              </Select>
            </View>
          ) : undefined}
        </View>
        {recipe.ingredients.length > 0 ? (
          <RecipeIngredients
            ingredients={recipe.ingredients}
            servingCount={Number(selectedIndex) + 1}
            defaultServingCount={recipe.servingCount}
          />
        ) : (
          <View style={{ paddingVertical: 16 }}>
            <EmptyState description='This recipe has no ingredients.' />
          </View>
        )}
        <Text category='h5' style={{ marginVertical: 24 }}>
          Steps
        </Text>
        {recipe.steps.length > 0 ? (
          <RecipeDirections directions={recipe.steps} />
        ) : (
          <View style={{ paddingVertical: 16 }}>
            <EmptyState description='This recipe has no steps.' />
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text category='h5' style={{ marginVertical: 24 }}>
            {`Comments`}
          </Text>
          <Button
            size='small'
            status='basic'
            appearance='ghost'
            onPress={() =>
              navigation.navigate('RecipeAllComments', {
                comments: recipe.comments,
                commentCount: recipe.commentCount,
                recipeId: recipe.id,
                isReply: false,
              })
            }
          >
            {`VIEW ALL (${recipe.commentCount.toString()})`}
          </Button>
        </View>
        <RecipeCommentList comments={recipe.comments.slice(0, 3)} />
        <View style={{ marginTop: 24 }}>
          <RecipeAddComment recipeId={recipe.id} />
        </View>
      </ScrollView>
    </Background>
  )
}
