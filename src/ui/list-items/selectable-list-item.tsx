/**
 * Author: Edward Jones
 */
import { ListItem, ListItemProps, Icon, Text } from '@ui-kitten/components';
import { ViewProps } from 'react-native'
import Svg, { Circle } from 'react-native-svg'

function CheckIcon(props?: ViewProps) {
  return <Icon {...props} name='checkmark-circle-2' />
}

function CircleIcon(props?: ViewProps) {
  return (
    <Svg {...props}>
      <Circle cx='12' cy='12' r='9' stroke='#8F9BB3' strokeWidth={2} />
    </Svg>
  )
}

interface SelectableListItemProps extends Omit<ListItemProps, 'title'> {
  selected: boolean
  setSelected: (selected: boolean) => void
  title: string
}

/**
 * Component for rendering a list item that can be selected and deselected.
 */
export function SelectableListItem({ selected, setSelected, title, ...props }: SelectableListItemProps) {
  return (
    <ListItem
      {...props}
      title={<Text style={{ fontWeight: 'bold' }}>{title}</Text>}
      accessoryRight={selected ? CheckIcon : CircleIcon}
      onPress={() => setSelected(!selected)}
    />
  )
}
