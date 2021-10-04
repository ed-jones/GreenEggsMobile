import React from "react";
import {
  Divider,
  ListItem,
  Text,
  ThemedComponentProps,
  withStyles,
} from "@ui-kitten/components";
import { Add } from "../icons/Icons";
import { FieldError } from "react-hook-form";

interface IAddListItem {
  label: string;
  onPress: () => void;
  error?: FieldError | undefined;
}

const AddListItem = withStyles(
  ({ label, onPress, eva, error }: IAddListItem & ThemedComponentProps) => (
    <>
      <Divider />
      <ListItem
        style={{
          justifyContent: "center",
          borderColor: eva?.theme?.["text-danger-color"],
          borderTopWidth: error ? 1 : undefined,
          borderBottomWidth: error ? 1 : undefined,
        }}
        onPress={onPress}
      >
        <Add
          style={{ width: 24, height: 24, marginRight: 8, marginLeft: -32 }}
          fill={
            error
              ? eva?.theme?.["text-danger-color"]
              : eva?.theme?.["text-primary-color"]
          }
        />
        <Text category="label" status={error ? "danger" : undefined}>
          {label}
        </Text>
      </ListItem>
      {error ? (
        <Text
          category="c2"
          status="danger"
          style={{ marginHorizontal: 16, marginTop: 8 }}
        >
          {error.message}
        </Text>
      ) : undefined}
    </>
  )
);

export default AddListItem;
