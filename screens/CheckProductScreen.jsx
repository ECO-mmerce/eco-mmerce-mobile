import React, { useState } from 'react';
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import * as ImagePicker from 'expo-image-picker';

const windowWidth = Dimensions.get('window').width;

export default function CheckProductScreen() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ flex: 1, alignItems: 'stretch' }}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: windowWidth * 0.6,
                height: windowWidth * 0.6,
                borderRadius: 12,
              }}
            />
          )}
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 26 }}>Result</Text>
        <Text style={{ ...styles.productSubTitle, color: 'red' }}>
          Harmful Ingredients
        </Text>
      </View>
      <Button title="Pick image" color="#20a869" onPress={pickImage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d8e1e3',
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  productSubTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#404040',
    marginTop: 12,
  },
});
