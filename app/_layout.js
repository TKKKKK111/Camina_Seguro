import { View } from "react-native";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";


export default function Layout() {




    
const [loaded] = useFonts({
Bold: require('../assets/font/Poppins-Bold.ttf'),
SemiBold: require('../assets/font/Poppins-SemiBold.ttf'),
   Regular: require('../assets/font/Poppins-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }



    return (
        <View>
        <Slot/>
        </View>
    )
    }