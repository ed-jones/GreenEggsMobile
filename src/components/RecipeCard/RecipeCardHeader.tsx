import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Icon, Text } from '@ui-kitten/components';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftElements: {
    flexDirection: 'row',
  },
  rightElements: {
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
  },
  ellipsisIcon: {
    width: 16,
    height: 16,
  }
});

const RecipeCardHeader = () => (
  <View style={styles.view}>
    <View style={styles.leftElements}>
      <Avatar
        size='tiny'
        source={{uri: 'https://userstock.io/data/wp-content/uploads/2017/09/jason-blackeye-223584-1024x849.jpg'}}
        style={styles.avatar}
      />
      <Text style={styles.username}>Betty Phat</Text>
    </View>
    <View style={styles.rightElements}>
      <Icon style={styles.ellipsisIcon} name='more-horizontal' />
    </View>
  </View>
);

export default RecipeCardHeader;
