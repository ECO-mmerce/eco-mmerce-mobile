import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default class MidtransScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.navigation.replace('User');
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <WebView source={{ uri: this.props.route.params }} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d8e1e3',
    flex: 1,
    padding: 12,
  },
});
