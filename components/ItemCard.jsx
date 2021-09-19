import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import productImage from '../assets/stock.png';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import Toast from 'react-native-toast-message';

const windowWidth = Dimensions.get('window').width;

export default function ItemCard() {
  const brandName = 'Brand Name';
  const productName = 'Product Name';
  const sellerName = 'Seller Name';

  const cutText = (text, length) => {
    return text.slice(0, length) + '...';
  };

  const navigation = useNavigation();

  return (
    <View style={styles.outerContainer}>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('Detail');
        }}
        underlayColor="#1da365"
        style={styles.hightlightDetail}
      >
        <View style={styles.container}>
          <Image source={productImage} style={styles.productImage} />
          <View style={styles.detailContainer}>
            <Text style={styles.productBrand}>
              {brandName.length < 20 ? brandName : cutText(brandName, 20)}
            </Text>
            <Text style={styles.productName}>
              {productName.length < 13 ? productName : cutText(productName, 13)}
            </Text>
            <Text style={styles.productCategory}>
              {sellerName.length < 13 ? sellerName : cutText(sellerName, 13)}
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>Rp 222.000.000</Text>
            </View>
          </View>
          <TouchableHighlight
            onPress={() => {
              Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Item added to cart',
                position: 'bottom',
              });
            }}
            underlayColor="#1da365"
            style={styles.hightlight}
          >
            <View style={styles.headerBtn}>
              <Ionicons name="ios-cart" size={24} color="black" />
            </View>
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    </View>
  );
}
// Merk, nama, category, seller, harga, tombol add to cart
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 6,
    borderRadius: 12,
    backgroundColor: '#f0fffb',
    position: 'relative',
  },
  outerContainer: {
    marginBottom: 8,
  },
  detailContainer: {
    paddingLeft: 8,
  },
  productBrand: {
    color: '#1efc95',
    fontSize: 14,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  productCategory: {
    color: '#888',
    fontSize: 14,
  },
  productPrice: {
    fontSize: 20,
  },
  productImage: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    borderRadius: 12,
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerBtn: {
    padding: 12,
    backgroundColor: '#1efc95',
    borderRadius: 12,
  },
  hightlight: {
    borderRadius: 12,
    opacity: 0.5,
    position: 'absolute',
    bottom: 6,
    right: 6,
  },
  hightlightDetail: {
    borderRadius: 12,
  },
});
