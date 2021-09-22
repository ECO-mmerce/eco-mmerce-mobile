import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import logo from '../assets/logo.png';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const windowWidth = Dimensions.get('window').width;

export default function Logo() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor="#00000000"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Home',
              },
            ],
          })
        }
      >
        <Image source={logo} style={styles.image} />
      </TouchableHighlight>
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
