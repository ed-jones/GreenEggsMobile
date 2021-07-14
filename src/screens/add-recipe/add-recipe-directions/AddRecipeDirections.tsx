import React, { useEffect } from "react";
import { List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView, Image } from "react-native";
import { addRecipeStyles, RecipeForm } from "../AddRecipe";
import AddListItem from "@greeneggs/core/add-list-item/AddListItem";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import Alert from "@greeneggs/core/alert/Alert";
import { useFieldArray } from "react-hook-form";
import { Icons } from "@greeneggs/core";

interface IAddRecipeDirections {
  form: RecipeForm;
  navigation: any;
}

const AddRecipeDirections = ({ form, navigation }: IAddRecipeDirections) => {
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const directionsLength = fields?.length || 0;
  useEffect(() => {
    if (directionsLength > 0) {
      form.clearErrors("steps");
    }
  }, [directionsLength]);

  return (
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
        renderItem={({ item, index }) => (
          <ListItem
            title={item.title}
            description={item.description}
            accessoryRight={() => (
              <>
                <Image
                  source={{ uri: item.image && (item.image as ImageInfo).uri }}
                  style={{ width: 48, height: 48 }}
                />
                <Icons.Cross onPress={remove(index)} />
              </>
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
};

export default AddRecipeDirections;
