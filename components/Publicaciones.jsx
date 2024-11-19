import { Image, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const Publicacion = () => {
  return (
    <>


        <View style={styles.container} >


            <Text>Noticias</Text>

            <View style={styles.noticia} >
              <View style={styles.titulo}>
         
              <Text style={{fontFamily:'Bold', fontSize:25, color:'#4682B4', alignSelf:'flex-start', left:40}}>Acoso Callejero</Text>
              </View>
              <Text style={{color:'gray', fontFamily:'Bold', alignSelf:'flex-start'}}>Esquina Blanca, Maipú</Text>
              <Text style={{fontFamily:'Regular', alignSelf:'center', height:'auto', width:340, textAlign:'center'}}>Presencie un acto de acoso frente al Duoc!!!</Text>
              <Image style={{width:350,height:280, borderRadius:10}}
              source={require('../assets/imagenes/duoc-image.webp')} />

            </View>

        </View>

      
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        height:500,
        width: 500,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        flexDirection: 'column',
    },
    icon: {
      alignSelf: 'flex-start',
      left: 30,
      top:25,
    },
    noticia:{
      marginTop:50,
      height:300,
      width:300,
      alignItems:'center',
      
    },
    titulo:{
  justifyContent:'flex-start', 

    width:400, 
      flexDirection:'row',
    }
    });

export default Publicacion;