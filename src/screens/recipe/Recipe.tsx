import React from 'react';
import { useQuery } from '@apollo/client';
import { ImageBackground, SafeAreaView, View, StyleSheet } from 'react-native';
import { Icons, LabelledIcon, Queries } from '@greeneggs/core';
import { Card, Spinner, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { recipe, recipeVariables } from '@greeneggs/types/graphql';
import { convertTimeEstimate } from '@greeneggs/core/convertTimeEstimate/convertTimeEstimate';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

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

const Recipe = ({ route, navigation }: any) => {
  const { recipeId } = route.params;

  const {
    loading, error, data
  } = useQuery<recipe, recipeVariables>(Queries.GET_RECIPE, {
    variables: { recipeId }
  });

  const navigateBack = () => {
    navigation.goBack();
  };

  const insets = useSafeAreaInsets();

  if (loading || !data) return <Spinner />
  if (error) return <Text>{error.message}</Text>


  return (
    <View>
      <StatusBar style="dark" />
      <ImageBackground
        source={{ uri: data.recipe.previewURI }}
        style={styles.coverPhoto}
      >
        <TopNavigation
          style={{backgroundColor: "transparent", paddingTop: insets.top}}
          accessoryLeft={() => <TopNavigationAction icon={Icons.Back} onPress={navigateBack}/>}
        />
      </ImageBackground>
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
    </View>
  )
}

export default Recipe;