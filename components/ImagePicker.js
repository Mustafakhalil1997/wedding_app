import React, { useEffect, useState } from "react";
import { View, Button, Text, Image, StyleSheet, Alert } from "react-native";

import * as ImagePicker from "expo-image-picker";
import Colors from "../constants/Colors";

const ImgPicker = (props) => {
  //   const verifyPermissions = async () => {
  //     const result = await Permissions.askAsync(Permissions.CAMERA);
  //     if (result.status !== "granted") {
  //       Alert.alert(
  //         "Insufficient permissions!",
  //         "You need to grand camera permissions to use this app.",
  //         [{ text: "Okay" }]
  //       );
  //       return false;
  //     }
  //     return true;
  //   };

  const [image, setImage] = useState();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          //   await ImagePicker.requestMediaLibraryPermissionsAsync(); // request to access gallery
          await ImagePicker.requestCameraPermissionsAsync();

        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const takeImageHandler = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // default value
      allowsEditing: true,
      quality: 0.5,
    });
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    console.log("result ", result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.imagePicker}>
      <Button
        title="Take Image"
        color={Colors.primaryColor}
        onPress={takeImageHandler}
      />
      <View style={styles.imagePreview}>
        {!image && <Text>No image picked yet.</Text>}
        {image && <Image style={styles.image} source={{ uri: image }} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
  },
  imagePreview: {
    width: "80%",
    height: 200,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
