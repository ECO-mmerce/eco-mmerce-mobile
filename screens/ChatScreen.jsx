import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import HeaderChat from '../components/HeaderChat';
import ChatBubble from '../components/ChatBubble';

export default function ChatScreen() {
  const [chat, setChat] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <HeaderChat />
      <ScrollView style={styles.scrollContainer}>
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
      </ScrollView>
      <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
        <TextInput
          placeholder="Write your message here ..."
          style={{ flex: 1, fontSize: 20, padding: 12 }}
          value={chat}
          onChangeText={setChat}
        />
        <TouchableHighlight>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8,
            }}
          >
            <View
              style={{
                padding: 12,
                backgroundColor: '#1da365',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
              }}
            >
              <Ionicons name="ios-send" size={24} color="white" />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8e1e3',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  touchStyle: {
    width: 20,
    borderRadius: 8,
    marginBottom: 8,
  },
  chatBox: {
    // borderWidth: 2,
    // borderColor: 'green',
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 12,
  },
  chatContent: {
    alignItems: 'center',
    marginTop: 7,
    // borderWidth: 2,
    marginHorizontal: 15,
    marginBottom: 20,
    paddingLeft: 12,
    paddingVertical: 4,
    borderRadius: 25,
  },
  backBtn: {
    paddingTop: 4,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
});
