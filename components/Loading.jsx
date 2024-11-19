import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

export default function LoadingAnimation() {
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    
    animation.start();

    return () => animation.stop();
  }, []);

  const dots = Array(12).fill(0).map((_, index) => {
    const rotate = rotateAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const angle = (index * 30) * Math.PI / 180;
    const radius = 40;
    const translateX = Math.cos(angle) * radius;
    const translateY = Math.sin(angle) * radius;

    const colors = [
      '#FF61D8', '#FF8B64', '#FFB056', '#FFD64D', '#9FFF5B', '#70FF8B',
      '#6CFFCE', '#64D2FF', '#56A2FF', '#9B6CFF', '#FF6CD5', '#FF6C8B',
    ];

    return (
      <Animated.View
        key={index}
        style={[
          styles.dot,
          {
            backgroundColor: colors[index],
            transform: [
              { translateX },
              { translateY },
              { rotate },
            ],
          },
        ]}
      />
    );
  });

  return (
    <View style={styles.container}>
      {dots}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    alignItems: 'center',
    top:500,
    backgroundColor: 'white'
 
    
  },
  dot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    opacity: 0.7,
  },
});