import React, { useEffect } from "react";
import { List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView, Image, View } from "react-native";
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
    name: "steps",
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
        data={fields}
        renderItem={({ item, index }) =>
          item ? (
            <ListItem
              title={item.title}
              description={item.description}
              accessoryRight={(props) => (
                <>
                  <Image
                    source={{
                      uri: item.image && (item.image as ImageInfo).uri,
                    }}
                    style={{ width: 48, height: 48 }}
                  />
                  <Icons.Cross {...props} onPress={() => remove(index)} />
                </>
              )}
            />
          ) : null
        }
      />
      <AddListItem
        label="ADD STEP"
        onPress={() =>
          navigation.navigate("CreateStep", {
            append,
          })
        }
      />
    </ScrollView>
  );
};

export default AddRecipeDirections;
