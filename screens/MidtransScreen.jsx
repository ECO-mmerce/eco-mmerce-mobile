import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function MidtransScreen({ route }) {
  console.log(route.params);

  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: route.params }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d8e1e3',
    flex: 1,
    padding: 12,
  },
});
