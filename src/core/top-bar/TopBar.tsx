import React from 'react';
import { Button, Icon, Input, ThemedComponentProps, TopNavigationAction, withStyles } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';

import logo512 from '../logo/logo512.png';
import * as Icons from '../icons/Icons';

const styles = StyleSheet.create({
  topNavigation: {
    backgroundColor: 'transparent',
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

interface TopBarProps {
  query: string | undefined;
  setQuery: (query: string | undefined) => void;
}

const TopBar = withStyles(({ query, setQuery, eva }: TopBarProps & ThemedComponentProps) => {
  return (
    <View style={styles.topNavigation}>
      { query === undefined ? (
        <Image source={logo512} style={styles.logo} />
      ) : (
        <TopNavigationAction icon={Icons.Back} onPress={() => setQuery(undefined)}/>
      ) }
      <Input
        placeholder="Search Recipe"
        size="large"
        style={styles.search}
        accessoryLeft={(props) => <Icon style={styles.icon} name="search" {...props} />}
        value={query}
        onChangeText={setQuery}
      />
      { query !== undefined && (
        <Button
          accessoryLeft={(props) => <Icons.Filter {...props} fill={eva?.theme?.["color-primary-800"]} />}
          status="basic"
        />
      )}
    </View>
  )
})

export default TopBar;
