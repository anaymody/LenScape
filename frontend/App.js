import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import Button from './src/components/Button';
import axios from 'axios'

export default function App() {
  const [hasCameraPermissions, setHasCameraPermissions] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);

  let location = ""

  const sendImage = async (uri) => {
    console.log("image has been taken")
    let base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    console.log("image ready to send")
    axios.post('http://10.20.0.123:3030/getImageLoc', {
      image: base64,
    })
    .then(response => {
      console.log('Image uploaded successfully:', response.data);
      location = `Location detected: ${response.data.message}`
    })
    .catch(error => {
      console.error('Error uploading image:', error);
      location = "Unknown location detected"
    });
  };

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status === "granted");
    })();
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
      sendImage(result.assets[0].uri)
    }
  };

  const takePicture = async () => {
    if(cameraRef){
      try {
        const data = await cameraRef.current.takePictureAsync({
          base64: true
        });

        setImage(data.uri);
        sendImage(data.uri);
      } catch(e) {
        console.log(e)
      }
    }
  }


  const savePicture = async () =>{
    if(image){
      try {
        await MediaLibrary.createAssetAsync(image)
        if(location != null){
          alert(`${location} found!! 🎉🎉`)
        } else {
          alert("Location not found! 😭😭")
        }
        setImage(null)
      } catch(e){
        console.log(e)
      }
    }
  }

  if(hasCameraPermissions === false){
    return (
      <Text>No access to camera</Text>
    );
  }

  return (
    <View style={styles.container}> 
      {!image ? 
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
      >
      </Camera>
      :
      <Image source={{uri: image}} style={styles.camera}/>
      }
      <View>
        {image ?
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 50
        }}>
          <Button title={'Retake'} icon="retweet" onPress={() => setImage(null)}/>
          <Button title={'Save'} icon="check" onPress={savePicture}/> 
        </View>
        :
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 50
        }}>
        <Button title={'take a picture'} icon="camera" onPress={takePicture}/>
        <Button title={'upload picture'} icon="image" onPress={pickImage}/>
        </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingBottom: 8
  },
  camera: {
    flex: 1,
    borderRadius: 20
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    resizeMode: 'contain',
  },
});
