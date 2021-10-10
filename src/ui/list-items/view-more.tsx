import React from "react";
import { ListItem, ListItemProps, Text } from "@ui-kitten/components";
import { Icons } from '@greeneggs/ui';

export const ViewMore = (props: ListItemProps) => (
  <ListItem
    accessoryRight={Icons.Down}
    title={() => (
      <Text style={{ textAlign: "center", marginRight: -32 }} category="label">
        VIEW MORE
      </Text>
    )}
    {...props}
  />
);
