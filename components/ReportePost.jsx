import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ReportePost = ({ reporte }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reportar {reporte}</Text>
      
      {/* Aquí se pueden agregar más detalles como la descripción, imágenes, etc. */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ReportePost;
