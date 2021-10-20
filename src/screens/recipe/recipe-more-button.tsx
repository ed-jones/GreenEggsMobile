import React, { FC, useState } from "react";
import { Icon, Menu, MenuItem, Popover } from "@ui-kitten/components";
import { View } from "react-native";
import { useMutation } from "@apollo/client";
import { DeleteRecipe } from "@greeneggs/types/graphql";
import { Mutations, Queries } from "@greeneggs/graphql";
import { useNavigation } from "@react-navigation/core";

interface RecipeMoreButtonProps {
  recipeId: string;
}

export const RecipeMoreButton: FC<RecipeMoreButtonProps> = ({ recipeId }) => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const [deleteRecipe] = useMutation<DeleteRecipe>(Mutations.DELETE_RECIPE, {
    variables: {
      recipeId,
    },
    refetchQueries: [Queries.ME, "me"]
  });

  function handleDeleteRecipe() {
    deleteRecipe();
    navigation.goBack();
  }

  return (
    <Popover
      visible={visible}
      anchor={() => (
        <Icon
          name="more-vertical-outline"
          fill="black"
          style={{ width: 24, height: 24 }}
          onPress={() => setVisible(true)}
        />
      )}
      onBackdropPress={() => setVisible(false)}
    >
      <View style={{ width: 132 }}>
        <Menu>
          <MenuItem title="DELETE RECIPE" onPress={() => handleDeleteRecipe()}/>
        </Menu>
      </View>
    </Popover>
  );
};
