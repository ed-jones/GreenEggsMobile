import React from "react";
import { Button } from "@ui-kitten/components";
import ControlledInput, {
  InputType,
  Rules,
} from "@greeneggs/core/controlled-input/ControlledInput";
import { RecipeInput } from "@greeneggs/types/graphql";
import { addRecipeStyles } from "../AddRecipe";
import CreateRecipePartTemplate, {
  RecipeFormPart,
} from "../CreateRecipePartTemplate";

const CreateStep = ({ navigation, route }: any) => (
  <CreateRecipePartTemplate
    title="Create Step"
    navigation={navigation}
    route={route}
    formComponent={CreateStepForm}
  />
);

const CreateStepForm = ({ form, index, navigation }: RecipeFormPart) => (
  <>
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
        style: addRecipeStyles.input,
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
        style: addRecipeStyles.input,
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TEXTAREA}
    />
    <ControlledInput<RecipeInput>
      controllerProps={{
        name: `steps.${index}.image`,
        control: form.control,
        rules: {
          ...Rules.REQUIRED,
        },
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.PHOTO}
    />

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
  </>
);

export default CreateStep;
