import React, { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';

const PreventBackButton = () => {
  
  useEffect(() => {
    // Función que manejará el evento del botón "back"
    const backAction = () => {
      Alert.alert(
        "Cerrar sesión", // Título del cuadro de diálogo
        "¿Deseas cerrar sesión?", // Mensaje
        [
          {
            text: "Cancelar", // Botón para cancelar la acción
            onPress: () => null, // No hacer nada
            style: "cancel"
          },
          { 
            text: "Sí", 
            onPress: () => {
              // Aquí puedes añadir la lógica para cerrar sesión si el usuario elige "Sí"
              console.log('Sesión cerrada'); 
              // Cerrar la app o redirigir
              BackHandler.exitApp();
            }
          }
        ]
      );
      return true; // Previene la acción predeterminada del botón "back"
    };

    // Añade el listener para el botón "back"
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Limpieza: quita el listener cuando el componente se desmonte
    return () => backHandler.remove();
  }, []);

  return null; // No se requiere renderizar nada
};

export default PreventBackButton;
