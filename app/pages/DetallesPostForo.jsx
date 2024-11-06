import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import {  Heart, MessageCircle, Share2, Send } from 'lucide-react-native'
import { Link, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { arrayUnion, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

export default function DetallesPostForo() {
  
  const [newComment, setNewComment] = useState('')
  const [users, setUsers] = useState({});
  const [name, setName] = useState('');
  const [comentarios,setComentarios] = useState({});

  const post = useLocalSearchParams(); 
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const userrr = auth.currentUser;
const postDate= post.createdAt


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
      setUsers(userDoc.data()); // Guardar los datos en el estado
      setName(userDoc.data().name || '');
 
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




const options = {
  timeZone: 'America/Santiago', 
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true 
};
const formattedDate = (fecha)=> new Intl.DateTimeFormat('es-ES', options).format(fecha);

console.log(post)
console.log(userrr.uid)
console.log(users.uid)

const handleAddComment = async () => {
  const user = auth.currentUser;

  if (!user) {
    Alert.alert('Debes estar autenticado para agregar un comentario');
    return;
  }

  const commentContent = newComment;

  try {
    const postsRef = doc(db, "posts", post.id);
    await updateDoc(postsRef, {
      comments: arrayUnion({ // Usa arrayUnion para agregar sin sobrescribir
        content: commentContent,
        createdAt: new Date().toISOString(),
        postId: post.id,
        profilePicUrl: "",
        userId: user.uid,
        username: users.name 
      }),
    });

    // Limpiar el campo de comentario después de enviar
    setNewComment('');
    Alert.alert('El comentario ha sido agregado correctamente.');

    // Volver a obtener los comentarios actualizados
    await getComentariosDePost(post.id);

  } catch (error) {
    Alert.alert('Error al agregar el comentario', error.message);
  }
};



const getComentariosDePost = async (postId) => {
  if (!postId) {
    Alert.alert('Debes proporcionar un ID de post válido');
    return;
  }

  try {
    // Referencia a la colección de posts
    const postDocRef = doc(db, 'posts', postId);
    const postDoc = await getDoc(postDocRef); 

    if (postDoc.exists()) {
      const postData = postDoc.data();
      const comentarios = postData.comments || []; // Obtener los comentarios o inicializar como un array vacío

      // Filtrar los comentarios por el ID del post
      const comentariosDelPost = comentarios.filter(comment => comment.postId === postId);

      // Actualizar el estado o manejar los comentarios como sea necesario
      setComentarios(comentariosDelPost); // Asegúrate de que setComentarios esté definido en tu contexto

    } else {
      Alert.alert('No se encontró el post en la base de datos');
    }
  } catch (error) {
    Alert.alert('Error al obtener los comentarios del post', error.message);
  }
};


useEffect(() => {
  getComentariosDePost(post.id);
}, [post.id]);



  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
        <Link asChild href="/pages/Foro">
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </Link>
          <Text style={styles.headerTitle}>Foro comunitario</Text>
        </View>

        {/* Post Content */}
        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postDescription}>{post.content}</Text>
          
          {/* User Info and Interactions */}
          <View style={styles.userInfoContainer}>
            <View style={styles.userInfo}>
              <Image 
                source={{ uri: '/placeholder.svg' }}
                style={styles.avatar}
              />
              <Text style={styles.timestamp}>{formattedDate(postDate)}</Text>
            </View>
            
            <View style={styles.interactions}>
              <TouchableOpacity style={styles.interactionButton}>
                <Heart size={18} color="#666" />
                <Text style={styles.interactionCount}>{post.likes}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.interactionButton}>
                <MessageCircle size={18} color="#666" />
                <Text style={styles.interactionCount}>2</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.interactionButton}>
                <Share2 size={18} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>Comentarios</Text>
            
            {comentarios.length > 0 ? ( // Comprueba si hay comentarios
              comentarios.map((comment, index) => (
                <View key={index} style={styles.comment}>
                  <Image 
                    source={{ uri: comment.profilePicUrl || '/placeholder.svg' }} // Usar la URL del perfil o un placeholder
                    style={styles.commentAvatar}
                  />
                  <View style={styles.commentContent}>
                    <Text style={styles.commentAuthor}>{comment.username}</Text>
                    <Text style={styles.commentText}>{comment.content}</Text>
                    <Text style={styles.commentTimestamp}>{comment.createdAt}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text>No hay comentarios todavía.</Text> // Mensaje cuando no hay comentarios
            )}
          </View>

      
      </ScrollView>

      {/* Add Comment Input */}
      <View style={styles.addCommentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Agregar un comentario..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity onPress={handleAddComment} style={styles.sendButton}>
          <Send size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
 
    backgroundColor: '#fff',
  },
  scrollView: {

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ff4444',
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  postDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  interactions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  interactionCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  commentsSection: {
    padding: 16,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#666',
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  sendButton: {
    padding: 8,
  },
})