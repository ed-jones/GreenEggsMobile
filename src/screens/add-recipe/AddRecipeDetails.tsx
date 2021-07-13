import React from "react";
import { Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { addRecipeStyles, RecipeForm } from "./AddRecipe";
import ControlledInput, {
  InputType,
} from "@greeneggs/core/controlled-input/ControlledInput";
import { RecipeInput } from "@greeneggs/types/graphql";
import Alert from "@greeneggs/core/alert/Alert";

interface ICreateRecipeDetails {
  form: RecipeForm;
}

const CreateRecipeDetails = ({ form }: ICreateRecipeDetails) => (
  <ScrollView style={{ paddingHorizontal: 16 }}>
    <Alert
      type="info"
      message="Add details such as a title, subtitle, description, time estimate and cover photo."
    />
    <Text category="h5" style={addRecipeStyles.heading}>
      Details
    </Text>
    <ControlledInput<RecipeInput>
      controllerProps={{ name: "title", control: form.control }}
      inputProps={{
        label: "TITLE",
        placeholder: "Spaghetti Carbonara",
        defaultValue: "",
        style: addRecipeStyles.input,
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
        style: addRecipeStyles.input,
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
        style: addRecipeStyles.input,
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TEXTAREA}
    />
    <ControlledInput<RecipeInput>
      controllerProps={{ name: "timeEstimate", control: form.control }}
      inputProps={{
        label: "TIME ESTIMATE",
        placeholder: "5 hours",
        defaultValue: "",
        style: addRecipeStyles.input,
        caption: "How long does it take to make this recipe?",
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TEXT}
    />
    <ControlledInput<RecipeInput>
      controllerProps={{ name: "coverImage", control: form.control }}
      inputProps={{ label: "COVER IMAGE " }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.PHOTO}
    />
  </ScrollView>
);

export default CreateRecipeDetails;
