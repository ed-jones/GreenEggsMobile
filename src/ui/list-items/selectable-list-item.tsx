/**
 * Author: Edward Jones
 */
import { ListItem, ListItemProps, Icon, Text } from "@ui-kitten/components";
import { RenderProp } from "@ui-kitten/components/devsupport";
import React, { FC } from "react";
import { ViewProps } from "react-native";
import Svg, { Circle } from "react-native-svg";

const CheckIcon: RenderProp<ViewProps> = (props) => {
  return <Icon {...props} name="checkmark-circle-2" />;
};

const CircleIcon: RenderProp<ViewProps> = (props) => {
  return (
    <Svg {...props}>
      <Circle cx="12" cy="12" r="9" stroke="#8F9BB3" strokeWidth={2} />
    </Svg>
  );
};

interface SelectableListItemProps extends Omit<ListItemProps, 'title'> {
  selected: boolean;
  setSelected: (selected: boolean) => void;
  title: string;
}

/**
 * Component for rendering a list item that can be selected and deselected.
 */
export const SelectableListItem: FC<SelectableListItemProps> = ({
  selected,
  setSelected,
  title,
  ...props
}) => (
  <ListItem
    {...props}
    title={<Text style={{ fontWeight: 'bold' }}>{title}</Text>}
    accessoryRight={selected ? CheckIcon : CircleIcon}
    onPress={() => setSelected(!selected)}
  />
);
