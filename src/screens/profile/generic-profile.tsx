/**
 * Author: Andrew Wilkie
 */
import React, { ReactElement, useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Text, Button, TopNavigation, TopNavigationAction, Avatar } from '@ui-kitten/components'
import { useQuery } from '@apollo/client'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { noAvatar } from '@greeneggs/assets'
import { Queries } from '@greeneggs/graphql'
import { profile, RecipeFilter, recipes, recipesVariables, recipes_recipes_data, Sort } from '@greeneggs/types/graphql'
import { LoadingScreen } from '../../ui/loading-screen'
import { useNavigation } from '@react-navigation/core'
import { LoggedInNavigationProp } from '@greeneggs/navigation/types'
import { LazyList, LazyListProps } from '@greeneggs/ui/lazy-list'
import { RecipeCardSmall } from '@greeneggs/ui/cards'
import { Callout } from '@greeneggs/ui/callout'
import { Background } from '@greeneggs/ui/background'
import { FollowButton } from '@greeneggs/ui/follow-button'
import { Input } from '@greeneggs/ui/input'
import * as Icons from '@greeneggs/ui/icons'

interface IProfileStat {
  label: string
  value: string
  onPress?: () => void
}

function ProfileStat({ label, value, onPress }: IProfileStat) {
  return (
    <Pressable onPress={onPress}>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Text category='label'>{value}</Text>
        <Text category='c1'>{label}</Text>
      </View>
    </Pressable>
  )
}

interface MyRecipesProps
  extends Omit<Partial<LazyListProps<recipes, recipesVariables, recipes_recipes_data>>, 'query'> {
  query: string
  userId: string
}

/**
 * Abstract screen for displaying a user's profile information.
 */
function MyRecipes({ query, userId, ...props }: MyRecipesProps) {
  const navigation = useNavigation<LoggedInNavigationProp>()

  return (
    <LazyList<recipes, recipesVariables, recipes_recipes_data, Sort, RecipeFilter>
      {...props}
      query={Queries.getRecipes}
      variables={{
        query: query,
        sort: Sort.NEW,
        filter: {
          user: userId,
        },
      }}
      dataKey='recipes'
      emptyMessage="This user hasn't uploaded any recipes."
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
  )
}

interface GenericProfileProps {
  userId: string
  isMe?: boolean
}

export function GenericProfile({ userId, isMe = false }: GenericProfileProps): ReactElement {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<LoggedInNavigationProp>()
  const profileResult = useQuery<profile>(Queries.getProfile, {
    variables: {
      userId,
    },
  })

  const [myRecipeQuery, setMyRecipeQuery] = useState('')

  if (profileResult.loading) {
    return <LoadingScreen />
  }

  if (profileResult.error) {
    return <Callout message='There was an error' type='danger' />
  }

  const profile = profileResult.data?.profile.data

  if (profile === undefined || profile === null) {
    return <Text>Error! User not found</Text>
  }

  function optional(value: string | number | null | undefined) {
    return value?.toString() || ''
  }

  return (
    <Background style={{ height: '100%' }}>
      <TopNavigation
        style={{ backgroundColor: 'transparent', paddingTop: insets.top }}
        accessoryLeft={() => {
          return isMe ? (
            <TopNavigationAction icon={Icons.Settings} onPress={() => navigation.navigate('Settings')} />
          ) : (
            <TopNavigationAction icon={Icons.Back} onPress={() => navigation.goBack()} />
          )
        }}
      />
      <MyRecipes
        query={myRecipeQuery}
        userId={profile.id}
        extraData={myRecipeQuery}
        ListHeaderComponent={
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Pressable onPress={() => isMe && navigation.navigate('EditProfilePicture')}>
                <Avatar
                  style={{ margin: 8, width: 120, height: 120 }}
                  shape='round'
                  size='giant'
                  source={profile.avatarURI ? { uri: profile.avatarURI } : noAvatar}
                />
              </Pressable>
            </View>
            <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text category='h5'>{`${profile.firstName} ${profile.lastName}`}</Text>
              {isMe ? (
                <Button size='small' accessoryLeft={Icons.Edit} onPress={() => navigation.navigate('EditProfile')}>
                  EDIT
                </Button>
              ) : (
                <FollowButton isFollowing={profile.isFollowing ?? false} userId={userId} />
              )}
            </View>
            {profile.bio ? (
              <Text style={{ paddingHorizontal: 16, paddingBottom: 16 }} numberOfLines={2}>
                {optional(profile.bio)}
              </Text>
            ) : undefined}
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', padding: 16 }}>
              <ProfileStat
                label='Following'
                value={profile.followingCount.toString()}
                onPress={() => navigation.navigate('Following', { userId })}
              />
              <ProfileStat
                label='Followers'
                value={profile.followerCount.toString()}
                onPress={() => navigation.navigate('Followers', { userId })}
              />
              <ProfileStat label='Recipes' value={profile.recipeCount.toString()} />
              <ProfileStat label='Likes' value={profile.likeCount.toString()} />
            </View>
            <Input
              placeholder='Search recipes'
              size='large'
              style={{ backgroundColor: 'white', margin: 16 }}
              accessoryLeft={Icons.Search}
              value={myRecipeQuery}
              onChangeText={(newText) => setMyRecipeQuery(newText)}
            />
          </>
        }
      />
    </Background>
  )
}
