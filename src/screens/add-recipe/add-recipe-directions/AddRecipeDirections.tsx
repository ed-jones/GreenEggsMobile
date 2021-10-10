import React, { useEffect } from "react";
import { List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView, Image } from "react-native";
import { RecipeForm } from "../AddRecipe";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { useFieldArray } from "react-hook-form";
import { Icons, AddListItem, Callout } from "@greeneggs/ui";
import addRecipeStyles from '../add-recipe-styles';

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
      <Callout
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
