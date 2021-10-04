import React, { FC, ReactElement, ReactText } from "react";
import {
  Text,
  Button,
  Layout,
} from "@ui-kitten/components";
import { View } from "react-native";

interface SimpleButtonProps {
  title: string;
  onPress: () => void;
}

export interface FilterControlGroupProps {
  label: string;
  clearButton: SimpleButtonProps;
  applyButton: SimpleButtonProps;
}

const FilterControlGroup: FC<FilterControlGroupProps> = 
  ({
    label,
    clearButton,
    applyButton,
  }) => {
    return (
      <Layout style={{padding: 16}} level="4">
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
          <Text category="label">{label}</Text>
          <Button size="small" status="basic" onPress={clearButton.onPress}>{clearButton.title}</Button>
        </View>
        <Button onPress={applyButton.onPress}>{applyButton.title}</Button>
      </Layout>
    );
  }


export default FilterControlGroup;
