import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import {  Heart, MessageCircle, Share2, Send } from 'lucide-react-native'
import { Link, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { arrayUnion, collection, doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';

export default function DetallesPostForo() {
  
  const [newComment, setNewComment] = useState('');
  const [users, setUsers] = useState({});
  const [name, setName] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el envío del comentario

  const post = useLocalSearchParams(); 
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const userrr = auth.currentUser;
  const postDate = post.createdAt; 

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

  const formattedDate = (postDate) => {
    try {
      
      const timestamp = Number(postDate);
      if (isNaN(timestamp)) {
        throw new Error('El timestamp no es válido.');
      }
  
     
      const date = new Date(timestamp);
  
      const options = {
        timeZone: 'America/Santiago',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
  

      return new Intl.DateTimeFormat('es-CL', options).format(date);
    } catch (error) {
      console.error('Error al formatear la fecha:', error.message);
      return 'Fecha no válida';
    }
  };

  const formattedDateComment = (createdAt) => {
    try {
      // Aseguramos que createdAt es un Timestamp de Firebase
      const date = createdAt instanceof Timestamp ? createdAt.toDate() : new Date(createdAt);
      const options = {
        timeZone: 'America/Santiago',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      return new Intl.DateTimeFormat('es-CL', options).format(date);
    } catch (error) {
      console.error('Error al formatear la fecha del comentario:', error.message);
      return 'Fecha no válida';
    }
  };

  const handleAddComment = async () => {
    if (isSubmitting) return; // Evita enviar el comentario si ya está siendo procesado

    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Debes estar autenticado para agregar un comentario');
      return;
    }

    const commentContent = newComment;
    setIsSubmitting(true); // Marca como en proceso el envío

    try {
      const postsRef = doc(db, "posts", post.id);
      await updateDoc(postsRef, {
        comments: arrayUnion({ // Usa arrayUnion para agregar sin sobrescribir
          content: commentContent,
          createdAt: Timestamp.now(),
          postId: post.id,
          profilePicUrl: "",
          userId: user.uid,
          username: users.name || name // Asegúrate de usar el nombre del usuario
        }),
      });

      // Limpiar el campo de comentario después de enviar
      setNewComment('');
      Alert.alert('El comentario ha sido agregado correctamente.');

      // Volver a obtener los comentarios actualizados
      await getComentariosDePost(post.id);

    } catch (error) {
      Alert.alert('Error al agregar el comentario', error.message);
    } finally {
      setIsSubmitting(false); // Termina el proceso de envío
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Link asChild href="/pages/Foro">
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>Foro comunitario</Text>
      </View>

      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postDescription}>{post.content}</Text>
      
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
        
        {comentarios.length > 0 ? ( 
          comentarios.map((comment, index) => (
            <View key={index} style={styles.comment}>
              <Image 
                source={{ uri: comment.profilePicUrl || '/placeholder.svg' }} 
                style={styles.commentAvatar}
              />
              <View style={styles.commentContent}>
                <Text style={styles.commentAuthor}>{comment.username}</Text>
                <Text style={styles.commentText}>{comment.content}</Text>
                <Text style={styles.commentTimestamp}>{formattedDateComment(comment.createdAt)}</Text> 
              </View>
            </View>
          ))
        ) : (
          <Text>No hay comentarios todavía.</Text> 
        )}
      </View>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 30,
    backgroundColor: '#fff',
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
    marginTop:10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  interactions: {
    flexDirection: 'row',
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
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
    
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 12,
   
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
    fontWeight: '600',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    marginBottom: 4,
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#999',
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
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
    bottom:15,
  },
  sendButton: {
    bottom:15,
    padding: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 50,
  },
});
