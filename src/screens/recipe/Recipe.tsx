import React from 'react';
import { useQuery } from '@apollo/client';
import { ImageBackground, SafeAreaView, View, StyleSheet } from 'react-native';
import { Icons, LabelledIcon, Queries } from '@greeneggs/core';
import { Avatar, Card, ListElement, ListItem, Spinner, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { recipe, recipeVariables } from '@greeneggs/types/graphql';
import { convertTimeEstimate } from '@greeneggs/core/convertTimeEstimate/convertTimeEstimate';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { noavatar } from '@greeneggs/core';
import ViewMore from '@greeneggs/core/view-more/ViewMore';

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
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  avatar: {
    marginRight: 10,
  },
  tag: {
    borderRadius: 16,
    marginRight: 6,
    marginVertical: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#8F9BB3',
  },
  tags: {
    flexDirection: "row",
    marginVertical: 10
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

  const navigateToDescription = () => {
    navigation.navigate("RecipeDescription", {
      description: data.recipe.description,
      createdAt: data.recipe.createdAt,
      title: data.recipe.title,
      submittedBy: data.recipe.submittedBy
    })
  }

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
            <View style={{...styles.cardSection, ...styles.row}}>
              <View>
                <Text category="h5">{data.recipe.title}</Text>
                <Text category="s1">{data.recipe.subtitle}</Text>
              </View>
              <LabelledIcon label={convertTimeEstimate(data.recipe.timeEstimate)} iconName="clock-outline" />
            </View>
          )}
          footer={() => (
            <View style={styles.cardSection} >
              <Text numberOfLines={2}>{data.recipe.description}</Text>
              <ViewMore onPress={navigateToDescription} />
            </View>
          )}
        >
          <View style={styles.row}>
            <View style={styles.row}>
              <Avatar
                size="small"
                source={data.recipe.submittedBy.avatarURI ? { uri: data.recipe.submittedBy.avatarURI } : noavatar}
                style={styles.avatar}
              />
              <Text>
                {`${data.recipe.submittedBy.firstName} ${data.recipe.submittedBy.lastName}`}
              </Text>
            </View>
            <View style={styles.row}>
              <LabelledIcon label={String(data?.recipe.likeCount)} iconName="heart-outline" />
              <LabelledIcon label={String(data?.recipe.commentCount)} iconName="message-square-outline" />
            </View>
          </View>
        </Card>
        <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 16, paddingRight: 64}}>
          <Icons.Warning fill="#DB4A23" style={{width: 48, height: 48, marginRight: 10}}/>
          <Text>This recipe is unsuitable for those with allergies to Eggs, Milk and Gluten.</Text>
        </View>
        <Text category="h5">
          Categories
        </Text>
        <View style={styles.tags}>
          <Text category="label" appearance="alternative" style={styles.tag}>LUNCH</Text>
          <Text category="label" appearance="alternative" style={styles.tag}>BREAKFAST</Text>
          <Text category="label" appearance="alternative" style={styles.tag}>DINNER</Text>
        </View>
        <Text category="h5">
          Ingredients
        </Text>
        <Text category="h5">
          Directions
        </Text>
        <Text category="h5">
          Top Comments
        </Text>
      </View>
    </View>
  )
}

export default Recipe;