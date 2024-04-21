import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';

// Ensure that HomeScreen receives navigation and route props
const HomeScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Button
        title="Go to Camera"
        onPress={() => navigation.navigate('Camera')}
      />
      <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

