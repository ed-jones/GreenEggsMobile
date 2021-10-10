import React from "react";
import { List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { Icons, Callout, AddListItem } from "@greeneggs/ui";
import { useFieldArray } from "react-hook-form";

import { RecipeForm } from "../add-recipe";
import addRecipeStyles from '../add-recipe-styles';

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
      <Callout
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
