import React, { useEffect, useState } from "react";
import { 
  ScrollView, 
  Text, 
  TextInput, 
  View, 
  StyleSheet, 
  KeyboardAvoidingView, 
  ActivityIndicator, 
  Alert, 
  Keyboard, 
  TouchableWithoutFeedback 
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router"; 
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            router.push('/pages/home');
          } else {
            Alert.alert('Error', 'No se encontraron datos del usuario.');
          }
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
        }
      }
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  const signIn = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userName = userData.name;

       
        router.push('/pages/home');
      } else {
        Alert.alert('No se encontraron datos del usuario en la base de datos.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
        </SafeAreaView>
        <Link asChild href="#">
          <TouchableOpacity style={{width:20, height:50}}>
            <FontAwesome style={styles.icon} name="angle-left" size={40} color="#FF7070" />
          </TouchableOpacity>
        </Link>

        <Text style={styles.title}>Ingresa tus credenciales</Text>

        <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Correo:</Text>
            <TextInput
              style={styles.input}
              placeholder="ejemplo@gmail.com"
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={password}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={signIn}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Continuar</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
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
    right: 160,
    top: 50,
  },
  title: {
    alignSelf: 'center',
    fontSize: 23,
    marginTop: 120,
    fontFamily: 'Bold',
    color: '#FF7070',
  },
  inputContainer: {
    marginBottom: 20,
    width: '80%',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 14,
    color: 'gray',
    fontFamily: 'SemiBold',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderColor: 'gray',
    borderRadius: 15,
  },
  buttons: {
    marginTop: 30,
    height: 100,
    width: 250,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#FF7070',
    padding: 10,
    borderRadius: 35,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'SemiBold',
  },
});

export default Login;
