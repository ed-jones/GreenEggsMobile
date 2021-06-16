import React from 'react';
import { Input, Button } from '@ui-kitten/components';

const Ingredients = [
  {
    title: "Carrot",
    description: "Finely chopped",
    quantity: "5 cups",
  },
  {
    title: "Baked Beans",
    quantity: "1 Tin",
  }
]

const CreateRecipeIngredients = () => (
  <>
    <Input
      label="TITLE"
      placeholder="Spaghetti Carbonara"
    />
    <Input
      label="DESCRIPTION"
      placeholder="When I was a little girl growing up in the mountains of Italy..."
    />
    <Input
      label="ESTIMATED TIME"
      placeholder="1 hour"
    />
    <Button>Add Cover Photo</Button>
  </>
);

export default CreateRecipeIngredients;
