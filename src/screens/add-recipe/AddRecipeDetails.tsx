import React from "react";
import { Input, Button } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { addRecipeStyles, RecipeForm } from "./AddRecipe";
import ControlledInput, {
  InputType,
} from "@greeneggs/core/controlled-input/ControlledInput";
import { RecipeInput } from "@greeneggs/types/graphql";

interface ICreateRecipeDetails {
  form: RecipeForm;
}

const CreateRecipeDetails = ({ form }: ICreateRecipeDetails) => (
  <ScrollView style={addRecipeStyles.view}>
    <ControlledInput<RecipeInput>
      controllerProps={{ name: "title", control: form.control }}
      inputProps={{
        label: "TITLE",
        placeholder: "Spaghetti Carbonara",
        defaultValue: "",
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TEXT}
    />
    <ControlledInput<RecipeInput>
      controllerProps={{ name: "subtitle", control: form.control }}
      inputProps={{
        label: "SUBTITLE",
        placeholder: "A quick, healthy and delicious meal",
        defaultValue: "",
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TEXT}
    />
    <ControlledInput<RecipeInput>
      controllerProps={{ name: "description", control: form.control }}
      inputProps={{
        label: "DESCRIPTION",
        placeholder:
          "When I was a little girl growing up in the mountains of Italy...",
        defaultValue: "",
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TEXT}
    />
    <ControlledInput<RecipeInput>
      controllerProps={{ name: "timeEstimate", control: form.control }}
      inputProps={{
        label: "TIME ESTIMATE",
        placeholder: "1 hour",
        defaultValue: "",
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.NUMERIC}
    />
    <ControlledInput<RecipeInput>
      controllerProps={{ name: "previewURI", control: form.control }}
      inputProps={{
        label: "PREVIEW URI (TEMP)",
        placeholder: "http://example.com/image.png",
        defaultValue: "",
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TEXT}
    />
    <Button>Add Cover Photo</Button>
  </ScrollView>
);

export default CreateRecipeDetails;
