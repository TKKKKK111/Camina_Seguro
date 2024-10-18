import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';

const SeleccionReporte = () => {
  return (
    <>
      <SafeAreaView>
        <StatusBar style="auto" />
      </SafeAreaView>

      <Link asChild href="/pages/home">
      <TouchableOpacity>
        <FontAwesome style={styles.icon} name="angle-left" size={36} color="#FF7070" />
      </TouchableOpacity>
      </Link>

      <Text style={styles.title}>Información de contacto</Text>
      <View style={styles.containerBotones}>
        
        <Link href={{ pathname: '/pages/DetalleReporte', params: { reporte: 'Acoso Callejero' } }}>
          <View style={styles.boton}>
         
            <FontAwesome name="user" size={36} color="#831E52" />
            <Text style={styles.texto}>Acoso Callejero</Text>
          </View>
          </Link>
    

        <Link href={{ pathname: '/pages/DetalleReporte', params: { reporte: 'Acoso Escolar' } }}>
          <View style={styles.boton}>
            <FontAwesome name="user" size={36} color="#831E52" />
            <Text style={styles.texto}>Acoso Escolar</Text>
          </View>
        </Link>

        <Link href={{ pathname: '/pages/DetalleReporte', params: { reporte: 'Emergencia de Seguridad' } }}>
          <View style={styles.boton}>
            <FontAwesome name="user" size={36} color="#831E52" />
            <Text style={styles.texto}>Emergencia de Seguridad</Text>
          </View>
        </Link>

        <Link href={{ pathname: '/pages/DetalleReporte', params: { reporte: 'Acoso Laboral' } }}>
          <View style={styles.boton}>
            <FontAwesome name="user" size={36} color="#831E52" />
            <Text style={styles.texto}>Acoso Laboral</Text>
          </View>
        </Link>

        <Link href={{ pathname: '/pages/DetalleReporte', params: { reporte: 'Acoso en el Hogar' } }}>
          <View style={styles.boton}>
            <FontAwesome name="user" size={36} color="#831E52" />
            <Text style={styles.texto}>Acoso en el Hogar</Text>
          </View>
        </Link>

        <Link href={{ pathname: '/pages/DetalleReporte', params: { reporte: 'Acoso Transporte Privado' } }}>
          <View style={styles.boton}>
            <FontAwesome name="user" size={36} color="#831E52" />
            <Text style={styles.texto}>Acoso Transporte Privado</Text>
          </View>
        </Link>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerBotones: {
    width: 400,
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    height: 200,
    bottom:30,
    left:40
  },
  icon: {
    marginTop: 50,
    marginLeft: 20,
    justifyContent: 'flex-start',
  },
  title: {
    bottom: 50,
    alignSelf: 'center',
    fontSize: 27,
    marginTop: 120,
    fontFamily: 'Bold',
    color: '#FF7070',
  },
  boton: {
    backgroundColor: '#D6E4F0',
    padding: 10,
    borderRadius: 90,
    alignItems: 'center',
    width: 260,
  },
  texto: {
    color: '#831E52',
    fontSize: 14,
    fontFamily: 'SemiBold',
    textAlign: 'center',
  },
});

export default SeleccionReporte;
