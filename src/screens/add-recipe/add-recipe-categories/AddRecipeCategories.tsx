import React from "react";
import { List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { addRecipeStyles, RecipeForm } from "../AddRecipe";
import AddListItem from "@greeneggs/core/add-list-item/AddListItem";
import Alert from "@greeneggs/core/alert/Alert";
import { Icons } from "@greeneggs/core";
import { useFieldArray } from "react-hook-form";

interface IAddRecipeCategories {
  form: RecipeForm;
  navigation: any;
}

const AddRecipeCategories = ({ form, navigation }: IAddRecipeCategories) => {
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  return (
    <ScrollView>
      <Alert
        type="info"
        message={
          <Text>
            Tag this recipe with relevant categories, such as{" "}
            <Text style={{ fontWeight: "bold" }}>Breakfast</Text>,{" "}
            <Text style={{ fontWeight: "bold" }}>Soup</Text> or{" "}
            <Text style={{ fontWeight: "bold" }}>Italian</Text>.
          </Text>
        }
        style={addRecipeStyles.view}
      />
      <Text
        category="h5"
        style={{ ...addRecipeStyles.heading, ...addRecipeStyles.view }}
      >
        Categories
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
        label="ADD CATEGORY"
        onPress={() =>
          navigation.navigate("CreateCategory", {
            append,
          })
        }
      />
    </ScrollView>
  );
};

export default AddRecipeCategories;
