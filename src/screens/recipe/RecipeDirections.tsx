import React from "react";
import { recipe_recipe_data_steps } from "@greeneggs/types/graphql";
import { Card, Text } from "@ui-kitten/components";
import { Dimensions, View, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/core";

interface IRecipeDirections {
  directions: recipe_recipe_data_steps[];
}

const RecipeDirections = ({ directions }: IRecipeDirections) => {
  const navigation = useNavigation();

  return (
    <View style={{ marginHorizontal: -16 }}>
      <Carousel
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width * 0.8}
        data={directions}
        renderItem={({ item }) => (
          <Card
            onPress={() => navigation.navigate("RecipeDirectionExpanded", {
              direction: item,
            })}
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
            footer={() => <Text numberOfLines={2} style={{ margin: 16 }}>{item.description}</Text>}
          >
            <Text category="h6">{item.title}</Text>
          </Card>
        )}
      />
    </View>
)
}

export default RecipeDirections;
