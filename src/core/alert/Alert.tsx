import React from "react";
import { View } from "react-native";
import {
  Icon,
  IconProps,
  Text,
  ThemedComponentProps,
  withStyles,
} from "@ui-kitten/components";

type AlertType = "danger" | "warning" | "info" | "success";

interface IAlert {
  type: AlertType;
  message: string;
}

const Alert = withStyles(
  ({ type, message, eva }: IAlert & ThemedComponentProps) => {
    const IconNameFromAlertType: Record<AlertType, IconProps> = {
      danger: {
        name: "alert-triangle",
        fill: eva?.theme && eva.theme["color-danger-500"],
      },
      warning: {
        name: "alert-triangle",
        fill: eva?.theme && eva.theme["color-warning-500"],
      },
      info: {
        name: "alert-circle",
        fill: eva?.theme && eva.theme["color-info-500"],
      },
      success: {
        name: "checkmark-circle-2",
        fill: eva?.theme && eva.theme["color-success-500"],
      },
    };

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 16,
          paddingRight: 64,
        }}
      >
        <Icon
          style={{ width: 48, height: 48, marginRight: 10 }}
          {...IconNameFromAlertType[type]}
        />
        <Text>{message}</Text>
      </View>
    );
  }
);

export default Alert;
