import React from "react";

import TopNavigationGeneric from "@greeneggs/core/top-navigation-generic";
import { useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FieldArrayMethodProps } from "react-hook-form";
import { Alert, BackHandler, ScrollView } from "react-native";
import Background from "@greeneggs/core/background";

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
    <Background>
      <TopNavigationGeneric title={title} />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {React.createElement(formComponent, {
          navigation,
          append,
        })}
      </ScrollView>
    </Background>
  );
};

export default CreateRecipePartTemplate;
