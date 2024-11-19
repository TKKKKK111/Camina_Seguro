import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, BackHandler, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import SideBars from '../../components/SideBar';
import Maps from '../../components/Maps';
import Publicacion from '../../components/Publicaciones';
import BotonSOS from '../../components/BotonSOS';
import LoadingAnimation from '../../components/Loading';

const Home = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [loading, setLoading] = useState(true); 

  const blockBackButton = () => {
    BackHandler.exitApp();
    return true;
  }

  BackHandler.addEventListener('hardwareBackPress', blockBackButton);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 500); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          <SafeAreaView>
            <StatusBar style="auto" />
          </SafeAreaView>

          <SafeAreaView>
            <View style={{ zIndex: 3 }}>
              <TouchableOpacity style={styles.menuButton} onPress={() => setIsSidebarVisible(true)}>
                <Text>
                  <FontAwesome name="bars" size={35} color="#FF7070" />
                </Text>
              </TouchableOpacity>

              <SideBars
                isVisible={isSidebarVisible}
                onClose={() => setIsSidebarVisible(false)}
              />
              {isSidebarVisible ? null : (
                <TouchableOpacity style={styles.alertButton}>
                  <BotonSOS />
                </TouchableOpacity>
              )}
            </View>
          </SafeAreaView>
          
          <View style={styles.container}>
            <Publicacion />
            <View style={styles.map}>
              <Maps />
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    alignItems: 'center',
    flexDirection: 'column',
  },
  map: {
    width: 800,
    height: 'auto',
  },
  button: {
    width: 100,
    height: 50,
    padding: 10,
    backgroundColor: '#FF7070',
  },
  menuButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    alignSelf: 'flex-end',
    top: 80,
    padding: 10,
    backgroundColor: 'white',
  },
  alertButton: {
    width: 60,
    height: 70,
    alignItems: 'center',
    alignSelf: 'flex-end',
    top: 200,
    position: 'absolute',
    backgroundColor: 'red',
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
  },
  buttonText: {
    color: 'white',
  },
});

export default Home;
