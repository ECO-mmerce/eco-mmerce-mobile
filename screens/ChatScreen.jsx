import React, { useEffect, useRef, useState } from 'react';
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
import {
  fetchChats,
  getMessageList,
  getUserData,
  pushMessageToList,
} from '../store';
import SocketContext from '../config/socket';

export default function ChatScreen({ route }) {
  const [chat, setChat] = useState('');
  const [messageList, setMessageList] = useState([]);
  const scrollViewRef = useRef(null);

  const socket = React.useContext(SocketContext);

  const handleSocketMessage = (message) => {
    console.log(
      '-------------Message received from socket server ------------------'
    );

    pushMessageToList(message).then((returnValue) => {
      setMessageList(returnValue);
    });
  };

  useEffect(() => {
    console.log('-------Component Mounted-----------');

    // Fetch messages
    fetchChats(route.params[0].User.id)
      .then(() => {
        console.log('-----------Message History Received------------');

        return getMessageList();
      })
      .then((returnValue) => {
        console.log('------------ Initializing local state ------------');
        setMessageList(returnValue);
      });

    // Join to socket room
    getUserData().then((returnValue) => {
      console.log('---------- Joining socket room ---------------');
      socket.emit('joinRoom', {
        sellerId: route.params[0].User.id,
        buyerId: returnValue.id,
      });
    });

    // Listen to server event
    socket
      .off('message', handleSocketMessage)
      .on('message', handleSocketMessage);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderChat
        picture={route.params[0].User.picture}
        name={`${route.params[0].User.firstName} ${route.params[0].User.lastName}`}
      />
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }}
        style={styles.scrollContainer}
      >
        {messageList.map((message, i) => {
          return (
            <ChatBubble
              key={'chat-bubble-' + i}
              sellerPicture={route.params[0].User.picture}
              message={message}
            />
          );
        })}
      </ScrollView>
      <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
        <TextInput
          placeholder="Write your message here ..."
          style={{ flex: 1, fontSize: 20, padding: 12 }}
          value={chat}
          onChangeText={setChat}
          onSubmitEditing={() => {
            if (chat) {
              getUserData().then((returnValue) => {
                socket.emit('chat', {
                  message: {
                    BuyerId: returnValue.id,
                    SellerId: route.params[0].User.id,
                    message: chat,
                    fullName:
                      returnValue.firstName + ' ' + returnValue.lastName,
                  },
                });
                setChat('');
              });
            }
          }}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
          }}
        >
          <TouchableHighlight
            style={{ borderRadius: 50 }}
            onPress={() => {
              if (chat) {
                getUserData().then((returnValue) => {
                  socket.emit('chat', {
                    message: {
                      BuyerId: returnValue.id,
                      SellerId: route.params[0].User.id,
                      message: chat,
                      fullName:
                        returnValue.firstName + ' ' + returnValue.lastName,
                    },
                  });
                  setChat('');
                });
              }
            }}
            underlayColor="#333"
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
          </TouchableHighlight>
        </View>
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
