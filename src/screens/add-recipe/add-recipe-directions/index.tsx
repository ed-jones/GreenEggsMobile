import React, { useEffect } from "react";
import { ListItem } from "@ui-kitten/components";
import { Image, View } from "react-native";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { useFieldArray } from "react-hook-form";
import { Icons } from "@greeneggs/ui";

import { RecipeForm } from "../add-recipe";
import { AddRecipePartTemplate } from "../add-recipe-part-template";

interface IAddRecipeDirections {
  form: RecipeForm;
  navigation: any;
}

export const AddRecipeDirections = ({
  form,
  navigation,
}: IAddRecipeDirections) => {
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
    <AddRecipePartTemplate
      title="Steps"
      createButtonTitle="ADD STEP"
      onPressCreate={() =>
        navigation.navigate("CreateStep", {
          append,
        })
      }
      emptyStateTitle="No steps"
      emptyStateDescription="Include any steps that must be completed in order to follow this recipe."
      listItem={({ item, index }) =>
        item ? (
          <ListItem
            title={item.title ?? undefined}
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
      data={fields}
    />
  );
};
