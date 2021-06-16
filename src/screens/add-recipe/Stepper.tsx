import React from 'react';
import { Text } from '@ui-kitten/components';
import { View } from 'react-native';

interface IStepperProps {
    currentStep: string;
    nextStep: string | undefined;
    index: number;
    length: number;
}

const Stepper = ({currentStep, nextStep, index, length}: IStepperProps) => (
    <View>
        <Text>{`${index+1}/${length}`}</Text>
        <Text>
            {currentStep}
        </Text>
        <Text>
            {nextStep?`Next: ${nextStep}`:undefined}
        </Text>
    </View>
);

export default Stepper;
