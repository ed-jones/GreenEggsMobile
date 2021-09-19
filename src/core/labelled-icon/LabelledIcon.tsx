import React from "react";
import { Text, Icon } from "@ui-kitten/components";
import { View, StyleSheet, Pressable } from "react-native";

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});

interface ILabelledIconProps {
  iconName: string;
  label: string;
  onPress?: () => void;
}

const LabelledIcon = ({ iconName, label, onPress }: ILabelledIconProps) => (
  <Pressable onPress={onPress}>
    <View style={styles.view}>
      <Icon style={styles.icon} name={iconName} fill="black" />
      <Text>{label}</Text>
    </View>
  </Pressable>
);

export default LabelledIcon;
