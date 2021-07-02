import React from "react";
import { ListItem, ListItemProps, Text } from "@ui-kitten/components";
import { Down } from "../icons/Icons";

const ViewMore = (props: ListItemProps) => (
  <ListItem
    accessoryRight={Down}
    title={() => (
      <Text style={{ textAlign: "center", marginRight: -32 }} category="label">
        VIEW MORE
      </Text>
    )}
    {...props}
  />
);

export default ViewMore;
