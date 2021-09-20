import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartCard from '../components/CartCard';
import Header from '../components/Header';

export default function CartScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.subTitle}>My Cart</Text>
      <CartCard />
      <CartCard />
      <CartCard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d8e1e3',
    flex: 1,
    paddingHorizontal: 12,
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 12,
  },
});
