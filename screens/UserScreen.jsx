import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import OrderCard from '../components/OrderCard';

export default function UserScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.spaceContainer}>
        <Text style={styles.subTitle}>My Orders</Text>
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </View>
      <Button title="Logout" color="#f44336" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d8e1e3',
    flex: 1,
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
