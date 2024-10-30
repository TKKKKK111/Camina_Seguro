import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link, useLocalSearchParams } from 'expo-router';
import ComentarioPost from '../../components/ComentarioPost';

export default DetallesPostForo = () => {
  const post = useLocalSearchParams(); 
  console.log(post.userId);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Link asChild href="/pages/Foro">
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>Foro comunitario</Text>
      </View>
      <ScrollView>
        <View style={styles.postContainer}>
          <Text style={styles.postUsername}>{post.username}</Text>
          <Text style={styles.postTitle}>{post.title ? post.title : 'Sin título'}</Text>
          <Text style={styles.postContent}>{post.content}</Text>
          <View style={styles.postFooter}>
            <Image
              source={{ uri: post.avatar || 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.postAvatar}
            />
           
            <Text style={styles.postTime}>"15:30"</Text>
            <View style={styles.postStats}>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="heart" size={16} color="red" />
                <Text style={styles.iconText}>{post.likes || 0}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="chatbubble-outline" size={16} color="#b2b2b2" />
                <Text style={styles.iconText}>{post.commentsCount || 0}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="share-outline" size={16} color="#b2b2b2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos...

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
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 16,
    color: '#4a4a4a',
    marginBottom: 16,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  postUsername: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginRight: 8,
  },
  postTime: {
    fontSize: 12,
    color: '#b2b2b2',
    marginRight: 8,
  },
  postUsername: {
    fontSize: 12,
    color: 'black',
    alignSelf: 'center',
  },
  postStats: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  iconText: {
    fontSize: 12,
    color: '#b2b2b2',
    marginLeft: 4,
  },
});
