import React from 'react';
import { Text, Icon } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  }
});


interface ILabelledIconProps {
  iconName: string;
  label: string;
}

const LabelledIcon = ({iconName, label}: ILabelledIconProps) => (
  <View style={styles.view}>
    <Icon style={styles.icon} name={iconName} fill='black'/>
    <Text>{label}</Text>
  </View>
);

export default LabelledIcon;
