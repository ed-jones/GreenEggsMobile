/**
 * Author: Edward Jones
 */
import React from 'react'
import { Queries } from '@greeneggs/graphql'
import {
  RecipeFilter,
  Sort,
  CategoriesWithImages,
  CategoriesWithImagesVariables,
  CategoriesWithImages_categoriesWithImages_data,
} from '@greeneggs/types/graphql'
import { Button, Text } from '@ui-kitten/components'
import { ImageBackground, Pressable, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/core'
import { LoggedInNavigationProp } from '@greeneggs/navigation/types'
import { Background } from '@greeneggs/ui/background'
import { LazyList } from '@greeneggs/ui/lazy-list'

interface CategoryWithImageProps {
  name: string
  coverImage: string
  onPress: () => void
}

const styles = StyleSheet.create({
  categoryCard: {
    width: '100%',
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
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
 * Displays an infinite scrolling list of categories that are important enough to have an associated image.
 */
function CategoryWithImage({ name, coverImage, onPress }: CategoryWithImageProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 8,
        marginTop: 16,
        flexGrow: 1,
        width: '50%',
      }}
    >
      <ImageBackground source={{ uri: coverImage }} style={styles.categoryCard}>
        <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.8)']} style={styles.gradient} />
        <Text category='h5' style={{ color: 'white' }}>
          {name.toUpperCase()}
        </Text>
      </ImageBackground>
    </Pressable>
  )
}

export function Categories() {
  const navigation = useNavigation<LoggedInNavigationProp>()

  return (
    <Background>
      <LazyList<
        CategoriesWithImages,
        CategoriesWithImagesVariables,
        CategoriesWithImages_categoriesWithImages_data,
        Sort,
        RecipeFilter
      >
        limit={20}
        ListFooterComponent={
          <Button style={{ margin: 24, alignItems: 'flex-start' }} onPress={() => navigation.navigate('AllCategories')}>
            VIEW ALL
          </Button>
        }
        query={Queries.getCategoriesWithImages}
        variables={{
          query: '',
        }}
        dataKey='categoriesWithImages'
        emptyMessage='No categories found.'
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item: category }) => (
          <CategoryWithImage
            onPress={() =>
              navigation.navigate('Category', {
                categoryId: category.id,
                categoryName: category.name,
              })
            }
            name={category.name}
            coverImage={category.coverImage ?? ''}
            key={category.id}
          />
        )}
      />
    </Background>
  )
}
