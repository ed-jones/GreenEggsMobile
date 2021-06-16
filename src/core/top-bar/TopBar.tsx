import React from 'react';
import { Icon, Input } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';

import logo512 from '../logo/logo512.png';

const styles = StyleSheet.create({
  topNavigation: {
    backgroundColor: '#F7F9FC',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  search: {
    marginRight: 16,
    flex: 1,
  },
});

const TopBar = () => (
  <View style={styles.topNavigation}>
    <Image source={logo512} style={styles.logo} />
    <Input
      placeholder="Search Recipe"
      size="large"
      style={styles.search}
      accessoryLeft={(props) => <Icon style={styles.icon} name="search" {...props} />}
    />
  </View>
);

export default TopBar;
