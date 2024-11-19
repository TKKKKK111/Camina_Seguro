import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import Checkboxs from '../components/CheckBox';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';

const Index = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isPress, setPress] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  useEffect(() => {
    if (user) {
      router.push('/pages/home');
    }
  }, [user, router]);

  const handleCheckboxChange = () => {
    setPress(!isPress);
  };

  return (
    <>
      <SafeAreaView>
        <StatusBar style="auto" />
      </SafeAreaView>

      <LinearGradient colors={['#E95E60', '#FFD270']}>
        <Text style={styles.welcomeText}>Bienvenido a           Camina Seguro</Text>

        <Image
          source={require('../assets/imagenes/IconoLogin.png')}
          style={styles.logo}
        />
      </LinearGradient>

      <Text style={styles.infoText}>
        ¡Camina seguro junto a nuestra App!
        <FontAwesome style={{ backgroundColor: 'white' }} name="hand-spock-o" size={24} color="#FF7070" />
      </Text>

      <View style={styles.Buttons}>
        <Link asChild href="/pages/Login">
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Inicia sesión</Text>
          </TouchableOpacity>
        </Link>

        <Text style={styles.orText}>o</Text>

        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <FontAwesome
              style={styles.icon}
              name="facebook"
              size={24}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialIcons
              style={styles.icon}
              name="email"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿No tienes cuenta? </Text>
          <Link href="/pages/Register">
            <Text style={styles.registerLink}>Regístrate Acá</Text>
          </Link>
        </View>

   
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 28,
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: 'Bold',
    color: 'white',
    top: 50,
    height: 84,
    width: 350,
  },
  logo: {
    width: 350,
    height: 300,
    top: 20,
    alignSelf: 'center',
  },
  infoText: {
    alignSelf: 'center',
    top: 20,
    fontSize: 15,
    color: 'gray',
    fontStyle: 'italic',
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
  orText: {
    alignSelf: 'center',
    color: 'gray',
    fontStyle: 'italic',
    fontWeight: '400',
    textDecorationLine: 'underline',
    top: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  registerContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 15,
  },
  registerText: {
    color: 'gray',
    fontSize: 12,
    fontFamily: 'Regular',
  },
  registerLink: {
    color: '#FF7070',
    fontSize: 12,
    fontFamily: 'SemiBold',
  },
  icon: {
    padding: 10,
    borderRadius: 100,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#1877F2',
  },
});

export default Index;
