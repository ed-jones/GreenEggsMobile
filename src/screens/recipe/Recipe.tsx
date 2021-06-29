import React from 'react';
import { useQuery } from '@apollo/client';
import { ImageBackground, SafeAreaView, View, StyleSheet } from 'react-native';
import { LabelledIcon, Queries } from '@greeneggs/core';
import { Card, Spinner, Text } from '@ui-kitten/components';
import { recipe, recipeVariables } from '@greeneggs/types/graphql';
import { convertTimeEstimate } from '@greeneggs/core/convertTimeEstimate/convertTimeEstimate';

const styles = StyleSheet.create({
  coverPhoto: {
    width: '100%',
    height: undefined,
    aspectRatio: 1 / 1,
    resizeMode: 'cover',
  },
  detailsCard: {
    marginTop: -80,
  },
  content: {
    padding: 16
  },
  cardSection: {
    padding: 10,
  }
});

const Recipe = () => {
  const {
    loading, error, data
  } = useQuery<recipe, recipeVariables>(Queries.GET_RECIPE, {
    variables: { recipeId: "399e8870-75b9-4703-a795-f8715c0b2b81"}
  });

  if (loading || !data) return <Spinner />
  if (error) return <Text>{error.message}</Text>

  return (
    <SafeAreaView>
      <ImageBackground
        source={{ uri: data.recipe.previewURI }}
        style={styles.coverPhoto}
      />
      <View style={styles.content}>
        <Card
          style={styles.detailsCard}
          header={() => (
            <View style={styles.cardSection}>
              <Text category="h5">{data.recipe.title}</Text>
              <Text category="s1">A healthy and delicious meal</Text>
              <LabelledIcon label={convertTimeEstimate(data.recipe.timeEstimate)} iconName="clock-outline" />
            </View>
          )}
          footer={() => (
            <View style={styles.cardSection}>
              <Text>{data.recipe.description}</Text>
            </View>
          )}
        >
          <View style={styles.cardSection}>
            <Text>
              {`${data.recipe.submittedBy.firstName} ${data.recipe.submittedBy.lastName}`}
            </Text>
            <LabelledIcon label={String(data?.recipe.likeCount)} iconName="heart-outline" />
            <LabelledIcon label={String(data?.recipe.commentCount)} iconName="message-square-outline" />
          </View>
        </Card>
      </View>
    </SafeAreaView>
  )
}

export default Recipe;