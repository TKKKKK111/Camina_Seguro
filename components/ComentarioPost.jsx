import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image,View,Text } from "react-native";


export default Comentario = ({ avatar, username, time, content, likes, comments }) => (
    <View style={styles.commentContainer}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <Text style={styles.username}>{username} • <Text style={styles.time}>{time}</Text></Text>
        <Text style={styles.commentText}>{content}</Text>
        <View style={styles.commentFooter}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={16} color="#b2b2b2" />
            <Text style={styles.iconText}>{likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chatbubble-outline" size={16} color="#b2b2b2" />
            <Text style={styles.iconText}>{comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );


  const styles = StyleSheet.create({
   
    commentsSection: {
      padding: 16,
    },
    commentContainer: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    commentContent: {
        flex: 1,
    },
    username: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#4a4a4a',
      marginBottom: 4,
    },
    time: {
      fontWeight: 'normal',
      color: '#b2b2b2',
    },
    commentText: {
      fontSize: 14,
      color: '#4a4a4a',
      marginBottom: 8,
    },
    commentFooter: {
      flexDirection: 'row',
    },
  });