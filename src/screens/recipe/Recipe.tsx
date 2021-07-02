import React from "react";
import { useQuery } from "@apollo/client";
import {
  ImageBackground,
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Icons, LabelledIcon, Queries } from "@greeneggs/core";
import {
  Avatar,
  Card,
  ListElement,
  ListItem,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
  Layout,
  Divider,
} from "@ui-kitten/components";
import { recipe, recipeVariables } from "@greeneggs/types/graphql";
import { convertTimeEstimate } from "@greeneggs/core/convertTimeEstimate/convertTimeEstimate";
import Alert from "@greeneggs/core/alert/Alert";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { noavatar } from "@greeneggs/core";
import ViewMore from "@greeneggs/core/view-more/ViewMore";
import ParallaxHeader from "@fabfit/react-native-parallax-header";
import { LinearGradient } from "expo-linear-gradient";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";

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
  tag: {
    borderRadius: 16,
    marginRight: 6,
    marginVertical: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#8F9BB3",
  },
  tags: {
    flexDirection: "row",
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

  if (loading || !data) return <Spinner />;
  if (error) return <Text>{error.message}</Text>;

  const navigateToDescription = () => {
    navigation.navigate("RecipeDescription", {
      description: data.recipe.description,
      createdAt: data.recipe.createdAt,
      title: data.recipe.title,
      submittedBy: data.recipe.submittedBy,
    });
  };

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
          source={{ uri: data.recipe.previewURI }}
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
          <Card
            header={() => (
              <View style={{ ...styles.cardSection, ...styles.row }}>
                <View>
                  <Text category="h5">{data.recipe.title}</Text>
                  <Text category="s1">{data.recipe.subtitle}</Text>
                </View>
                <LabelledIcon
                  label={convertTimeEstimate(data.recipe.timeEstimate)}
                  iconName="clock-outline"
                />
              </View>
            )}
            footer={() => (
              <View style={styles.cardSection}>
                <Text numberOfLines={2}>{data.recipe.description}</Text>
                <ViewMore
                  style={{ paddingHorizontal: 0, marginTop: 8 }}
                  onPress={navigateToDescription}
                />
              </View>
            )}
          >
            <View style={styles.row}>
              <View style={styles.row}>
                <Avatar
                  size="small"
                  source={
                    data.recipe.submittedBy.avatarURI
                      ? { uri: data.recipe.submittedBy.avatarURI }
                      : noavatar
                  }
                  style={styles.avatar}
                />
                <Text>
                  {`${data.recipe.submittedBy.firstName} ${data.recipe.submittedBy.lastName}`}
                </Text>
              </View>
              <View style={styles.row}>
                <LabelledIcon
                  label={String(data?.recipe.likeCount)}
                  iconName="heart-outline"
                />
                <LabelledIcon
                  label={String(data?.recipe.commentCount)}
                  iconName="message-square-outline"
                />
              </View>
            </View>
          </Card>
          <Alert
            alertType="danger"
            message="This recipe is unsuitable for those with allergies to Eggs, Milk and Gluten."
          />
          <Text category="h5" style={styles.heading}>
            Categories
          </Text>
          <View style={styles.tags}>
            <Text category="label" appearance="alternative" style={styles.tag}>
              LUNCH
            </Text>
            <Text category="label" appearance="alternative" style={styles.tag}>
              BREAKFAST
            </Text>
            <Text category="label" appearance="alternative" style={styles.tag}>
              DINNER
            </Text>
          </View>
          <Text category="h5" style={styles.heading}>
            Ingredients
          </Text>
          <View style={{ marginHorizontal: -16 }}>
            <ListItem
              title="Flour"
              accessoryRight={() => (
                <Text category="label" style={{ marginRight: 10 }}>
                  150 GRAMS
                </Text>
              )}
            />
            <ListItem
              title="Butter"
              accessoryRight={() => (
                <Text category="label" style={{ marginRight: 10 }}>
                  2.8 OUNCES
                </Text>
              )}
            />
            <ListItem
              title="Turmeric"
              description="Optional"
              accessoryRight={() => (
                <Text category="label" style={{ marginRight: 10 }}>
                  1 PINCH
                </Text>
              )}
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
              data={[1, 2, 3, 4, 5]}
              renderItem={({ index }) => (
                <Card
                  header={() => (
                    <Image
                      style={{
                        height: undefined,
                        width: "100%",
                        aspectRatio: 1 / 1,
                      }}
                      source={{
                        uri: "https://reviewed-com-res.cloudinary.com/image/fetch/s--lm7imI2e--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_792/https://reviewed-production.s3.amazonaws.com/attachment/98c2ea086c2d4ccc/Preheat_ovens_2.png",
                      }}
                    />
                  )}
                  footer={() => (
                    <Text style={{ margin: 16 }}>
                      Preheat oven to 375 degrees F (190 degrees C).
                    </Text>
                  )}
                >
                  <Text category="h6">{`${index + 1}. Preheat Oven`}</Text>
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
