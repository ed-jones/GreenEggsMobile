import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import {
  Button,
  Card,
  Divider,
  ListItem,
  Menu,
  MenuItem,
  Modal,
  Text,
} from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import { ReactNativeFile } from "apollo-upload-client";
import { v4 as uuidv4 } from "uuid";
import { ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Icons from "../icons/Icons";

interface IImageUpload {
  label?: string;
  uri?: string;
  onChange: (...event: any[]) => void;
}

const ImageUpload = ({ label, uri, onChange }: IImageUpload) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  type ImageSource = "gallery" | "camera";

  const pickImage = async (
    source: ImageSource,
    onChange: (...event: any[]) => void
  ) => {
    cancelModal();

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
      onChange(
        new ReactNativeFile({
          uri: result.uri,
          name: `${uuidv4()}.jpg`,
          type: `${result.type}`,
        })
      );
    }
  };

  const cancelModal = () => {
    setModalVisible(false);
  };

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
      {label ? (
        <Text category="label" appearance="hint" style={{ marginBottom: 6 }}>
          {label}
        </Text>
      ) : undefined}
      <View
        style={{
          width: "100%",
          aspectRatio: 1 / 1,
          borderWidth: 2,
          borderRadius: 4,
          borderStyle: "dashed",
          borderColor: "#8F9BB3",
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
              fill="#8F9BB3"
            />
            <Text appearance="hint">Upload an image</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default ImageUpload;
