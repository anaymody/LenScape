import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from '../components/Button';

export default function CameraScreen({navigation}) {
  const [hasCameraPermissions, setHasCameraPermissions] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status === "granted");
    })();
  }, [])

  const takePicture = async () => {
    if(cameraRef){
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch(e) {
        console.log(e)
      }
    }
  }

  const savePicture = async () =>{
    if(image){
      try {
        await MediaLibrary.createAssetAsync(image)
        alert("Picture saved! 🎉")
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
        <Button title={'take a picture'} icon="camera" onPress={takePicture}/>
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
  }
});
