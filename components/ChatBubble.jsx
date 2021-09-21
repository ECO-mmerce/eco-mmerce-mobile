import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getUserData } from '../store';

export default function ChatBubble({ message, sellerPicture }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserData().then((returnValue) => {
      setUserData(returnValue);
    });
  }, []);

  const isName =
    message.fullName.trim() ===
    `${userData.firstName} ${userData.lastName}`.trim();

  return (
    <View
      style={{
        flexDirection: isName ? 'row-reverse' : 'row',
        alignItems: 'center',
        marginBottom: 18,
      }}
    >
      <Image
        source={{
          uri: isName ? userData.picture : sellerPicture,
        }}
        style={{ width: 40, height: 40, borderRadius: 20, marginBottom: 4 }}
      />
      <View
        style={{
          alignItems: isName ? 'flex-end' : 'flex-start',
          marginHorizontal: 12,
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>{message.fullName}</Text>
        <Text>{message.message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
