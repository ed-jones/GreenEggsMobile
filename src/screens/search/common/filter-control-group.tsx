/**
 * Author: Victor Ying
 */
import React, { FC } from "react";
import { Text, Button, Layout, Divider } from "@ui-kitten/components";
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

/**
 * Generic control group component with a label and 2 buttons.
 */
export const FilterControlGroup: FC<FilterControlGroupProps> = ({
  label,
  clearButton,
  applyButton,
}) => {
  return (
    <>
      <Divider />
      <Layout style={{ padding: 16 }} level="1">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text category="label">{label}</Text>
          <Button size="small" status="basic" onPress={clearButton.onPress}>
            {clearButton.title}
          </Button>
        </View>
        <Button onPress={applyButton.onPress}>{applyButton.title}</Button>
      </Layout>
    </>
  );
};
