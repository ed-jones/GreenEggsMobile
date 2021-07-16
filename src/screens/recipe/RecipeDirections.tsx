import React from "react";
import { recipe_recipe_data_steps } from "@greeneggs/types/graphql";
import { Card, Text } from "@ui-kitten/components";
import { Dimensions, View, Image } from "react-native";
import Carousel from "react-native-snap-carousel";

interface IRecipeDirections {
  directions: recipe_recipe_data_steps[];
}

const RecipeDirections = ({ directions }: IRecipeDirections) => (
  <View style={{ marginHorizontal: -16 }}>
    <Carousel
      sliderWidth={Dimensions.get("window").width}
      itemWidth={Dimensions.get("window").width * 0.8}
      data={directions}
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
          footer={() => <Text style={{ margin: 16 }}>{item.description}</Text>}
        >
          <Text category="h6">{item.title}</Text>
        </Card>
      )}
    />
  </View>
);

export default RecipeDirections;
