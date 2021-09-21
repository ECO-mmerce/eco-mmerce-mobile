import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

export default function HeaderChat({ name, picture }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => {
          navigation.goBack();
        }}
        underlayColor="#1da365"
        style={styles.hightlight}
      >
        <View style={styles.headerBtn}>
          <Ionicons name="ios-chevron-back" size={24} color="#424242" />
          <Text style={{ marginLeft: 6 }}>Go Back</Text>
        </View>
      </TouchableHighlight>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image
          source={{
            uri: picture,
          }}
          style={{ width: 40, height: 40, borderRadius: 20, marginBottom: 4 }}
        />
        <Text style={{ fontWeight: 'bold', color: '#444444' }}>{name}</Text>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  headerBtn: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hightlight: {
    borderRadius: 12,
    opacity: 0.5,
    flex: 1,
  },
});
