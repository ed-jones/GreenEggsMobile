import React from "react";
import { Divider, Icon, List, ListItem, Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icons } from "@greeneggs/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView, StyleSheet, Switch } from "react-native";
import Svg, { Circle } from "react-native-svg";



interface ListItemProps {
    title: string;
    icon: string;
    rightText?: string;
    color?: string;
}

interface CAccountsListItem {
    item: ListItemProps;
}

const ConnAccountsListItem = ({ item }: CAccountsListItem) => (
    <>
        <ListItem
            title={item.title}
            accessoryRight={(props) => (
                <>
                    <Text category="c2">{item.rightText}</Text>
                </>
            )}
            accessoryLeft={(props) => (
                <>
                    <Svg
                        height="32"
                        width="32"
                        style={{ position: "absolute", marginLeft: 12 }}
                    >
                        <Circle cx="16" cy="16" r="16" fill={item.color} />
                    </Svg>
                    <Icon {...props} name={item.icon} fill="white" />
                </>
            )}
        />
        <Divider />
    </>
);

const ConnectAccounts = ({ navigation }: { navigation: StackNavigationProp<any> }) => {

    const insets = useSafeAreaInsets();

    const Connect: ListItemProps[] = [
        {
            title: "Facebook",
            icon: "facebook-outline",
            color: '#4169e1',
        },
        {
            title: "Google",
            icon: "google-outline",
            color: '#ff0000',
        },
        {
            title: "Twitter",
            icon: "twitter-outline",
            color: '#87ceeb',
        },
    ];

    const navigateBack = () => {
        navigation.goBack();
    };


    return (
        <>
            <TopNavigation
                title="Connect Accounts"
                alignment="center"
                style={{ backgroundColor: "transparent", marginTop: insets.top }}
                accessoryLeft={() => (
                    <TopNavigationAction icon={Icons.Back} onPress={navigateBack} />
                )}
            />
            <ScrollView>
                <List data={Connect} renderItem={ConnAccountsListItem} />
            </ScrollView>
        </>
    );
};

export default ConnectAccounts;
