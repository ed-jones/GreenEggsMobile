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
import { ScrollView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: { padding: 16 },
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
                style={{ backgroundColor: "transparent" }}
                accessoryLeft={() => (
                    <TopNavigationAction icon={Icons.Back} onPress={navigateBack} />
                )}
            />
            <ScrollView>
                <Text category="h6" style={styles.header}>
                    Profile Picture
                </Text>
                <Text category="h6" style={styles.header}>
                    Profile Details
                </Text>
            </ScrollView>

        </>
    );
};

export default EditProfile;
