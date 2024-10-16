import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { Link, router } from 'expo-router';
import Checkboxs from '../components/CheckBox';
import User, { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { useEffect } from 'react';






const Index = () => {


  const InsideLayout = ()=>{
    return(
    
    router.push('/pages/home')
    
    )
  }
  
  const [user, setUser] = useState( User ? User:null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });  


  }, []);


  const [isPress, setPress] = useState(true);
  const handleCheckboxChange = () => {
    setPress(!isPress);
  };
  return (
   
    user ? InsideLayout() : 
   
   <>
  


    <SafeAreaView>
   <StatusBar style="auto" />
   </SafeAreaView>

      <LinearGradient colors={['#E95E60', '#FFD270']}>
        <Text
          style={{
            fontSize: 28,
            alignSelf: 'center',
            justifyContent: 'center',
            fontFamily: 'Bold',
            color: 'white',
            top: 50,
            height: 84,
            width: 350,
          }}
        >
          Bienvenido a Segurizate
        </Text>

        <Image
          source={require('../assets/imagenes/IconoLogin.png')}
          style={{ width: 350, height: 300, top: 20, alignSelf: 'center' }}
        />
       
      </LinearGradient>

      <Text
        style={{
          alignSelf: 'center',
          top: 20,
          fontSize: 15,
          color: 'gray',
          fontStyle: 'italic',
        }}
      >
        ¡Camina seguro junto a nuestra App!
        <FontAwesome style={{ backgroundColor: 'white' }} name="hand-spock-o" size={24} color="#FF7070" />
      </Text>

      <View style={styles.Buttons}>
        <Link asChild href="/pages/Login">
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Inicia sesión</Text>
          </TouchableOpacity>
        </Link>

      
        




        <View style={{position:'absolute'}}>

        </View>






        <Text
          style={{
            alignSelf: 'center',
            color: 'gray',
            fontStyle: 'italic',
            fontWeight: '400',
            textDecorationLine: 'underline',
            top: 15,
            marginBottom: 15,
            fontSize: 16,
          }}
        >
          o
        </Text>


      
        <View style={styles.iconContainer} >
          <TouchableOpacity >
            <FontAwesome
              style={{
                padding: 10,
                borderRadius: 100,
                paddingLeft: 15,
                paddingRight: 15,
                backgroundColor: '#1877F2',
              }}
              name="facebook"
              size={24}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialIcons
              style={{
                padding: 10,
                borderRadius: 100,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: '#FBD98C',
              }}
              name="email"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: 'center', flexDirection: 'row', paddingBottom: 15 }}>
          <Text style={{ color: 'gray', fontSize: 12, fontFamily: 'Regular' }}>¿No tienes cuenta? </Text>
          <Link href="/pages/Register">
            <Text style={{ color: '#FF7070', fontSize: 12, fontFamily: 'SemiBold' }}>Regístrate Acá</Text>
          </Link>
        </View>

        <View style={{ width: 250, height: 100, flexDirection: 'row', justifyContent: 'space-between', right: 50 }}>
           <Checkboxs
            label=" Declaro tener más de 13 años y acepto los Términos y condiciones, la Política de Privacidad y la Guía comunitaria."
            checked={isPress}
            onChange={handleCheckboxChange}
          /> 
        </View>
      </View>




    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7070',
  },
  Buttons: {
    top: 100,
    height: 150,
    width: 170,
    alignSelf: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#FF7070',
    padding: 10,
    borderRadius: 35,
    alignItems: 'center',
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 15,
    width: 150,
    padding: 2,
    marginLeft: 48,
    fontFamily: 'Regular',
  },
});

export default Index;
