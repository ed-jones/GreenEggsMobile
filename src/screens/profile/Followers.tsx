import React, { Key, useContext, useState } from "react";
import {
  List,
  Text,
  TopNavigation,
  TopNavigationAction,
  ListItem,
  Icon,
  Divider,
  withStyles,
  ThemedComponentProps,
  Input,
  Layout,
} from "@ui-kitten/components";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { Icons } from "@greeneggs/core";
import Svg, { Circle } from "react-native-svg";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "@greeneggs/core/auth-context/AuthContext";
import LazyList from "@greeneggs/core/lazy-list";

const styles = StyleSheet.create({
  found: {
    padding: 16,
  },
  search: {
    backgroundColor: "white",
    margin: 16,
  },
  view: {
    height: "100%",
  },
});

interface ListItemProps {
  title: string;
  icon?: string;
  color?: string;
  onPress?: () => void;
  key: Key;
}

interface IFollowersListItem {
  item: ListItemProps;
}

const FollowersItem = ({ onPress, title, color, icon, key }: ListItemProps) => (
  <>
    <ListItem
      key={key}
      onPress={onPress}
      title={title}
      accessoryLeft={(props) => (
        <>
          <Svg
            height="32"
            width="32"
            style={{ position: "absolute", marginLeft: 12 }}
          >
            <Circle cx="16" cy="16" r="16" fill={color} />
          </Svg>
          <Icon {...props} name={icon} fill="white" />
        </>
      )}
    />

    <Divider />
  </>
);

const Followers = withStyles(
  ({
    navigation,
    eva,
  }: { navigation: StackNavigationProp<any> } & ThemedComponentProps) => {
    const insets = useSafeAreaInsets();
    const { setToken } = useContext(AuthContext);

    const Colors = {
      green: eva?.theme && eva.theme["color-primary-400"],
    };

    const navigateBack = () => {
      navigation.navigate("Home");
    };

    const FollowersList: ListItemProps[] = [
      {
        title: "Gi-Hun",
        icon: "person-outline",
        color: Colors.green,
        onPress: () => navigation.navigate("Profile"),
        key: "gihun",
      },
      {
        title: "Victor Ying",
        icon: "person-outline",
        color: Colors.green,
        onPress: () => navigation.navigate("Profile"),
        key: "vying",
      },
      {
        title: "Ed Jones",
        icon: "person-outline",
        color: Colors.green,
        onPress: () => navigation.navigate("Profile"),
        key: "edjones",
      },
      {
        title: "Sang-Woo",
        icon: "person-outline",
        color: Colors.green,
        onPress: () => navigation.navigate("Profile"),
        key: "sangwoo",
      },
      {
        title: "Nick Brewer",
        icon: "person-outline",
        color: Colors.green,
        onPress: () => navigation.navigate("Profile"),
        key: "nickb",
      },
    ];

    const [myFollowersQuery, setMyFollowersQuery] = useState("");

    return (
      <Layout level="2" style={{ ...styles.view }}>
        <TopNavigation
          title="Followers"
          alignment="center"
          style={{ backgroundColor: "transparent", marginTop: insets.top }}
          accessoryLeft={() => (
            <TopNavigationAction icon={Icons.Back} onPress={navigateBack} />
          )}
        />
        <Input
          placeholder="Search users"
          size="medium"
          style={styles.search}
          accessoryLeft={Icons.Search}
          value={myFollowersQuery}
          onChangeText={(newText) => setMyFollowersQuery(newText)}
        />
        <ScrollView>
          {FollowersList.map(FollowersItem)}
          <Text category="c5" style={styles.found}>
            Found 5 results
          </Text>
        </ScrollView>
      </Layout>
    );
  }
);

export default Followers;
