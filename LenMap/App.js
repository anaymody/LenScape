import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';



export const MARKERS_DATA = [
  {
    id: '1',
    latitude: 41.9022,
    longitude: 12.4539,
    color: '#2F3136',
    name: 'St. Peter\'s Basilica',
    //direction: 'Carrer de Pujades, 100',
    
  },
  {
    id: '2',
    latitude: 41.8902,
    longitude: 12.4922,
    color: '#A3EAD8',
    name: 'Colosseum',
   // direction: 'Carrer de Pujades, 101',
  },
  {
    id: '3',
    latitude: 41.8986,
    longitude: 12.4769,
    color: '#E990BB',
    name: 'Pantheon',
    //direction: 'Carrer de Pujades, 102',
  },
  {
    id: '4',
    latitude: 41.9009,
    longitude: 12.4833,
    color: '#EFD080',
    name: 'Trevi Fountain',
    //direction: 'Carrer de Pujades, 103',
    
  },
  {
    id: '5',
    latitude: 41.9029,
    longitude: 12.4534,
    color: '#98AFE9',
    name: 'Vatican City',
    //direction: 'Carrer de Pujades, 104',
  },
];

const averageLatitude = MARKERS_DATA.reduce((sum, marker) => sum + marker.latitude, 0) / MARKERS_DATA.length;
const averageLongitude = MARKERS_DATA.reduce((sum, marker) => sum + marker.longitude, 0) / MARKERS_DATA.length;


export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton={true}
        showsBuildings
        scrollEnabled
        initialRegion={{
          latitude: averageLatitude,
          longitude: averageLongitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        
      >
        {MARKERS_DATA.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.name}
            //description={marker.direction}
      
          />
        ))}
      </MapView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});



