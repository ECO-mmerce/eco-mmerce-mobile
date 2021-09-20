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
  cart_list: '@cart_list',
  history_list: '@history_list',
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
    console.log(err, `INI DIMANA`);
  }
}

export async function fetchCart() {
  try {
    const { data } = await serverAPI('/buyers/carts', {
      headers: {
        access_token: await AsyncStorage.getItem(keys.access_token),
      },
    });

    await AsyncStorage.setItem(keys.cart_list, JSON.stringify(data));

    const value = await AsyncStorage.getItem(keys.cart_list);

    return JSON.parse(value);
  } catch (err) {
    console.log(err, 'error fetch cart');

    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: err.response.data.message,
      position: 'bottom',
    });
  }
}

export async function removeQty(id) {
  try {
    const { data } = await serverAPI(`buyers/carts/${id}`, {
      method: 'DELETE',
      headers: {
        access_token: await AsyncStorage.getItem(keys.access_token),
      },
    });

    await AsyncStorage.setItem(keys.cart_list, JSON.stringify(data));

    Toast.show({
      type: 'info',
      text1: 'Info',
      text2: 'Product has ben removed from your cart !',
      position: 'bottom',
    });
  } catch (err) {
    console.log(err);

    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: err.response.data.message,
      position: 'bottom',
    });
  }
}

export async function addQty(id) {
  try {
    const access_token = await AsyncStorage.getItem(keys.access_token);

    if (access_token) {
      const { data } = await serverAPI(`buyers/carts`, {
        method: 'POST',
        headers: {
          access_token: await AsyncStorage.getItem(keys.access_token),
        },
        data: { ProductId: id },
      });

      await AsyncStorage.setItem(keys.cart_list, JSON.stringify(data));

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Product added to your cart !',
        position: 'bottom',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'You are not logged in',
        position: 'bottom',
      });
    }
  } catch (err) {
    console.log(err.response.data);

    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: err.response.data,
      position: 'bottom',
    });
  }
}

export async function fetchHistory() {
  try {
    const { data } = await serverAPI('/buyers/history', {
      headers: {
        access_token: await AsyncStorage.getItem(keys.access_token),
      },
    });

    await AsyncStorage.setItem(keys.history_list, JSON.stringify(data));

    const value = await AsyncStorage.getItem(keys.history_list);
    // console.log(data);

    return JSON.parse(value);
  } catch (err) {
    console.log(err, 'error fetch history ------ \n\n\n\n');

    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: err.response.data.message,
      position: 'bottom',
    });
  }
}

export async function checkOut() {
  try {
    const { data } = await serverAPI('/buyers/carts/checkout', {
      method: 'POST',
      headers: {
        access_token: await AsyncStorage.getItem(keys.access_token),
      },
    });

    return data;
    // await AsyncStorage.setItem(keys.cart_list, JSON.stringify([]));

    // Toast.show({
    //   type: 'success',
    //   text1: 'Success',
    //   text2: 'Checkout Success !',
    //   position: 'bottom',
    // });
  } catch (err) {
    console.log(err);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: err.response.data.message,
      position: 'bottom',
    });
  }
}

export async function logout() {
  try {
    await AsyncStorage.clear();
  } catch (err) {
    console.log(err);

    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: err.response.data.message,
      position: 'bottom',
    });
  }
}

export async function fetchProducts() {
  try {
    const { data } = await serverAPI.get(baseURL + '/buyers/products');
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchProductDetail(id) {
  try {
    const { data } = await serverAPI.get(baseURL + '/buyers/products/' + id);
    return data;
  } catch (err) {
    console.log(err);
  }
}
