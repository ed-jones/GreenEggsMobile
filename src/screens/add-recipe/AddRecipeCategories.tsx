import React from 'react';
import { Divider, Input, List, ListItem, Text } from '@ui-kitten/components';

const Categories = [
  {
    title: "Breakfast",
  },
  {
    title: "Dessert",
  }
];

const Diets = [
  {
    title: "Vegan",
  },
  {
    title: "Vegetarian",
  }
];

const Allergies = [
  {
    title: "Eggs",
  },
  {
    title: "Dairy",
  }
];

const AddRecipeCategories = () => (
  <>
    <Text category="h6">Categories</Text>
    <List data={Categories} renderItem={
      ({ item }) => (
        <>
          <ListItem
            title={item.title}
          />
          <Divider/>
        </>
      )
    }/>
    <ListItem
      title="Add Category"
    />
    <Text category="h6">Diets</Text>
    <List data={Diets} renderItem={
      ({ item }) => (
        <>
          <ListItem
            title={item.title}
          />
          <Divider/>
        </>
      )
    }/>
    <ListItem
      title="Add Diet"
    />
    <Text category="h6">Allergies</Text>
    <List data={Allergies} renderItem={
      ({ item }) => (
        <>
          <ListItem
            title={item.title}
          />
          <Divider/>
        </>
      )
    }/>
    <ListItem
      title="Add Allergy"
    />
  </>
);

export default AddRecipeCategories;
