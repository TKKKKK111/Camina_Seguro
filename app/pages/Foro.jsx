import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function Foro() {
  const [posts, setPosts] = useState([]);
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const getPostActual = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Debes estar autenticado para ver los posts');
      return;
    }

    try {
      const postsCollectionRef = collection(db, 'posts');
      const postsSnapshot = await getDocs(postsCollectionRef);

      const postsData = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(postsData);
    } catch (error) {
      Alert.alert('Error al obtener los posts', error.message);
    }
  };

  useEffect(() => {
    getPostActual();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Link asChild href="/pages/home">
          <TouchableOpacity>
            <FontAwesome style={styles.icon} name="angle-left" size={36} color="#FF7070" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>Foro comunitario</Text>
        <Link asChild href="/pages/PostForo">
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </Link>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Recientes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, styles.filterButtonInactive]}>
          <Text style={styles.filterButtonTextInactive}>Relevantes</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.postList}>
      {posts.map((post) => (
  <TouchableOpacity key={post.id}>
    <Link href={{ pathname: '/pages/DetallesPostForo', params: post }}>
      <View style={styles.postContainer}>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
        <View style={styles.postContent}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postDescription}>{post.content}</Text>
          <View style={styles.postFooter}>
            <Text style={styles.postTime}>"15:30"</Text>
            <Text style={styles.postTime}>{post.username}</Text>
            <View style={styles.postStats}>
              <Ionicons name="heart" size={16} color="red" />
              <Text style={styles.statText}>{post.likes}</Text>
              <Ionicons name="chatbubble-outline" size={16} color="gray" style={styles.commentIcon} />
              <Text style={styles.statText}>{post.commentsCount}</Text>
            </View>
          </View>
        </View>
      </View>
    </Link>
  </TouchableOpacity>
))}
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff4757',
  },
  addButton: {
    backgroundColor: '#ff4757',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginTop: 50,
    marginLeft: 20,
    justifyContent: 'flex-start',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#ff4757',
    marginRight: 10,
  },
  filterButtonInactive: {
    backgroundColor: 'transparent',
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  filterButtonTextInactive: {
    color: 'gray',
  },
  postList: {
    backgroundColor: 'white',
  },
  postContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postContent: {
    flex: 1,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postDescription: {
    color: 'gray',
    marginVertical: 5,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  postTime: {
    color: 'gray',
    fontSize: 12,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
  },
  commentIcon: {
    marginLeft: 10,
  },
});
