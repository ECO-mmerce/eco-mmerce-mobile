import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';

export default function DetailScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Text>Detail</Text>
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
