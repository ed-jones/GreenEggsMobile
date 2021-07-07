import React from "react";
import { useQuery } from "@apollo/client";
import {
  ImageBackground,
  Image,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Icons, LabelledIcon, Queries, toTitleCase } from "@greeneggs/core";
import {
  Card,
  ListItem,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
  Divider,
  List,
} from "@ui-kitten/components";
import {
  recipe,
  recipeVariables,
  recipe_recipe_data_ingredients,
} from "@greeneggs/types/graphql";
import Alert from "@greeneggs/core/alert/Alert";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ViewMore from "@greeneggs/core/view-more/ViewMore";
import ParallaxHeader from "@fabfit/react-native-parallax-header";
import { LinearGradient } from "expo-linear-gradient";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import RecipeDetailsCard from "./RecipeDetailsCard";
import Tags, { Tag } from "../../core/tags/Tags";
import IngredientListItem from "@greeneggs/core/ingredient-list-item/IngredientListItem";

const styles = StyleSheet.create({
  coverPhoto: {
    width: "100%",
    height: undefined,
    aspectRatio: 1 / 1,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
  cardSection: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    marginRight: 10,
  },
  heading: {
    marginVertical: 16,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});

const Recipe = ({ route, navigation }: any) => {
  const { recipeId } = route.params;

  const { loading, error, data } = useQuery<recipe, recipeVariables>(
    Queries.GET_RECIPE,
    {
      variables: { recipeId },
    }
  );

  const navigateBack = () => {
    navigation.goBack();
  };
  const insets = useSafeAreaInsets();

  if (loading || !data || !data.recipe.data) return <Spinner />;
  if (error || data.recipe.error)
    return <Text>{error?.message || data.recipe.error?.message}</Text>;

  const { data: recipe } = data.recipe;

  return (
    <ParallaxHeader
      maxHeight={300}
      minHeight={64}
      renderOverlay={() => (
        <TopNavigation
          style={{
            backgroundColor: "transparent",
            paddingTop: insets.top,
            alignItems: "flex-start",
          }}
          accessoryLeft={() => (
            <TopNavigationAction icon={Icons.Back} onPress={navigateBack} />
          )}
        />
      )}
      renderHeader={() => (
        <ImageBackground
          source={{ uri: recipe.coverImage }}
          style={styles.coverPhoto}
        >
          <LinearGradient
            colors={["rgba(247, 249, 252,0.4)", "rgba(247, 249, 252,0)"]}
            style={styles.gradient}
          />
        </ImageBackground>
      )}
    >
      <StatusBar style="dark" />
      <ScrollView>
        <View style={styles.content}>
          <RecipeDetailsCard {...recipe} navigation={navigation} />
          {recipe.allergies.length! > 0 ? (
            <Alert
              type="danger"
              message={`This recipe is unsuitable for those with allergies to ${recipe.allergies.map(
                (allergy) => allergy.name.toLowerCase()
              )}.`}
            />
          ) : null}
          <Text category="h5" style={styles.heading}>
            Categories
          </Text>
          <Tags
            tags={
              recipe.categories.map(
                (category) =>
                  ({
                    name: category.name,
                    onPress: () => null,
                  } as Tag)
              )!
            }
          />
          <Text category="h5" style={styles.heading}>
            Ingredients
          </Text>
          <View style={{ marginHorizontal: -16 }}>
            <List
              data={recipe.ingredients!}
              renderItem={({
                item,
              }: {
                item: recipe_recipe_data_ingredients;
              }) => <IngredientListItem ingredient={item} />}
            />
            <Divider />
            <ViewMore onPress={() => null} />
          </View>
          <Text category="h5" style={styles.heading}>
            Directions
          </Text>
          <View style={{ marginHorizontal: -16 }}>
            <Carousel
              sliderWidth={Dimensions.get("window").width}
              itemWidth={Dimensions.get("window").width * 0.8}
              data={recipe.steps}
              renderItem={({ item }) => (
                <Card
                  header={() => (
                    <Image
                      style={{
                        height: undefined,
                        width: "100%",
                        aspectRatio: 1 / 1,
                      }}
                      source={{
                        uri: item.image,
                      }}
                    />
                  )}
                  footer={() => (
                    <Text style={{ margin: 16 }}>{item.description}</Text>
                  )}
                >
                  <Text category="h6">{item.title}</Text>
                </Card>
              )}
            />
          </View>
          <Text category="h5" style={styles.heading}>
            Top Comments
          </Text>
          <View style={{ marginHorizontal: -16 }}>
            <ListItem>
              <View style={{ flexDirection: "column", padding: 10 }}>
                <Text numberOfLines={2} style={{ marginBottom: 16 }}>
                  Wow, I really enjoyed this recipe! If you liked this one you
                  should check out my quiche recipe. I’ve done something similar
                  but changed a couple of things.
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: "bold" }}>Bobby Rutherford</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <LabelledIcon label="10" iconName="heart-outline" />
                    <LabelledIcon label="Reply" iconName="undo-outline" />
                  </View>
                </View>
              </View>
            </ListItem>
            <Divider />
            <ViewMore onPress={() => null} />
          </View>
        </View>
      </ScrollView>
    </ParallaxHeader>
  );
};

export default Recipe;
