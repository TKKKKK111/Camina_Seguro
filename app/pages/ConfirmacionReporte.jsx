import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ConfirmacionReporte() {
  

  const handleReturn = () => {
    router.push('/pages/home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu reporte se ha realizado con éxito</Text>
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark" size={60} color="#4CAF50" />
      </View>
      <Text style={styles.description}>
        Puede acceder a su perfil para visualizar y seleccionar la opción de modificar o agregar información relevante.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleReturn}>
        <Text style={styles.buttonText}>Volver al Inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 50,
    padding: 20,
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});