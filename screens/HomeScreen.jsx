import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';
import Toast from 'react-native-toast-message';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d8e1e3',
    flex: 1,
    paddingHorizontal: 12,
  },
});
