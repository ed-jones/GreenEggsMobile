import React from "react";
import { Button } from "@ui-kitten/components";
import {
  ControlledInput,
  InputType,
  Rules,
} from "@greeneggs/ui";
import { RecipeStepInput } from "@greeneggs/types/graphql";
import CreateRecipePartTemplate, {
  RecipeFormPart,
} from "../create-recipe-part-template";
import { useForm } from "react-hook-form";
import addRecipeStyles from "../add-recipe-styles";

const CreateStep = ({ navigation, route }: any) => (
  <CreateRecipePartTemplate
    title="Create Step"
    navigation={navigation}
    route={route}
    formComponent={CreateStepForm}
  />
);

const CreateStepForm = ({ navigation, append }: RecipeFormPart) => {
  const form = useForm<RecipeStepInput>({ mode: "all" });

  return (
    <>
      <ControlledInput<RecipeStepInput>
        controllerProps={{
          name: `title`,
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
          style: addRecipeStyles.input,
        }}
        type={InputType.TEXT}
      />
      <ControlledInput<RecipeStepInput>
        controllerProps={{
          name: `description`,
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
          style: addRecipeStyles.input,
        }}
        type={InputType.TEXTAREA}
      />
      <ControlledInput<RecipeStepInput>
        controllerProps={{
          name: `image`,
          control: form.control,
          rules: {
            ...Rules.REQUIRED,
          },
        }}
        inputProps={{
          label: "IMAGE",
        }}
        type={InputType.PHOTO}
      />
      <Button
        onPress={() => {
          form.trigger([`title`, `description`, `image`]).then((isValid) => {
            if (isValid) {
              append(form.getValues());
              navigation.goBack();
            }
          });
        }}
      >
        ADD STEP
      </Button>
    </>
  );
};

export default CreateStep;
