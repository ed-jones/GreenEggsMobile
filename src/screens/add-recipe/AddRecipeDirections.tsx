import React from 'react';
import { Divider, Input, List, ListItem, Text } from '@ui-kitten/components';

const Directions = [
  {
    title: "Chop Carrots",
    description: "After washing the carrots, carefully dice them into small",
  },
  {
    title: "Boil Spaghetti",
    description: "Place the spaghetti in boiling water until it softens",
  }
]

const AddRecipeDirections = () => (
  <>
    <Text category="h6">Directions</Text>
    <List data={Directions} renderItem={
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
      title="Add Step"
    />
  </>
);

export default AddRecipeDirections;
