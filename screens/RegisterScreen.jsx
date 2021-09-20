import { useNavigation } from '@react-navigation/core';
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
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';
import { register } from '../store';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [picture, setPicture] = useState({
    uri: '',
    name: '',
    type: '',
  });

  const navigation = useNavigation();

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      // Request media permission
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      // Break the function if not granted
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      let { uri, type, cancelled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      // Break if user cancelled
      if (cancelled) return;

      const filename = uri.split('/').pop();
      const fileType = filename.split('.').pop();
      setPicture({ uri, name: filename, type: `${type}/${fileType}` });
    }
  };

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
            Register
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 4,
            }}
          >
            First Name
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="first name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <Text
            style={{
              fontSize: 16,
              marginBottom: 4,
            }}
          >
            Last Name
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="last name"
            value={lastName}
            onChangeText={setLastName}
          />
          <Text
            style={{
              fontSize: 16,
              marginBottom: 4,
            }}
          >
            Phone Number
          </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            placeholder="+(xxx) xxxx xxxx"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
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
            underlayColor="#8be8bd"
            onPress={() => {
              pickImage();
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#20a869',
                borderRadius: 4,
                padding: 8,
              }}
            >
              <Ionicons name="ios-image-outline" size={16} color="#20a869" />
              <Text
                style={{
                  color: '#20a869',
                  marginLeft: 12,
                  width: 100,
                }}
              >
                Profile Image
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ marginBottom: 12 }}
            underlayColor="#333"
            onPress={() => {
              register(
                {
                  firstName,
                  lastName,
                  phoneNumber,
                  email,
                  password,
                  picture,
                },
                'buyer'
              ).then((returnValue) => {
                if (returnValue) navigation.replace('Login');
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
              <Ionicons name="person-add-outline" size={16} color="white" />
              <Text
                style={{
                  color: 'white',
                  marginLeft: 12,
                  width: 60,
                }}
              >
                Register
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
