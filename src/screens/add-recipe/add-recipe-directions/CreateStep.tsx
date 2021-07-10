import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform, Image } from "react-native";
import {
  Button,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icons } from "@greeneggs/core";
import ControlledInput, {
  InputType,
  Rules,
} from "@greeneggs/core/controlled-input/ControlledInput";
import { RecipeInput } from "@greeneggs/types/graphql";
import { RecipeForm } from "../AddRecipe";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
  },
});

const CreateStep = ({ navigation, route }: any) => {
  const { form, index } = route.params as { form: RecipeForm; index: number };
  const insets = useSafeAreaInsets();
  const [image, setImage] = useState<ImageInfo | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  return (
    <View style={styles.view}>
      <TopNavigation
        style={{ backgroundColor: "transparent", paddingTop: insets.top }}
        alignment="center"
        title="Add Step"
        accessoryLeft={() => (
          <TopNavigationAction
            icon={Icons.Back}
            onPress={() => navigation.goBack()}
          />
        )}
      />
      <ControlledInput<RecipeInput>
        controllerProps={{
          name: `steps.${index}.title`,
          control: form.control,
          rules: {
            ...Rules.REQUIRED,
            ...Rules.UNDER100CHARS,
          },
        }}
        inputProps={{
          label: "TITLE",
          placeholder: "Chop the carrots",
          defaultValue: "",
        }}
        submitError={form.formResult.data?.addRecipe.error}
        type={InputType.TEXT}
      />
      <ControlledInput<RecipeInput>
        controllerProps={{
          name: `steps.${index}.description`,
          control: form.control,
          rules: {
            ...Rules.UNDER100CHARS,
            ...Rules.REQUIRED,
          },
        }}
        inputProps={{
          label: "DESCRIPTION",
          placeholder: "After washing the carrots, finely dice them...",
          defaultValue: "",
        }}
        submitError={form.formResult.data?.addRecipe.error}
        type={InputType.TEXTAREA}
      />
      {image ? (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      ) : undefined}
      <Button onPress={pickImage}>Take Photo</Button>
      <Button
        onPress={() => {
          form
            .trigger([
              `steps.${index}.title`,
              `steps.${index}.description`,
              `steps.${index}.image`,
            ])
            .then((isValid) => (isValid ? navigation.goBack() : undefined));
        }}
      >
        ADD STEP
      </Button>
    </View>
  );
};

export default CreateStep;
