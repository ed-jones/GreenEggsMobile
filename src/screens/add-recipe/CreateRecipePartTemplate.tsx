import { Icons } from "@greeneggs/core";
import { IngredientInput, RecipeInput } from "@greeneggs/types/graphql";
import { useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import React, { useLayoutEffect } from "react";
import { Alert, BackHandler, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { addRecipeStyles, RecipeForm } from "./AddRecipe";

export interface RecipeFormPart {
  form: RecipeForm;
  index: number;
  navigation: any;
}

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

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        goBack();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  async function goBackAlert(): Promise<boolean> {
    return new Promise<boolean>(function (resolve) {
      Alert.alert(
        "Exit without saving?",
        "If you go back now you will lose your changes",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => resolve(false),
          },
          { text: "OK", onPress: () => resolve(true) },
        ],
        { cancelable: false }
      );
    });
  }

  async function goBack() {
    if (await goBackAlert()) {
      navigation.goBack();
    }
  }
  return (
    <>
      <TopNavigation
        style={{ backgroundColor: "transparent", marginTop: insets.top }}
        alignment="center"
        title={title}
        accessoryLeft={() => (
          <TopNavigationAction icon={Icons.Back} onPress={goBack} />
        )}
      />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {React.createElement(formComponent, { form, index, navigation })}
      </ScrollView>
    </>
  );
};

export default CreateRecipePartTemplate;
