import React from "react";
import {
    Icon,
    List,
    ListItem,
    Text,
    TopNavigation,
    TopNavigationAction,
} from "@ui-kitten/components";
import { Icons } from "@greeneggs/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
    bio: {
        marginTop: -25,
        marginBottom: -20,
        backgroundColor: '#f5f5f5',
        height: 70,
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
    profilePic: {
        height: 70,


    },
});

interface ListItemProps {
}

interface EProfileListItem {
    item: ListItemProps;
}

const EditProfileListItem = ({ item }: EProfileListItem) => (
    <>
        <ListItem
        />
    </>
);

const EditProfile = ({ navigation }: { navigation: StackNavigationProp<any> }) => {

    const insets = useSafeAreaInsets();

    const EditProfileItems: ListItemProps[] = [
        {
        },
    ];

    const navigateBack = () => {
        navigation.goBack();
    };

    return (
        <>
            <TopNavigation
                title="Edit Profile"
                alignment="center"
                style={{ backgroundColor: "transparent", marginTop: insets.top }}
                accessoryLeft={() => (
                    <TopNavigationAction icon={Icons.Back} onPress={navigateBack} />
                )}
            />
            <ScrollView>
                <Text category="h6" style={styles.header}>
                    Profile Picture
                </Text>
                <View style={styles.profilePic}>

                </View>
                <Text category="h6" style={{ padding: 16, marginBottom: -20 }}>
                    Profile Details
                </Text>
                <Text category="s1" style={{ padding: 16, color: '#20b2aa', fontSize: 12 }}>
                    FIRST NAME
                </Text>
                <View style={styles.header}>
                    <TextInput style={styles.input}
                    />
                </View>
                <Text category="s1" style={{ padding: 16, color: '#20b2aa', fontSize: 12 }}>
                    LAST NAME
                </Text>
                <View style={styles.header}>
                    <TextInput style={styles.input}
                    />
                </View>
                <Text category="s1" style={{ padding: 16, color: '#20b2aa', fontSize: 12 }}>
                    BIO
                </Text>
                <View style={styles.header}>
                    <TextInput style={styles.bio}
                        multiline={true}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        color='#FFFFFF'
                        onPress={() => {
                            alert('You tapped the button!');
                        }}
                        title="Save Changes"
                    />
                </View>
            </ScrollView>
        </>
    );
};

export default EditProfile;
