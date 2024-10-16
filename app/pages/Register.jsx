import React, { useState } from "react";
import { ScrollView, Text, TextInput, View, StyleSheet, KeyboardAvoidingView, Alert } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'; 
import { doc, setDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const Auth = FIREBASE_AUTH;
    const Db = FIREBASE_DB;
    
    const validateForm = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;

        const phoneRegex = /^[0-9]{11}$/;
        const nameRegex = /^[a-zA-Z\s]+$/;
        const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
        const addressRegex = /^[a-zA-Z\s]{1,24}\s\d{1,4}$/;
        

        if (!name.trim() || name.length < 10 || !nameRegex.test(name)) {
            Alert.alert('Error', 'El nombre es requerido y debe contener solo letras.');
            return false;
        }
        if (!email.trim() || !emailRegex.test(email)) {
            Alert.alert('Error', 'El correo es requerido y debe tener un formato válido.');
            return false;
        }
        if (!phone.trim() || !phoneRegex.test(phone)) {
            Alert.alert('Error', 'Por favor ingresar su teléfono con +569.');
            return false;
        }
        if (!address.trim() || address.length< 5 || !addressRegex.test(address)) {
            Alert.alert('Error', 'Por favor ingresar una dirección válida.');
            return false;
        }
        if (password.length < 6 || !passwordRegex.test(password)) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        if (validateForm()) {
            try {
                const user = userCredential.user;
                await setDoc(doc(Db, 'users', user.uid), {
                    name: name,
                    email: email,
                    phone: phone,
                    address: address,
                    createdAt: new Date(),
                    estado: 'activo',
                    rol: 'usuario',
                });


                const userCredential = await createUserWithEmailAndPassword(Auth, email, password);
           

               

                Alert.alert(`Bienvenido ${name}`);
                router.push('/pages/home');
            } catch (error) {
                Alert.alert('Error en el registro', error.message);
            }
        }
    };

    return (
        <> 
         
                
              

      
                <View style={styles.container}>
                    
                <StatusBar style="auto" />

                <Link asChild href="#" style={{width:50, height:50, left:15}}>
                    <TouchableOpacity>
                        <FontAwesome style={styles.icon} name="angle-left" size={36} color="#FF7070" />
                    </TouchableOpacity>
                </Link>
            <KeyboardAvoidingView behavior="position" >
                <Text style={styles.title}>Información de contacto</Text>
                <Text style={styles.description}>
                
                   Su correo electrónico se utilizará exclusivamente para enviarle avisos de emergencia y su teléfono exclusivamente para llamadas de emergencia. Su información está segura con nosotros.
                </Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombre completo:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="John Doe"
                        onChangeText={setName}
                        value={name}
                        maxLength={50}
                        autoCapitalize="words"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Correo:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ejemplo@gmail.com"
                        onChangeText={setEmail}
                        value={email}
                        maxLength={50}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Teléfono:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="56990248573"
                        keyboardType="numeric"
                        onChangeText={setPhone}
                        value={phone}
                        maxLength={11}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Dirección:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Calle falsa 123"
                        onChangeText={setAddress}
                        value={address}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Contraseña:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
                    />
                </View>
                
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: '#FDFDFD',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    icon: {
        right: 170,
        top: 30,
    },
    title: {
        alignSelf: 'center',
        fontSize: 23,
        marginTop: 60,
        fontFamily: 'Bold',
        color: '#FF7070',
    },
    description: {
        fontSize: 13,
        color: 'gray',
        marginTop: 10,
        marginLeft: 15,
        width: 350,
        alignSelf: 'center',
        fontFamily: 'Regular',
    },
    inputContainer: {
        marginBottom: 15,
        left: 40,
        
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
        marginTop: 15,
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

export default Register;
