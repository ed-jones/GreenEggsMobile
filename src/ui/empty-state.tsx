import React, { FC } from "react";
import { Icon, Text } from "@ui-kitten/components";
import { View } from "react-native";

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState: FC<EmptyStateProps> = ({ title, description }) => {
  return (
    <View style={{ flexDirection: "row", paddingHorizontal: 32 }}>
      <Icon
        fill="black"
        name="loader-outline"
        style={{ width: 32, height: 32, marginRight: 16 }}
      />
      <View style={{flexShrink: 1}}>
        <Text category="h6" style={{paddingBottom: 8}}>{title}</Text>
        <Text category="p1">{description}</Text>
      </View>
    </View>
  );
};
