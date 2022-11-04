/**
 * Author: Dimitri Zvolinski
 */
import React, { useContext, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ImageBackground, View, StyleSheet } from 'react-native'
import { Queries } from '@greeneggs/graphql'
import { Button, IndexPath, SelectItem, Text } from '@ui-kitten/components'
import { recipe, recipeVariables } from '@greeneggs/types/graphql'
import ParallaxHeader from '@fabfit/react-native-parallax-header'
import { LinearGradient } from 'expo-linear-gradient'
import { RecipeDetailsCard } from './recipe-details-card'
import { RecipeAllergies } from './recipe-allergies'
import { RecipeIngredients } from './recipe-ingredients'
import { RecipeDirections } from './recipe-directions'
import { RecipeCommentList } from './recipe-comment-list'
import { LoadingScreen } from '../loading-screen'
import { RecipeAddComment } from './recipe-add-comment'
import { TopNavigation, Background, SaveRecipeButton, EmptyState, Select } from '@greeneggs/ui'
import { RecipeMoreButton } from './recipe-more-button'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { LoggedInNavigationProp, LoggedInRouteParams } from '@greeneggs/navigation/routes/logged-in-routes'
import { UserContext } from '@greeneggs/providers/user-state-provider'

const styles = StyleSheet.create({
  coverPhoto: {
    width: '100%',
    height: undefined,
    aspectRatio: 1 / 1,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  cardSection: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  heading: {
    marginVertical: 24,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
})

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
  const { loading, error, data } = useQuery<recipe, recipeVariables>(Queries.getRecipe, {
    variables: { recipeId },
    onCompleted: (data) => setSelectedIndex(new IndexPath((data.recipe.data?.servingCount ?? 0) - 1)),
  })

  if (loading || !data || !data.recipe.data) return <LoadingScreen />
  if (error || data.recipe.error) return <Text>{error?.message || data.recipe.error?.message}</Text>

  const { data: recipe } = data.recipe

  return (
    <ParallaxHeader
      maxHeight={300}
      minHeight={64}
      renderOverlay={() => (
        <TopNavigation
          style={{ height: 64, alignItems: 'flex-start' }}
          accessoryRight={() => (
            <>
              <SaveRecipeButton recipeId={recipeId} saved={recipe.saved} />
              {me?.id === recipe.submittedBy.id ? <RecipeMoreButton recipeId={recipeId} /> : undefined}
            </>
          )}
        />
      )}
      renderHeader={() => (
        <ImageBackground source={{ uri: recipe.coverImage }} style={styles.coverPhoto}>
          <LinearGradient colors={['rgba(247, 249, 252,0.4)', 'rgba(247, 249, 252,0)']} style={styles.gradient} />
        </ImageBackground>
      )}
    >
      <Background style={styles.content}>
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
          <Text category='h5' style={styles.heading}>
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
        <Text category='h5' style={styles.heading}>
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
          <Text category='h5' style={styles.heading}>
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
      </Background>
    </ParallaxHeader>
  )
}
