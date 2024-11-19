import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

import { setDoc, doc, getDoc, query, collection, where, getDocs, limit } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const BotonSOS = () => {
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  useEffect(() => {
    (async () => {
      try {
        setLoadingLocation(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permiso para acceder a la localización fue denegado');
          setLoadingLocation(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        console.error("Error obteniendo la localización:", error);
        setErrorMsg('Error al obtener la localización');
      } finally {
        setLoadingLocation(false);
      }
    })();
  }, []);

  const handleReportar = async () => {
    try {
      if (!location) {
        Alert.alert('Error', errorMsg || 'Cargando información de ubicación...');
        return;
      }

      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Debes estar autenticado para reportar');
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        Alert.alert('No se encontró el usuario en la base de datos');
        return;
      }

      const reportePendienteQuery = query(
        collection(db, 'reporte'),
        where('uid', '==', user.uid),
        where('estado', 'in', ['abierto', 'pendiente']),
        where('resolvedAt', '==', null),
        limit(1)
      );
      const reportePendiente = await getDocs(reportePendienteQuery);

      if (!reportePendiente.empty) {
        Alert.alert('Ya tienes un reporte pendiente. Debes esperar a que se resuelva antes de crear otro.');
        return;
      }

      const userName = userDoc.data().name || 'Usuario sin nombre';
      const geo = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      const reportId = user.uid + '_' + new Date().toISOString();

      await setDoc(doc(db, 'reporte', reportId), {
        uid: user.uid,
        name: userName,
        geolocalizacion: geo,
        tipoReporte: { reporte: 'SOS' },
        comentario: { comentario: 'Reporte generado por urgencia' },
        createdAt: new Date(),
        estado: 'abierto',
        resolvedAt: null,
      });

      Alert.alert('Reporte enviado con éxito');
    } catch (error) {
      console.log(error);
      Alert.alert('Error al enviar reporte: ' + error.message);
    }
  };

  return (
    <View>
      {loadingLocation ? (
        <ActivityIndicator size="large" color="#FF7070" />
      ) : (
        <TouchableOpacity onPress={handleReportar}>
          <Text style={{ marginTop: 10 }}>
            <FontAwesome name="warning" size={39} color="white" />
          </Text>
        </TouchableOpacity>
      )}
      {errorMsg && <Text style={{ color: 'red', marginTop: 10 }}>{errorMsg}</Text>}
    </View>
  );
};

export default BotonSOS;
