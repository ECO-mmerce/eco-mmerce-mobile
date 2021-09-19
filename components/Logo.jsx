import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import logo from '../assets/logo.png';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: windowWidth * 0.4,
    height: 80,
  },
});
