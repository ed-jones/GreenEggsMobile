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
  error?: boolean;
}

const AddListItem = withStyles(
  ({ label, onPress, eva, error }: IAddListItem & ThemedComponentProps) => (
    <>
      <Divider />
      <ListItem style={{ justifyContent: "center" }} onPress={onPress}>
        <Add
          style={{ width: 24, height: 24, marginRight: 8, marginLeft: -32 }}
          fill={
            error
              ? eva?.theme && eva.theme["text-danger-color"]
              : eva?.theme && eva.theme["text-primary-color"]
          }
        />
        <Text category="label" status={error ? "danger" : undefined}>
          {label}
        </Text>
      </ListItem>
      {error ? (
        <Text category="c2" status="danger">
          {}
        </Text>
      ) : undefined}
    </>
  )
);

export default AddListItem;
