import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d8e1e3',
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 12,
  },
});
