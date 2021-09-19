import React from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import productImage from '../assets/stock.png';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function DetailScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <TouchableHighlight
        underlayColor={'#bfbfbf80'}
        style={styles.touchStyle}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <View style={styles.containerHorizontal}>
          <Ionicons name="ios-chevron-back" size={24} color="#20a869" />
          <Text style={styles.backText}>Go back</Text>
        </View>
      </TouchableHighlight>
      <ScrollView style={styles.content}>
        <Image style={styles.productImage} source={productImage} />
        <Text style={styles.productPrice}>Rp 20.000.000</Text>
        <Text style={styles.productBrand}>Brand Name</Text>
        <Text style={styles.productName}>Product Name</Text>
        <Text style={styles.productCategory}>Category</Text>
        <Text>By: Seller Name</Text>
        <Text style={styles.productSubTitle}>Description</Text>
        <Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, unde!
          Itaque, esse ea praesentium libero iure cum unde sapiente numquam enim
          cumque, odit animi inventore assumenda quae totam eligendi nobis.
        </Text>
        <Text style={styles.productSubTitle}>Ingredients</Text>
        <Text>- Ingredient 1</Text>
        <Text>- Ingredient 2</Text>
        <Text>- Ingredient 3</Text>
        <Text>- Ingredient 3</Text>
        <Text>- Ingredient 3</Text>
        <Text>- Ingredient 3</Text>
        <Text>- Ingredient 3</Text>
        <Text>- Ingredient 3</Text>
        <Text>- Ingredient 3</Text>
        <Text>- Ingredient 3</Text>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Button
            title="Add to cart"
            color="#20a869"
            onPress={() => {
              Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Item added to cart',
                position: 'bottom',
                // bottomOffset: 60,
              });
            }}
          />
        </View>
        <TouchableHighlight
          underlayColor={'#bfbfbf80'}
          style={{
            borderRadius: 4,
          }}
          onPress={() => {
            alert('Go to chatroom');
          }}
        >
          <View style={styles.chatTouch}>
            <Ionicons
              name="ios-chatbubble-ellipses-outline"
              size={30}
              color="#20a869"
            />
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}
// Brand, nama barang, category, nama seller, description, ingredients, price
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d8e1e3',
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  containerHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
  },
  touchStyle: {
    width: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  addToCartBtn: {
    flex: 1,
    marginRight: 12,
  },
  productImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 12,
    marginBottom: 12,
  },
  content: {
    flex: 1,
    marginBottom: 12,
  },
  backText: {
    color: '#20a869',
  },
  productBrand: {
    color: '#20a869',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
  },
  productCategory: {
    color: '#707070',
  },
  productSubTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
  },
  chatTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
});
