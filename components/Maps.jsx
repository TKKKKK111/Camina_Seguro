import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_DEFAULT, UrlTile, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const Maps = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: -33.51130400065515, // Valores predeterminados
    longitude: -70.75256730568786,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado');
        return;
      }
    })();
  }, []);

  const getLocation = async () => {
    try {
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.05, 
        longitudeDelta: 0.05,
      });
      setErrorMsg(null); // Si ya no hay error, resetea el mensaje de error
    } catch (error) {
      setErrorMsg('Error obteniendo la ubicación');
      console.error(error); // Log para depuración
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        provider={PROVIDER_DEFAULT}
      >
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
        />
        {location ? (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Tu ubicación"
            description="Ubicación actual"
          />
        ) : (
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="Ubicación predeterminada"
            description="Ubicación predeterminada"
          />
        )}
      </MapView>
      <TouchableOpacity style={styles.button} onPress={getLocation}>
        <Text style={styles.buttonText}>Mi ubicación</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '70%',
    backgroundColor: '#FFFFFF',
  },
  map: {
    alignSelf: 'center',
    width: '80%',
    height: '60%',
    marginTop: 4,
  },
  button: {
    position: 'absolute',
    top: 10,
    left: 15,
    right: 15,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Maps;
