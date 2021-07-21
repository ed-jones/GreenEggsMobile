import React from "react";
import { Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icons } from "@greeneggs/core";
import { StackNavigationProp } from "@react-navigation/stack";

const Diets = ({ navigation }: { navigation: StackNavigationProp<any> }) => {

    const insets = useSafeAreaInsets();

    const navigateBack = () => {
        navigation.goBack();
    };

    return (
        <>
            <TopNavigation
                title="Dietary Preferences"
                alignment="center"
                style={{ backgroundColor: "transparent", marginTop: insets.top }}
                accessoryLeft={() => (
                    <TopNavigationAction icon={Icons.Back} onPress={navigateBack} />
                )}
            />
        </>
    );
};

export default Diets;
