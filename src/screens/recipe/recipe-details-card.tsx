/**
 * Author: Dimitri Zvolinski
 */
import { ReactElement } from 'react';
import { noAvatar } from '@greeneggs/assets'
import { convertTimeEstimate } from '@greeneggs/utils'
import { View, Pressable } from 'react-native'
import { recipe_recipe_data } from '@greeneggs/types/graphql'
import { Text, Card, Avatar } from '@ui-kitten/components'
import { RecipeCategoriesTags } from './recipe-categories-tags'
import { useNavigation } from '@react-navigation/native'
import { LoggedInNavigationProp } from '@greeneggs/navigation/types'
import { useNavigateToProfile } from '@greeneggs/navigation/utils'
import { LabelledIcon } from '@greeneggs/ui/labelled-icon'
import { ViewMore } from '@greeneggs/ui/list-items'
import { RecipeLikeCounter } from '@greeneggs/ui/counters/recipe-like-counter'
import { CommentCounter } from '@greeneggs/ui/counters/comment-counter'

/**
 * Card for displaying simple recipe details, such as title, abbreviated description and stats.
 */
export function RecipeDetailsCard({
  title,
  timeEstimate,
  description,
  createdAt,
  submittedBy,
  likeCount,
  commentCount,
  categories,
  id,
  liked,
  comments,
}: recipe_recipe_data): ReactElement {
  const navigation = useNavigation<LoggedInNavigationProp>()
  const navigateToDescription = () => {
    navigation.navigate('RecipeDescription', {
      description: description ?? '',
      createdAt: createdAt,
      title: title,
      submittedBy: submittedBy,
    })
  }
  const navigateToProfile = useNavigateToProfile()
  return (
    <Card
      header={() => (
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text category='h5' style={{ flexShrink: 1 }}>
              {title}
            </Text>
            {timeEstimate ? (
              <LabelledIcon
                label={`${convertTimeEstimate(timeEstimate).toUpperCase()} PREP`}
                iconName='clock-outline'
              />
            ) : undefined}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <RecipeCategoriesTags categories={categories} />
          </View>
        </View>
      )}
      footer={() => (
        <View style={{ padding: 16 }}>
          {description ? <Text numberOfLines={2}>{description}</Text> : undefined}
          <ViewMore style={{ paddingHorizontal: 0, marginTop: 8 }} onPress={navigateToDescription} />
        </View>
      )}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Pressable onPress={() => navigateToProfile(submittedBy.id)}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Avatar
              size='small'
              source={submittedBy.avatarURI ? { uri: submittedBy.avatarURI } : noAvatar}
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontWeight: 'bold' }}>{`${submittedBy.firstName} ${submittedBy.lastName}`}</Text>
          </View>
        </Pressable>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <RecipeLikeCounter likeCount={likeCount} liked={liked} recipeId={id} submittedById={submittedBy.id} />
          <CommentCounter commentCount={commentCount} comments={comments} />
        </View>
      </View>
    </Card>
  )
}
