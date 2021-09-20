import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { login } from '../store';
import { useNavigation } from '@react-navigation/core';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.formContainer}>
        <View style={styles.background}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            Login
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 4,
            }}
          >
            Email
          </Text>
          <TextInput
            style={styles.textInput}
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="email"
            value={email}
            onChangeText={setEmail}
          />
          <Text
            style={{
              fontSize: 16,
              marginBottom: 4,
            }}
          >
            Password
          </Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry
            textContentType="password"
            placeholder="password"
            autoCompleteType="password"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableHighlight
            style={{ marginBottom: 12 }}
            underlayColor="#333"
            onPress={() => {
              login(email, password, 'buyer').then((returnValue) => {
                if (returnValue) {
                  navigation.replace('User');
                }
              });
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#20a869',
                borderRadius: 4,
                padding: 8,
              }}
            >
              <Ionicons name="enter-outline" size={16} color="white" />
              <Text
                style={{
                  color: 'white',
                  marginLeft: 12,
                  width: 60,
                }}
              >
                Login
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d8e1e3',
    flex: 1,
    paddingHorizontal: 12,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 12,
    width: '100%',
  },
  textInput: {
    borderBottomColor: 'green',
    borderBottomWidth: 2,
    height: 50,
    padding: 12,
    marginBottom: 12,
  },
});
