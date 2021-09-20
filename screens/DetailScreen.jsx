import React, { useEffect, useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { fetchProductDetail, addQty, checkToken } from '../store';

export default function DetailScreen({ route, navigation }) {
  const [productDetail, setProductDetail] = useState({});
  useEffect(() => {
    fetchProductDetail(route.params).then((returnValue) =>
      setProductDetail(returnValue)
    );
  }, []);

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
        <Image
          style={styles.productImage}
          source={{ uri: productDetail.picture }}
        />
        <Text style={styles.productPrice}>
          Rp{' '}
          {productDetail.price
            ?.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
        </Text>
        <View
          style={{
            backgroundColor: '#edf2f0',
            padding: 12,
            borderRadius: 12,
            marginTop: 12,
          }}
        >
          <Text style={styles.productBrand}>
            {productDetail.Brands?.map((brand) => brand.name)}
          </Text>
          <Text style={styles.productName}>{productDetail.name}</Text>
          <Text style={styles.productCategory}>
            {productDetail.Category?.name}
          </Text>
          <Text
            style={{ fontWeight: 'bold', color: '#20a869', marginBottom: 12 }}
          >
            By:{' '}
            {productDetail.UsersProducts?.map((seller) => {
              return `${seller.User.firstName} ${seller.User.lastName}`;
            })}
          </Text>
          <Text style={{ color: '#404040' }}>
            Weight:{' '}
            {productDetail.weight < 1 ? '1 KG' : productDetail.weight + ' KG'}
          </Text>
          <Text style={{ color: '#404040' }}>
            Stock: {productDetail.stock ? productDetail.stock : 'Out of stock'}
          </Text>
        </View>
        <View
          style={{
            padding: 12,
            marginTop: 12,
          }}
        >
          <Text style={{ ...styles.productSubTitle, marginTop: 0 }}>
            Description
          </Text>
          <Text style={{ color: '#404040' }}>{productDetail.description}</Text>
          <Text style={styles.productSubTitle}>Ingredients</Text>
          {productDetail.ingridient?.map((ingredient, i) => (
            <Text style={{ color: '#404040' }} key={'ingredient-list-' + i}>
              - {ingredient}
            </Text>
          ))}
          <Text style={{ ...styles.productSubTitle, color: 'red' }}>
            Harmful Ingredients
          </Text>
          {productDetail.harmfulIngidient?.length ? (
            productDetail.harmfulIngidient?.map((ingredient, i) => (
              <Text
                style={{ color: '#404040' }}
                key={'harmful-ingredient-list-' + i}
              >
                - {ingredient}
              </Text>
            ))
          ) : (
            <Text style={{ color: '#404040' }}>None</Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Button
            title="Add to cart"
            color={Number(productDetail.status) ? '#ffc273' : '#20a869'}
            onPress={() => {
              addQty(productDetail.id);
            }}
          />
        </View>
        <TouchableHighlight
          underlayColor={'#bfbfbf80'}
          style={{
            borderRadius: 4,
          }}
          onPress={() => {
            checkToken().then((returnValue) => {
              if (returnValue) {
                navigation.navigate('Chat');
              } else {
                navigation.navigate('Login');
              }
            });
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
    color: '#525252',
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    color: '#404040',
  },
  productCategory: {
    color: '#707070',
  },
  productSubTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#404040',
    marginTop: 12,
  },
  chatTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
});
