import React from "react";
import { View } from "react-native";
import { Icon, IconProps, Text } from "@ui-kitten/components";

type AlertType = "danger" | "warning" | "info" | "success";

interface IAlert {
  type: AlertType;
  message: string;
}

const IconNameFromAlertType: Record<AlertType, IconProps> = {
  danger: { name: "alert-triangle", fill: "#DB4A23" },
  warning: { name: "alert-triangle", fill: "#FFD323" },
  info: { name: "alert-circle", fill: "#04AAF7" },
  success: { name: "checkmark-circle-2", fill: "#10C485" },
};

const Alert = ({ type, message }: IAlert) => (
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

export default Alert;
