import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import OrderCard from '../components/OrderCard';

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spaceContainer}>
        <Text style={styles.subTitle}>My Orders</Text>
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </View>
      <Button title="Logout" color="#f44336" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d8e1e3',
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 12,
  },
  spaceContainer: {
    flex: 1,
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 12,
  },
});
