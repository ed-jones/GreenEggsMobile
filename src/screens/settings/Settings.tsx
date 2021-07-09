import React from 'react';
import { Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { View } from 'react-native';
import { Icons } from '@greeneggs/core';





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
        </View>
    )

});

export default Settings;