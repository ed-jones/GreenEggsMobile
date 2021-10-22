/**
 * Author: Edward Jones
 */
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import {
  Icon,
  IconProps,
  Text,
  TextElement,
  ThemedComponentProps,
  withStyles,
} from "@ui-kitten/components";

type AlertType = "danger" | "warning" | "info" | "success";

interface IAlert {
  type: AlertType;
  message: React.ReactText | TextElement;
  style?: StyleProp<ViewStyle>;
}

/**
 * Displays an important message that should stand out from the rest of the view.
 */
export const Callout = withStyles(
  ({ type, message, eva, style }: IAlert & ThemedComponentProps) => {
    const IconNameFromAlertType: Record<AlertType, IconProps> = {
      danger: {
        name: "alert-triangle",
        fill: eva?.theme?.["color-danger-500"],
      },
      warning: {
        name: "alert-triangle",
        fill: eva?.theme?.["color-warning-500"],
      },
      info: {
        name: "info",
        fill: eva?.theme?.["color-info-500"],
      },
      success: {
        name: "checkmark-circle-2",
        fill: eva?.theme?.["color-success-500"],
      },
    };

    return (
      <View
        style={Object.assign(
          {
            flexDirection: "row",
            alignItems: "flex-start",
            paddingVertical: 24,
            paddingRight: 16,
          },
          style
        )}
      >
        <Icon
          style={{ width: 48, height: 48, marginRight: 10 }}
          {...IconNameFromAlertType[type]}
        />
        <View style={{ justifyContent: "center", minHeight: 48, flexShrink: 1 }}>
          <Text>{message}</Text>
        </View>
      </View>
    );
  }
);
