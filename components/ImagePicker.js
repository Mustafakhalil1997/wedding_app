import React, { useEffect, useState } from "react";
import { View, Button, Text, Image, StyleSheet, Alert } from "react-native";

import * as ImagePicker from "expo-image-picker";
import Colors from "../constants/Colors";
import { InitializeFirebase } from "./../InitializeFirebase";
import { getDatabase, ref, set } from "firebase/database";

InitializeFirebase();

const ImgPicker = ({ invitee, image }) => {
  const [imageUri, setImageUri] = useState(image);

  console.log("image is ", image);
  const { id, name, checkIn, isPriority } = invitee;

  console.log("image here");
  if (imageUri) {
    console.log("image loaded");
    const db = getDatabase();
    set(ref(db, "invitees/" + id), {
      checkin: true,
      ispriority: isPriority,
      name: name,
      image: imageUri,
    });
  }

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

    // console.log("result ", result);

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.imagePicker}>
      <Button
        title={imageUri ? "RETAKE IMAGE" : "TAKE IMAGE"}
        color={Colors.primaryColor}
        onPress={takeImageHandler}
      />
      <View style={styles.imagePreview}>
        {!imageUri && <Text>No image picked yet.</Text>}
        {imageUri && <Image style={styles.image} source={{ uri: imageUri }} />}
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
