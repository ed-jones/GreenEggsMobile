import React from "react";
import { recipe_recipe_data_steps } from "@greeneggs/types/graphql";
import {
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icons } from "@greeneggs/core";

const RecipeDirections = ({ route }: any) => {
  const { direction }: { direction: recipe_recipe_data_steps } = route.params;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{ paddingTop: insets.top }}>
      <TopNavigation
        alignment="center"
        accessoryLeft={() => (
          <TopNavigationAction
            icon={Icons.Back}
            onPress={() => navigation.goBack()}
          />
        )}
        title={direction.title}
        style={{ backgroundColor: "transparent" }}
      />
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
      <Text style={{ margin: 16 }}>{direction.description}</Text>
    </ScrollView>
  );
};

export default RecipeDirections;
