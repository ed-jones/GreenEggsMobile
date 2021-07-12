import React from "react";
import { List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView, Image } from "react-native";
import { addRecipeStyles, RecipeForm } from "../AddRecipe";
import AddListItem from "@greeneggs/core/add-list-item/AddListItem";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import Alert from "@greeneggs/core/alert/Alert";

interface IAddRecipeDirections {
  form: RecipeForm;
  navigation: any;
}

const AddRecipeDirections = ({ form, navigation }: IAddRecipeDirections) => (
  <ScrollView>
    <Alert
      type="info"
      message="Include steps that must be completed in order to follow this recipe."
      style={addRecipeStyles.view}
    />
    <Text
      category="h5"
      style={{ ...addRecipeStyles.heading, ...addRecipeStyles.view }}
    >
      Directions
    </Text>
    <List
      data={form.watch("steps")}
      renderItem={({ item }) => (
        <ListItem
          title={item.title}
          description={item.description}
          accessoryRight={() => (
            <Image
              source={{ uri: item.image && (item.image as ImageInfo).uri }}
              style={{ width: 48, height: 48 }}
            />
          )}
        />
      )}
    />
    <AddListItem
      label="ADD STEP"
      onPress={() =>
        navigation.navigate("CreateStep", {
          form,
          index: form.getValues("steps")?.length || 0,
        })
      }
    />
  </ScrollView>
);

export default AddRecipeDirections;
