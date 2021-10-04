import { ListItem, ListItemProps, Icon } from "@ui-kitten/components";
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
      <Circle cx="12" cy="12" r="10" stroke="black" />
    </Svg>
  );
};

interface SelectableListItemProps extends ListItemProps {
  selected: boolean;
  setSelected: (selected: boolean) => void;
}

const SelectableListItem: FC<SelectableListItemProps> = ({
  selected,
  setSelected,
  ...props
}) => (
  <ListItem
    {...props}
    accessoryRight={selected ? CheckIcon : CircleIcon}
    onPress={() => setSelected(!selected)}
  />
);

export default SelectableListItem;
