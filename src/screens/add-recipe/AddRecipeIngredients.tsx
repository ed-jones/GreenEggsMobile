import React from 'react';
import { Divider, Input, List, ListItem, Text } from '@ui-kitten/components';

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
      label="SERVES"
      placeholder="4 people"
    />
    <Text category="h6">Ingredients</Text>
    <List data={Ingredients} renderItem={
      ({ item }) => (
        <>
          <ListItem
            title={item.title}
            description={item.description}
          />
          <Divider/>
        </>
      )
    }/>
    <ListItem
      title="Add Ingredient"
    />
  </>
);

export default CreateRecipeIngredients;
