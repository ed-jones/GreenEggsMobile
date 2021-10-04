import React, { useContext } from 'react';
import { Button, Icon, Input, ThemedComponentProps, TopNavigationAction, withStyles } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';

import logo512 from '../logo/logo512.png';
import * as Icons from '../icons/Icons';
import { useNavigation } from '@react-navigation/core';
import { SearchContext } from '@greeneggs/providers/SearchStateProvider';

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

const TopBar = withStyles(({ eva }: ThemedComponentProps) => {
  const navigation = useNavigation();
  const {searchState, setSearchState} = useContext(SearchContext)
  const setQuery = (query: string | undefined) => setSearchState?.({...searchState, query})

  return (
    <View style={styles.topNavigation}>
      { searchState.query === undefined ? (
        <Image source={logo512} style={styles.logo} />
      ) : (
        <TopNavigationAction icon={Icons.Back} onPress={() => setQuery(undefined)}/>
      ) }
      <Input
        placeholder="Search Recipe"
        size="large"
        style={styles.search}
        accessoryLeft={(props) => <Icon style={styles.icon} name="search" {...props} />}
        value={searchState.query}
        onChangeText={setQuery}
      />
      { searchState.query !== undefined && (
        <Button
          accessoryLeft={(props) => <Icons.Filter {...props} fill={eva?.theme?.["color-primary-800"]} />}
          status="basic"
          onPress={() => navigation.navigate("RecipeSearchFilter")}
        />
      )}
    </View>
  )
})

export default TopBar;
