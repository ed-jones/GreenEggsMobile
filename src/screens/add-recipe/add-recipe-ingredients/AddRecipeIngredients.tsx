import React, { useState } from "react";
import { List, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { IngredientInput, RecipeInput } from "@greeneggs/types/graphql";
import ControlledInput, {
  InputType,
  Rules,
} from "@greeneggs/core/controlled-input/ControlledInput";
import { ScrollView } from "react-native-gesture-handler";
import { addRecipeStyles, RecipeForm } from "../AddRecipe";
import AddListItem from "@greeneggs/core/add-list-item/AddListItem";
import IngredientListItem from "@greeneggs/core/ingredient-list-item/IngredientListItem";
import { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";

interface ICreateRecipeIngredients {
  form: RecipeForm;
  navigation: StackNavigationProp<any>;
}

const CreateRecipeIngredients = ({
  form,
  navigation,
}: ICreateRecipeIngredients) => {
  return (
    <ScrollView>
      <View style={addRecipeStyles.view}>
        <ControlledInput<RecipeInput>
          controllerProps={{
            name: "servingCount",
            control: form.control,
            rules: {
              ...Rules.Required,
            },
          }}
          inputProps={{
            label: "SERVES",
            placeholder: "4",
            defaultValue: "",
          }}
          submitError={form.formResult.data?.addRecipe.error}
          type={InputType.NUMERIC}
        />
        <Text category="h5" style={addRecipeStyles.heading}>
          Ingredients
        </Text>
      </View>
      <List
        data={form.watch("ingredients")}
        renderItem={({ item }) => <IngredientListItem ingredient={item} />}
      />
      <AddListItem
        label="ADD INGREDIENT"
        onPress={() =>
          navigation.navigate("CreateIngredient", {
            form,
            index: form.getValues("ingredients")?.length || 0,
          })
        }
      />
    </ScrollView>
  );
};

export default CreateRecipeIngredients;
