import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator'; 
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { setDoc, doc, getDoc, query, collection, where, getDocs, limit } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';

const DetalleReporte = () => {
  const { reporte } = useLocalSearchParams();
  
  const [show, setShow] = useState(true);
  const [comentario, setComentario] = useState('');
  const [location, setLocation] = useState(null);
  const [image, setImage] = useState(null);
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const storage = getStorage();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso para acceder a la localización fue denegado');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // Función para manipular la imagen (redimensionar y comprimir)
  const manipulateImage = async (uri) => {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }], 
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } 
    );
    return manipulatedImage.uri;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1, 
    });

    if (!result.canceled) {
  
      const optimizedUri = await manipulateImage(result.assets[0].uri);
      setImage(optimizedUri); 
    }
  };

  const handleReportar = async () => {
    try {
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
        Alert.alert('Ya tienes un reporte pendiente.');
        return;
      }

      const userName = userDoc.data().name || 'Usuario sin nombre';
      const geo = location ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      } : {
        latitude: 'no disponible',
        longitude: 'no disponible',
      };

      const reportId = user.uid + '_' + new Date().toISOString();
    

      // Subir la imagen a Firebase Storage
      let imageUrl = null;
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob(); 

        const storageRef = ref(storage, `reportes/${user.uid}.webp`);
        await uploadBytes(storageRef, blob);

        imageUrl = await getDownloadURL(storageRef);
      }

      // Guardar reporte en Firestore
      await setDoc(doc(db, 'reporte', reportId), {
        uid: user.uid,
        name: userName,
        geolocalizacion: geo,
        tipoReporte: { reporte },
        comentario: { comentario },
        imageUrl: imageUrl,
        createdAt: new Date(),
        estado: 'abierto',
        resolvedAt: null,
      });

      router.push('/pages/ConfirmacionReporte');
    } catch (error) {
      console.log(error);
      Alert.alert('Error al enviar reporte: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Link asChild href="/pages/SeleccionReporte">
        <TouchableOpacity>
          <FontAwesome style={styles.icon} name="angle-left" size={36} color="#FF7070" />
        </TouchableOpacity>
      </Link>

      {show ? (
        <View>
          <Text style={styles.title}>Reportar {reporte}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Deseas confirmar tu reporte de {reporte}</Text>
        </View>
      )}

      <View style={{ flexDirection: 'column', marginTop: 50 }}>
        <Text style={{ marginBottom: 20, fontSize: 16, fontFamily: 'SemiBold', color: "#24547C" }}>
          ¡Tu reporte ayudará a tu comuna!
        </Text>

        <TextInput
          editable
          multiline
          placeholder='Escribe aquí tu reporte'
          style={styles.textInput}
          numberOfLines={5}
          maxLength={200}
          onChangeText={setComentario}
          value={comentario}
        />

        <Text style={{ fontSize: 12, fontFamily: 'Bold', color: "gray", textDecorationLine: "underline" }}>
          Este reporte será enviado con tu locación actual
        </Text>
        <Text style={{ fontSize: 11, fontFamily: 'Bold', color: "gray", alignSelf: "center" }}>
          (Máximo 200 caracteres)
        </Text>
      </View>

      {image && <Image source={{ uri: image }} style={{ width: 50, height: 50, marginBottom: 10 }} />}

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Tomar Foto</Text>
      </TouchableOpacity>

      {show ? (
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => setShow(false)}>
            <Text style={styles.buttonText}>REPORTAR</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttonCancelar} onPress={() => setShow(true)}>
            <Text style={styles.buttonText}>CANCELAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleReportar}>
            <Text style={styles.buttonText}>CONFIRMAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: '#FDFDFD',
    alignItems: 'center',
    flexDirection: 'column',
  },
  icon: {
    right: 190,
    top: 50,
  },
  title: {
    alignSelf: 'center',
    fontSize: 28,
    marginTop: 60,
    fontFamily: 'Bold',
    color: '#FF7070',
  },
  textInput: {
    padding: 10,
    width: 300,
    height: 200,
    backgroundColor: '#D6E4F0',
    textAlignVertical: 'top',
    borderRadius: 15,
  },
  buttons: {
    marginTop: 15,
    height: 50,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  button: {
    width: 190,
    backgroundColor: '#FF7070',
    padding: 10,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonCancelar: {
    width: 190,
    backgroundColor: '#BDD9F1',
    padding: 10,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Bold',
  },
});

export default DetalleReporte;
