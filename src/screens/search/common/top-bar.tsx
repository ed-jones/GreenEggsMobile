/**
 * Author: Victor Ying
 */
import React, { useContext } from "react";
import {
  Button,
  Icon,
  ThemedComponentProps,
  TopNavigationAction,
  withStyles,
} from "@ui-kitten/components";
import { Input, Icons } from '@greeneggs/ui';
import { StyleSheet, View, Image } from "react-native";

import { SearchContext } from "@greeneggs/providers";
import { useNavigation } from "@react-navigation/native";
import { logo } from '@greeneggs/assets';

import { countActiveFilters } from "../recipe-search-filter";
import { CountCircle } from "./count-circle";

const styles = StyleSheet.create({
  topNavigation: {
    backgroundColor: "transparent",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
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

export const TopBar = withStyles(({ eva }: ThemedComponentProps) => {
  const navigation = useNavigation();
  const { searchState, setSearchState } = useContext(SearchContext);
  const setQuery = (query: string | undefined) =>
    setSearchState?.({ ...searchState, query });

  return (
    <View style={styles.topNavigation}>
      {searchState.query === undefined ? (
        <Image source={logo} style={styles.logo} />
      ) : (
        <TopNavigationAction
          icon={Icons.Back}
          onPress={() => setQuery(undefined)}
        />
      )}
      <Input
        placeholder="Search recipes or users..."
        size="large"
        style={styles.search}
        accessoryLeft={(props) => (
          <Icon style={styles.icon} name="search" {...props} />
        )}
        value={searchState.query}
        onChangeText={setQuery}
      />
      {searchState.query !== undefined && (
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          {countActiveFilters(searchState) > 0 && (
            <CountCircle
              style={{ position: "absolute", zIndex: 1, marginTop: -6 }}
            >
              {countActiveFilters(searchState)}
            </CountCircle>
          )}
          <Button
            style={{ width: 50 }}
            accessoryLeft={(props) => (
              <Icons.Filter
                {...props}
                fill={eva?.theme?.["color-primary-800"]}
              />
            )}
            status="basic"
            onPress={() => navigation.navigate("RecipeSearchFilter")}
          />
        </View>
      )}
    </View>
  );
});
