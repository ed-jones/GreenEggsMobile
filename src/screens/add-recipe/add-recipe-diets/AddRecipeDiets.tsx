import React from "react";
import { List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { RecipeForm } from "../AddRecipe";
import { Icons, Callout, AddListItem } from "@greeneggs/ui";
import { useFieldArray } from "react-hook-form";
import addRecipeStyles from '../add-recipe-styles';

interface IAddRecipeDiets {
  form: RecipeForm;
  navigation: any;
}

const AddRecipeDiets = ({ form, navigation }: IAddRecipeDiets) => {
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "diets",
  });
  return (
    <ScrollView>
      <Callout
        type="warning"
        message={
          <Text>
            Tag this recipe with relevant diets, such as{" "}
            <Text style={{ fontWeight: "bold" }}>Kosher</Text>,{" "}
            <Text style={{ fontWeight: "bold" }}>Vegetarian</Text> or{" "}
            <Text style={{ fontWeight: "bold" }}>Gluten Free</Text>.
          </Text>
        }
        style={addRecipeStyles.view}
      />
      <Text
        category="h5"
        style={{ ...addRecipeStyles.heading, ...addRecipeStyles.view }}
      >
        Diets
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
        label="ADD DIET"
        onPress={() =>
          navigation.navigate("CreateDiet", {
            append,
          })
        }
      />
    </ScrollView>
  );
};

export default AddRecipeDiets;
