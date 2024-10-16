import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const BotonReportes = ({ titulo, onPress }) => {
  return (
    <TouchableOpacity style={styles.boton} onPress={onPress}>
    <FontAwesome style={{}} name="user" size={36} color="#831E52" />
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#D6E4F0',
    padding: 10,
    borderRadius: 90,
    alignItems: 'center',
    width:260

    },
  texto: {
    color: '#831E52',
        fontSize: 14,
        fontFamily: 'SemiBold',
        width:300,
        textAlign: 'center',
        
  }
});

export default BotonReportes;
