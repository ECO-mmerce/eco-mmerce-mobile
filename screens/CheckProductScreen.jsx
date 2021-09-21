import React, { useState } from 'react';
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';

import Header from '../components/Header';
import { postProductImage } from '../store';

const windowWidth = Dimensions.get('window').width;

export default function CheckProductScreen() {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState({});

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

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

      if (!cancelled) {
        setImage(uri);
        const filename = uri.split('/').pop();
        const fileType = filename.split('.').pop();

        setIsLoading(true);

        postProductImage({
          uri,
          name: filename,
          type: `${type}/${fileType}`,
        })
          .then((returnValue) => {
            console.log(returnValue);
            setScanResult(returnValue);
          })
          .finally(() => {
            setIsLoading(false);
          });
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
        {isLoading ? (
          <View>
            {/* <Text
              style={{ fontWeight: 'bold', fontSize: 26, textAlign: 'center' }}
            >
              Scanning image...
            </Text> */}
            <Spinner
              visible={isLoading}
              color="#20a869"
              textContent={'Scanning image...'}
              textStyle={{ color: 'white' }}
            />
          </View>
        ) : (
          <>
            <Text
              style={{ fontWeight: 'bold', fontSize: 26, textAlign: 'center' }}
            >
              {image ? 'Result' : 'Please pick an image first'}
            </Text>
            {Object.keys(scanResult).length ? (
              <ScrollView>
                <View style={styles.subSection}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                    Ingredients
                  </Text>
                  {scanResult.ingridients.ingridient.map((ingredient, i) => {
                    return (
                      <Text key={'ingredient-item-' + i}>- {ingredient}</Text>
                    );
                  })}
                </View>
                <View style={styles.subSection}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                    Harmful Ingredients
                  </Text>
                  {scanResult.ingridients.harmfulIngridient.map(
                    (ingredient, i) => {
                      return (
                        <Text key={'harmful-item-' + i}>- {ingredient}</Text>
                      );
                    }
                  )}
                  {scanResult.ingridients.harmfulIngridient.length ? null : (
                    <Text
                      style={{
                        color: '#20a869',
                        fontWeight: 'bold',
                        fontSize: 20,
                        textAlign: 'center',
                        paddingVertical: 12,
                      }}
                    >
                      None! ECO-mmerce approve this product!
                    </Text>
                  )}
                </View>
              </ScrollView>
            ) : null}
          </>
        )}
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
  subSection: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    marginVertical: 8,
  },
});
