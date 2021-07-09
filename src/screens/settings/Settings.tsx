import React from 'react';
import { List, Text, TopNavigation, TopNavigationAction, ListItem, Icon } from '@ui-kitten/components';
import { View } from 'react-native';
import { Icons } from '@greeneggs/core';
import Svg, { Circle } from 'react-native-svg';

interface IAccountSettingListItem {
    title: string
    icon: string
    color: string
}

const Colors = {
    blue: '#0284D4',
    yellow: '#DBB019',
    green: '#10C485',
    red: '#DB4A23'
}

const AccountSettings: IAccountSettingListItem[] = [
    { title: 'Edit Profile', icon: 'edit-outline', color: Colors.blue },
    { title: 'Change Password', icon: 'lock-outline', color: Colors.yellow },
    { title: 'Connect Accounts', icon: 'link-2-outline', color: Colors.green },
    { title: 'Sign Out', icon: 'log-out-outline', color: Colors.yellow },
    { title: 'Delete Account', icon: 'trash-2-outline', color: Colors.red }
];

interface ISettingListItem {
    item: IAccountSettingListItem
}


const SettingsListItem = ({ item }: ISettingListItem) => (
    <ListItem title={item.title} accessoryRight={Icons.Forward} accessoryLeft={(props) => (
        <>
            <Svg height="32" width="32" style={{ position: 'absolute', marginLeft: 12 }} >
                <Circle cx="16" cy="16" r="16" fill={item.color} />
            </Svg>
            <Icon {...props} name={item.icon} styles={{ width: 32, height: 32 }} fill='#FFFFFF' />
        </>
    )} />


)

const Settings = (({ navigation }: any) => {
    const navigateBack = (() => {
        navigation.navigate(
            'Home'
        )
    });
    return (
        <View>
            <TopNavigation title='Settings' alignment='center' accessoryLeft={(() => (
                <TopNavigationAction icon={Icons.Back} onPress={navigateBack} />
            ))} />
            <List data={AccountSettings} renderItem={SettingsListItem} />


        </View>
    )

});

export default Settings;