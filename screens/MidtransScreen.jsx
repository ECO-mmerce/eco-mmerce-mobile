import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function MidtransScreen({ route, navigation }) {
  console.log(route.params);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        onNavigationStateChange={(navState) => {
          console.log(navState);
          if (navState.url.includes(`${route.params}#/success`)) {
            setTimeout(() => {
              navigation.replace('User');
            }, 2000);
          }
        }}
        source={{ uri: route.params }}
      />
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
