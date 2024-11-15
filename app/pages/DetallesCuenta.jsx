import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Platform, StatusBar, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateEmail, updatePassword } from 'firebase/auth';

const DetallesCuenta = () => {
  const [users, setUsers] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');


  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const validateForm = () => {
    const phoneRegex = /^[0-9]{11}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const addressRegex = /^[a-zA-Z\s]{1,60}\s\d{1,4}$/;

    if (!name.trim() || name.length < 10 || !nameRegex.test(name)) {
      Alert.alert('Error', 'El nombre es requerido y debe contener solo letras.');
      return false;
    }
   
    if (!phone.trim() || !phoneRegex.test(phone)) {
      Alert.alert('Error', 'El teléfono es requerido y debe contener exactamente 11 dígitos numéricos.');
      return false;
    }
    if (!address.trim() || address.length < 5 || !addressRegex.test(address)) {
      Alert.alert('Error', 'Por favor, ingresar una dirección válida.');
      return false;
    }
  
    return true;
  };

  // Función para obtener los datos del usuario
  const getUsuarioActual = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Debes estar autenticado para ver tus datos');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', user.uid); // Referencia al documento del usuario en Firestore
      const userDoc = await getDoc(userDocRef); // Obtener los datos del usuario

      if (userDoc.exists()) {
        setUsers(userDoc.data()); // Guardar los datos en el estado
        setName(userDoc.data().name || '');
        setPhone(userDoc.data().phone || '');
        setAddress(userDoc.data().address || '');
      } else {
        Alert.alert('No se encontró el usuario en la base de datos');
      }
    } catch (error) {
      Alert.alert('Error al obtener los datos del usuario', error.message);
    }
  };

  useEffect(() => {
    getUsuarioActual();
  }, []);

  // Función para actualizar los datos del usuario
  const handleUpdate = async () => {
    if (!validateForm()) {
      return;
    }
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Debes estar autenticado para actualizar tus datos');
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);

    try {
     
      // Actualizar los datos en Firestore
      await updateDoc(userDocRef, {
        name: name.trim() === '' ? users.name : name,
        phone: phone.trim() === '' ? users.phone : phone,
        address: address.trim() === '' ? users.address : address
      });

      Alert.alert('Tus datos han sido actualizados correctamente');
    } catch (error) {
      Alert.alert('Error al actualizar los datos', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior="position">
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Link asChild href={"/pages/home"}>
              <TouchableOpacity>
                <Ionicons name="chevron-back" size={24} color="#007AFF" />
              </TouchableOpacity>
            </Link>
            <Text style={styles.headerTitle}>Cuenta</Text>
          </View>

          <View style={styles.profileSection}>
            <Image style={styles.profileImage} />
            <TouchableOpacity>
              <Text style={styles.changePhotoText}>Cambiar foto de perfil</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>CONFIGURACIÓN DE LA CUENTA</Text>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Nombre</Text>
            <TextInput
              style={styles.inputValue}
              placeholder={users.name || 'Nombre'}
              value={name}
              onChangeText={setName}
            />
          </View>


          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Número telefónico</Text>
            <TextInput
              style={styles.inputValue}
              placeholder={users.phone || 'Teléfono'}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Dirección</Text>
            <TextInput
              style={styles.inputValue}
              placeholder={users.address || 'Dirección'}
              value={address}
              onChangeText={setAddress}
            />
          </View>

      

          <TouchableOpacity style={styles.saveChanges} onPress={handleUpdate}>
            <Text style={styles.saveChangesText}>Guardar cambios</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Estilos
  safeArea: {
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E1E1E1',
  },
  changePhotoText: {
    color: '#007AFF',
    fontSize: 17,
    marginTop: 8,
  },
  inputSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  inputLabel: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 4,
  },
  inputValue: {
    fontSize: 17,
    color: '#000000',
  },
  saveChanges: {
    backgroundColor: '#007AFF',
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
  },
  saveChangesText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 13,
    color: '#8E8E93',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
});

export default DetallesCuenta;
