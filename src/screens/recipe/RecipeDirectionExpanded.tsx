import React from "react";
import { recipe_recipe_data_steps } from "@greeneggs/types/graphql";
import { Text } from "@ui-kitten/components";
import { ScrollView, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TopNavigationGeneric from "@greeneggs/core/top-navigation-generic";
import Background from "@greeneggs/core/background";

const RecipeDirections = ({ route }: any) => {
  const { direction }: { direction: recipe_recipe_data_steps } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <Background>
      <ScrollView style={{ paddingTop: insets.top }}>
        <TopNavigationGeneric
          title={direction.title}
        />
        { direction.image && (
          <Image
            style={{
              height: undefined,
              width: "100%",
              aspectRatio: 1 / 1,
            }}
            source={{
              uri: direction.image,
            }}
          />
        ) }
        <Text style={{ margin: 16 }}>{direction.description}</Text>
      </ScrollView>
    </Background>
  );
};

export default RecipeDirections;
