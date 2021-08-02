import React from "react";
import { Icon, List, ListItem, Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icons } from "@greeneggs/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Svg, { Circle } from "react-native-svg";

const styles = StyleSheet.create({
    header: { padding: 16 },
    input: {
        marginTop: -25,
        marginBottom: -20,
        backgroundColor: '#f5f5f5',
        height: 40,
        borderColor: '#f5f5f5',
        color: '#191970',
        fontSize: 13,
        fontWeight: 'bold',
        borderWidth: 1
    },
    button: {
        marginTop: 40,
        color: '#FFFFFF',
        width: 170,
        height: 70,
        fontWeight: 'bold',
        padding: 16,
        backgroundColor: '#20b2aa',
    },
});

interface ListItemProps {
    title: string;
    icon: string;
    rightText?: string;
    color?: string;
}

interface DAccountsListItem {
    item: ListItemProps;
}

const DelAccountsListItem = ({ item }: DAccountsListItem) => (
    <>
        <ListItem
            style={{ padding: 16, backgroundColor: "transparent" }}
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
                    <Icon {...props} name={item.icon} fill="red" />
                </>
            )}
        />
    </>
);

const DeleteAccount = ({ navigation }: { navigation: StackNavigationProp<any> }) => {

    const insets = useSafeAreaInsets();

    const Delete: ListItemProps[] = [
        {
            title: "If you delete your account you will lose all recipes and all other personal data. This action cannot be undone. Are you sure?",
            icon: "alert-triangle-outline",
            color: '#ffffff',
        },
    ];

    const navigateBack = () => {
        navigation.goBack();
    };

    return (
        <>
            <TopNavigation
                title="Delete Account"
                alignment="center"
                style={{ backgroundColor: "transparent", marginTop: insets.top }}
                accessoryLeft={() => (
                    <TopNavigationAction icon={Icons.Back} onPress={navigateBack} />
                )}
            />
            <ScrollView>
                <View>
                    <List data={Delete} renderItem={DelAccountsListItem} />
                </View>
                <Text category="s1" style={{ padding: 16, color: '#20b2aa', fontSize: 12 }}>
                    CONFIRM PASSWORD
                </Text>
                <View style={styles.header}>
                    <TextInput style={styles.input}
                        secureTextEntry={true}
                    />
                </View>
            </ScrollView>
        </>
    );
};

export default DeleteAccount;
