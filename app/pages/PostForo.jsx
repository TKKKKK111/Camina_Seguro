import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';  
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';

export default function PostForo() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState({});
  const db = FIREBASE_DB
  const auth= FIREBASE_AUTH
 
  const usuarioActualid = FIREBASE_AUTH.currentUser;

  const validateInputs = () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'El título es obligatorio.');
      return false;
    }
    if (content.trim() === '') {
      Alert.alert('Error', 'El contenido es obligatorio.');
      return false;
    }
    return true;
  };


// Función para obtener los datos del usuario
const getUsuarioActual = async () => {
  const user = auth.currentUser;

  if (!user) {
    Alert.alert('Debes estar autenticado para ver tus datos');
    return;
  }

  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef); 

    if (userDoc.exists()) {
      setUsers(userDoc.data()); 


     
    } else {
      Alert.alert('No se encontró el usuario en la base de datos');
    }
  } catch (error) {
    Alert.alert('Error al obtener los datos del usuario', error.message);
  }
};

useEffect(() => {
  getUsuarioActual();
}, []);


 
  const handleCreatePost = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const postId = Date.now().toString();
      const newPost = {
        postId,
        title,
        content,
        userId: usuarioActualid.uid,  
        username: users.name,  
        profilePicUrl: 'https://example.com/images/profile.jpg',  
        createdAt: Timestamp.now().toDate(),  
        likes: 0,
        comments: [],  
      };

  
      await setDoc(doc(db, 'posts', postId), newPost);

      Alert.alert('Éxito', 'Tu post ha sido creado con éxito.');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error("Error al crear el post: ", error);
      Alert.alert('Error', 'Hubo un problema al crear el post. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Link asChild href="/pages/Foro">
            <TouchableOpacity>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          </Link>
          <Text style={styles.headerTitle}>Foro comunitario</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="¿A alguien le ha servido llamar a es..."
          />
          <Text style={styles.label}>Contenido</Text>
          <TextInput
            style={[styles.input, styles.contentInput]}
            value={content} 
            onChangeText={setContent}
            placeholder="Hola a todos, he intentado llamar muchas veces al número de este centro de atención de maipú y no me han contestado, ¿seguirá aún vigente?, el número es +569XXXXXXX"
            multiline
          />
        </View>
      </ScrollView>
      
      <TouchableOpacity
        style={styles.publishButton}
        onPress={handleCreatePost}  
        disabled={loading}  
      >
        <Text style={styles.publishButtonText}>{loading ? 'Publicando...' : 'Publicar'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff4757',
    marginLeft: 16,
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  contentInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  publishButton: {
    backgroundColor: '#ff4757',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    borderRadius: 8,
  },
  publishButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

