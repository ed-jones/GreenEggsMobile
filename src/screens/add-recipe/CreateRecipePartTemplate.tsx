import { Icons } from "@greeneggs/core";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { addRecipeStyles, RecipeForm } from "./AddRecipe";

export interface RecipeFormPart {
  form: RecipeForm;
  index: number;
  navigation: any;
}

interface ICreateRecipePartTemplate {
  title: string;
  navigation: any;
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

  return (
    <View style={addRecipeStyles.view}>
      <TopNavigation
        style={{ backgroundColor: "transparent", marginTop: insets.top }}
        alignment="center"
        title={title}
        accessoryLeft={() => (
          <TopNavigationAction
            icon={Icons.Back}
            onPress={() => navigation.goBack()}
          />
        )}
      />
      {React.createElement(formComponent, { form, index, navigation })}
    </View>
  );
};

export default CreateRecipePartTemplate;
