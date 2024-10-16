import { Link, router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { Alert } from 'react-native';

const { width } = Dimensions.get('window');




export default function SideBars({ isVisible, onClose } ) {
  if (!isVisible) return null;

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      Alert.alert('Sesión cerrada correctamente');
      router.replace('#'); // Redirigir a la pantalla de login o inicio
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
       
          <Link asChild href="/pages/SeleccionReporte">
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Reportar</Text>
          </TouchableOpacity>
          </Link>

          <Link asChild href="/pages/DetallesCuenta">
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Perfil</Text>
          </TouchableOpacity>
          </Link>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Foro</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Denuncias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Noticias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.menuItemText}>Cerrar sesión</Text>
          </TouchableOpacity>
      
         <TouchableOpacity style={styles.closeButton} onPress={onClose}>
         <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    width: width * 1.0,
    
    height: '100%',
    backgroundColor: '#F1B1B4',
    padding: 20,
    paddingTop: 40,
  },
  closeButton: {
   alignItems: 'center', 
    alignSelf: 'center',
    top: 150,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#A38385',
    
  
  },
  closeButtonText: {
    fontSize: 35,
    fontFamily: 'Bold',
    color: '#fff',
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  menuItemText: {
    fontSize: 20,
    color: '#333',
    alignSelf:'center',
    fontFamily: 'SemiBold',
  },
});