import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function ChatBubble() {
  const random = Math.floor(Math.random() * 2);
  return (
    <View
      style={{
        flexDirection: random ? 'row' : 'row-reverse',
        alignItems: 'center',
        marginBottom: 18,
      }}
    >
      <Image
        source={{
          uri: 'https://st.depositphotos.com/1597387/1984/i/950/depositphotos_19841901-stock-photo-asian-young-business-man-close.jpg',
        }}
        style={{ width: 40, height: 40, borderRadius: 20, marginBottom: 4 }}
      />
      <View
        style={{
          alignItems: random ? 'flex-start' : 'flex-end',
          marginHorizontal: 12,
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>Sender Name</Text>
        <Text>Chat message, halo gans</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
