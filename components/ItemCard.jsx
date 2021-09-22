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
import { checkToken, login, register, addQty } from '../store';

const windowWidth = Dimensions.get('window').width;

export default function ItemCard({ product }) {
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
          navigation.navigate('Detail', product.id);
        }}
        underlayColor="#1da365"
        style={styles.hightlightDetail}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: product.picture }}
            style={styles.productImage}
          />
          <View style={styles.detailContainer}>
            <Text style={styles.productBrand}>
              {product.Brands[0].name.length < 20
                ? product.Brands[0].name
                : cutText(product.Brands[0].name, 20)}
            </Text>
            <Text style={styles.productName}>
              {product.name.length < 20
                ? product.name
                : cutText(product.name, 20)}
            </Text>
            <Text style={styles.productCategory}>
              {product.Category.name.length < 13
                ? product.Category.name
                : cutText(product.Category.name, 13)}
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>
                Rp{' '}
                {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                , 00
              </Text>
            </View>
          </View>
          <TouchableHighlight
            onPress={() => {
              addQty(product.id);
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
    color: '#20a869',
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
