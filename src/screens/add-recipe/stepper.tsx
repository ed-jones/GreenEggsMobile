import React from "react";
import { Text, ThemedComponentProps, withStyles } from "@ui-kitten/components";
import { View, StyleSheet } from "react-native";
import ProgressCircle from "react-native-progress-circle";

interface IStepperProps {
  currentStep: string;
  nextStep: string | undefined;
  index: number;
  length: number;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    textAlign: "right",
    marginBottom: 4,
  },
});

export const Stepper = withStyles(
  ({
    currentStep,
    nextStep,
    index,
    length,
    eva,
  }: IStepperProps & ThemedComponentProps) => (
    <View style={styles.row}>
      <ProgressCircle
        percent={(100 * (index + 1)) / length}
        radius={32}
        color={eva?.theme && eva.theme["color-primary-500"]}
        shadowColor={eva?.theme && eva.theme["color-success-500"]}
        borderWidth={5}
        bgColor={eva?.theme && eva.theme["color-basic-300"]}
      >
        <Text category="label">{`${index + 1} OF ${length}`}</Text>
      </ProgressCircle>
      <View>
        <Text style={styles.text} category="h6">
          {currentStep}
        </Text>
        <Text style={styles.text}>
          {nextStep ? `Next: ${nextStep}` : undefined}
        </Text>
      </View>
    </View>
  )
);
