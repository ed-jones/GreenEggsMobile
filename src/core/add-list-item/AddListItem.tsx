import React from "react";
import {
  Divider,
  ListItem,
  Text,
  ThemedComponentProps,
  withStyles,
} from "@ui-kitten/components";
import { Add } from "../icons/Icons";

interface IAddListItem {
  label: string;
  onPress: () => void;
}

const AddListItem = withStyles(
  ({ label, onPress, eva }: IAddListItem & ThemedComponentProps) => (
    <>
      <Divider />
      <ListItem style={{ justifyContent: "center" }} onPress={() => onPress}>
        <Add
          style={{ width: 24, height: 24, marginRight: 8, marginLeft: -32 }}
          fill={eva?.theme && eva.theme["text-primary-color"]}
        />
        <Text category="label">{label}</Text>
      </ListItem>
    </>
  )
);

export default AddListItem;
