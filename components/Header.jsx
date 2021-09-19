import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
} from 'react-native';
import Logo from './Logo';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

export default function Header() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Logo />
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('Cart');
        }}
        underlayColor="#1da365"
        style={styles.hightlight}
      >
        <View style={styles.headerBtn}>
          <Ionicons name="ios-cart-outline" size={24} color="black" />
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('User');
        }}
        underlayColor="#1da365"
        style={styles.hightlight}
      >
        <View style={styles.headerBtn}>
          <Ionicons name="person-outline" size={24} color="black" />
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBtn: {
    padding: 12,
  },
  hightlight: {
    borderRadius: 12,
    opacity: 0.5,
  },
});
