import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const baseURL = 'http://192.168.100.49:4000';

const serverAPI = axios.create({
  baseURL,
});

const keys = {
  user_data: '@user_data',
  access_token: '@access_token',
};

export async function login(email, password, role) {
  try {
    const { data } = await serverAPI.post(`/${role}s/login`, {
      email,
      password,
    });

    const {
      access_token,
      id,
      firstName,
      lastName,
      role: user_role,
      picture,
    } = data;

    const user_data = {
      id,
      firstName,
      lastName,
      role: user_role,
      picture,
    };

    await AsyncStorage.setItem(keys.user_data, JSON.stringify(user_data));
    await AsyncStorage.setItem(keys.access_token, access_token);

    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Login success',
      position: 'bottom',
    });

    return true;
  } catch (err) {
    console.log(err.response.data);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: err.response.data.message,
      position: 'bottom',
    });

    return false;
  }
}

export async function register(payload, role) {
  try {
    const formData = new FormData();
    formData.append('firstName', payload.firstName);
    formData.append('lastName', payload.lastName);
    formData.append('email', payload.email);
    formData.append('password', payload.password);
    formData.append('phoneNumber', payload.phoneNumber);

    if (payload.picture.uri) {
      formData.append('picture', payload.picture);
    }

    const { data } = await serverAPI.post(`/${role}s/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Register successful',
      position: 'bottom',
    });

    return true;
  } catch (err) {
    console.log(err.response?.data);

    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: err.response.data.message,
      position: 'bottom',
    });

    return false;
  }
}

export async function checkToken() {
  try {
    const access_token = await AsyncStorage.getItem(keys.access_token);

    return access_token ? true : false;
  } catch (err) {
    console.log(err);
  }
}

export async function logout() {
  try {
    await AsyncStorage.clear();
  } catch (err) {
    console.log(err);
  }
}
