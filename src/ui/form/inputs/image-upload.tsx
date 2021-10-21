/**
 * Author: Edward Jones
 */
import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import {
  Menu,
  MenuItem,
  Modal,
  Text,
  ThemedComponentProps,
  withStyles,
} from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import { ReactNativeFile } from "apollo-upload-client";
import { ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  DeepMap,
  DeepPartial,
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UnionLike,
} from "react-hook-form";
import { Icons } from '@greeneggs/ui';

interface IImageUpload {
  label?: string;
  uri?: string;
  onChange: (...event: any[]) => void;
  error?:
    | DeepMap<
        DeepPartial<UnionLike<PathValue<FieldValues, Path<FieldValues>>>>,
        FieldError
      >
    | undefined;
}

export const ImageUpload = withStyles(
  ({
    label,
    uri,
    onChange,
    error,
    eva,
  }: IImageUpload & ThemedComponentProps) => {
    const [modalVisible, setModalVisible] = React.useState(false);

    type ImageSource = "gallery" | "camera";

    const pickImage = async (
      source: ImageSource,
      onChange: (...event: any[]) => void
    ) => {
      cancelModal();

      if (Platform.OS !== "web") {
        if (source === "camera") {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
          }
        }

        if (source === "gallery") {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert(
              "Sorry, we need media library permissions to make this work!"
            );
          }
        }
      }

      const result = await (source === "camera"
        ? ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
          })
        : ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
          }));

      if (!result.cancelled) {
        const newFile = {
          uri: result.uri,
          name: `${result.uri.substr(result.uri.lastIndexOf("/") + 1)}`,
          type: "image/jpeg",
        };
        onChange(new ReactNativeFile(newFile));
      }
    };

    const cancelModal = () => {
      setModalVisible(false);
    };

    const TextColor = error
      ? eva?.theme?.["color-danger-500"]
      : eva?.theme?.["color-basic-600"];

    return (
      <View style={{ marginBottom: 16 }}>
        <Modal
          visible={modalVisible}
          onBackdropPress={cancelModal}
          backdropStyle={{ backgroundColor: "rgba(0, 0, 0,0.4)" }}
        >
          <View style={{ width: 132 }}>
            <Menu>
              <MenuItem
                title="CAMERA"
                accessoryLeft={Icons.Camera}
                onPress={() => pickImage("camera", onChange)}
              />
              <MenuItem
                title="GALLERY"
                accessoryLeft={Icons.Image}
                onPress={() => pickImage("gallery", onChange)}
              />
              <MenuItem
                title="CANCEL"
                accessoryLeft={Icons.Cross}
                onPress={cancelModal}
              />
            </Menu>
          </View>
        </Modal>
        {label && (
          <Text category="label" appearance="hint" style={{ marginBottom: 6 }}>
            {label}
          </Text>
        )}
        <View
          style={{
            width: "100%",
            aspectRatio: 1 / 1,
            borderWidth: 2,
            borderRadius: 4,
            borderStyle: "dashed",
            borderColor: TextColor,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {uri ? (
            <View
              style={{
                alignItems: "center",
                padding: 4,
                justifyContent: "center",
              }}
            >
              <ImageBackground
                source={{ uri }}
                style={{
                  width: "100%",
                  aspectRatio: 1 / 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LinearGradient
                  colors={["rgba(255, 255, 255,0)", "rgba(0, 0, 0,0.2)"]}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    height: "100%",
                  }}
                />
                <Icons.Cross
                  style={{
                    margin: 0,
                    width: 64,
                    height: 64,
                  }}
                  fill="white"
                  onPress={() => onChange(undefined)}
                />
              </ImageBackground>
            </View>
          ) : (
            <>
              <Icons.Camera
                onPress={() => setModalVisible(true)}
                style={{
                  width: 64,
                  height: 64,
                }}
                fill={eva?.theme && eva.theme["color-basic-600"]}
              />
              <Text appearance="hint">Upload an image</Text>
            </>
          )}
        </View>
        <Text
          category="c1"
          style={{
            marginTop: 6,
            color: TextColor,
          }}
        >
          {error?.message}
        </Text>
      </View>
    );
  }
);
