import { Image, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const Publicacion = () => {
  return (
    <>


        <View style={styles.container} >


            <Text>Noticias</Text>

            <View style={styles.noticia} >
              <View style={styles.titulo}>
              <FontAwesome style={{marginRight:30}} name="user" size={36} color="#FF7070" />
              <Text style={{fontFamily:'Bold', fontSize:25, color:'#4682B4', alignSelf:'flex-start'}}>Acoso Callejero</Text>
              </View>
              <Text style={{color:'gray', fontFamily:'Bold', alignSelf:'flex-start'}}>Ubicación</Text>
              <Text style={{fontFamily:'Regular', alignSelf:'center', height:'auto', width:340, textAlign:'center'}}>Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, eligendi id iusto perspiciatis voluptatem expedita quod alias temporibus aspernatur quam saepe voluptatibus libero molestiae. Animi consequatur repellendus laborum provident quis?</Text>
              <Image style={{width:300,height:200}}
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