import { Icons } from "@greeneggs/core";
import { IngredientInput, RecipeInput } from "@greeneggs/types/graphql";
import { StackNavigationProp } from "@react-navigation/stack";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import React, { useLayoutEffect } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { addRecipeStyles, RecipeForm } from "./AddRecipe";

export interface RecipeFormPart {
  form: RecipeForm;
  index: number;
  navigation: any;
}

// Roundabout way of generating a type for all keys of RecipeInput that are arrays of objects
type InputExtendsAny = {
  [K in keyof RecipeInput]: RecipeInput[K] extends never ? K : never;
}[keyof RecipeInput];

type InputExtendsArray = {
  [K in keyof Omit<
    RecipeInput,
    InputExtendsAny
  >]: RecipeInput[K] extends Array<object> ? K : never;
}[keyof Omit<RecipeInput, InputExtendsAny>];

interface ICreateRecipePartTemplate {
  title: string;
  navigation: StackNavigationProp<any>;
  route: any;
  formComponent: (props: RecipeFormPart) => React.ReactElement;
}

const CreateRecipePartTemplate = ({
  title,
  navigation,
  route,
  formComponent,
}: ICreateRecipePartTemplate) => {
  const insets = useSafeAreaInsets();
  const { form, index } = route.params as { form: RecipeForm; index: number };
  function goBack() {
    navigation.goBack();
  }
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <TopNavigation
        style={{ backgroundColor: "transparent", marginTop: insets.top }}
        alignment="center"
        title={title}
        accessoryLeft={() => (
          <TopNavigationAction icon={Icons.Back} onPress={goBack} />
        )}
      />
      <ScrollView style={{ marginBottom: insets.top * 4 }}>
        {React.createElement(formComponent, { form, index, navigation })}
      </ScrollView>
    </View>
  );
};

export default CreateRecipePartTemplate;
