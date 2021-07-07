import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";

const styles = StyleSheet.create({
  tag: {
    borderRadius: 16,
    marginRight: 6,
    marginVertical: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#8F9BB3",
  },
  tags: {
    flexDirection: "row",
  },
});

export interface Tag {
  name: string;
  onPress: () => void;
}

interface IRecipeCategoryTags {
  tags: Tag[];
}

const RecipeCategoryTags = ({ tags }: IRecipeCategoryTags) => (
  <View style={styles.tags}>
    {tags.map((tag: Tag) => (
      <Text category="label" appearance="alternative" style={styles.tag}>
        {tag.name}
      </Text>
    ))}
  </View>
);

export default RecipeCategoryTags;
