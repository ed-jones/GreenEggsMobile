import React from "react";
import { List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { RecipeForm } from "../add-recipe";
import { Icons, Callout, AddListItem } from "@greeneggs/ui";
import { useFieldArray } from "react-hook-form";
import { AddRecipeStyles } from '../add-recipe-styles';

interface IAddRecipeAllergies {
  form: RecipeForm;
  navigation: any;
}

export const AddRecipeAllergies = ({ form, navigation }: IAddRecipeAllergies) => {
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "allergies",
  });

  return (
    <ScrollView>
      <Callout
        type="danger"
        message={
          <Text>
            Make sure to specify any food in this recipe that may trigger
            allergies, such as <Text style={{ fontWeight: "bold" }}>Milk</Text>,{" "}
            <Text style={{ fontWeight: "bold" }}>Eggs</Text> and{" "}
            <Text style={{ fontWeight: "bold" }}>Peanuts</Text>.
          </Text>
        }
        style={AddRecipeStyles.view}
      />
      <Text
        category="h5"
        style={{ ...AddRecipeStyles.heading, ...AddRecipeStyles.view }}
      >
        Allergies
      </Text>
      <List
        data={fields}
        renderItem={({ item, index }) => (
          <>
            <ListItem
              title={item.name}
              accessoryRight={(props) => (
                <Icons.Cross {...props} onPress={() => remove(index)} />
              )}
            />
          </>
        )}
      />
      <AddListItem
        label="ADD ALLERGY"
        onPress={() =>
          navigation.navigate("CreateAllergy", {
            append,
          })
        }
      />
    </ScrollView>
  );
};
