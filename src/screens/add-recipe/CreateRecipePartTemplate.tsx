import { Icons } from "@greeneggs/core";
import { RecipeInput } from "@greeneggs/types/graphql";
import { useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import React, { useEffect } from "react";
import {
  FieldArrayMethodProps,
  FieldArrayPath,
  useFieldArray,
} from "react-hook-form";
import { Alert, BackHandler, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RecipeForm } from "./AddRecipe";

type AppendType = (
  value: Partial<unknown> | Partial<unknown>[],
  options?: FieldArrayMethodProps | undefined
) => void;

export interface RecipeFormPart {
  navigation: any;
  append: AppendType;
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
  const { append } = route.params as {
    append: AppendType;
  };

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
        {React.createElement(formComponent, {
          navigation,
          append,
        })}
      </ScrollView>
    </>
  );
};

export default CreateRecipePartTemplate;
