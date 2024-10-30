import { Image, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { Ionicons } from '@expo/vector-icons';

export default PostForo = ({ avatar, title, description, time, likes, comments,username }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>{title}</Text>
        <Text style={styles.postDescription}>{description}</Text>
        <View style={styles.postFooter}>
          <Text style={styles.postTime}>{time}</Text>
          <Text style={styles.postTime}>{username}</Text>
          <View style={styles.postStats}>
            <Ionicons name="heart" size={16} color="red" />
            <Text style={styles.statText}>{likes}</Text>
            <Ionicons name="chatbubble-outline" size={16} color="gray" style={styles.commentIcon} />
            <Text style={styles.statText}>{comments}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    
    postList: {
     backgroundColor: 'white',
    },
    postContainer: {
      flexDirection: 'row',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
    },
    postContent: {
      width: '80%',
    },
    postTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#4a4a4a',
      marginBottom: 4,
    },
    postDescription: {
      fontSize: 14,
      color: '#7a7a7a',
      marginBottom: 8,
    },
    postFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    postTime: {
      fontSize: 12,
      color: '#b2b2b2',
    },
    postStats: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statText: {
      fontSize: 12,
      color: '#b2b2b2',
      marginLeft: 4,
      marginRight: 8,
    },
    commentIcon: {
      marginLeft: 5,
    },
  });