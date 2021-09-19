import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import productImage from '../assets/stock.png';

const windowWidth = Dimensions.get('window').width;

export default function CartCard() {
  return (
    <View style={styles.container}>
      <Image source={productImage} style={styles.productImage} />
      <View style={{ paddingLeft: 8 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Product Name</Text>
        <Text style={{ color: 'grey' }}>Rp 12.000</Text>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text style={{ color: '#20a869', fontWeight: 'bold', fontSize: 16 }}>
            Total: Rp 20.000.000
          </Text>
        </View>
      </View>
      <View style={styles.qtyContainer}>
        <TouchableHighlight
          underlayColor={'#bfbfbf80'}
          style={{
            borderRadius: 4,
          }}
          onPress={() => {
            alert('Kurangi qty');
          }}
        >
          <Text
            style={{
              color: '#20a869',
              fontWeight: 'bold',
              fontSize: 20,
              paddingHorizontal: 6,
            }}
          >
            -
          </Text>
        </TouchableHighlight>
        <Text
          style={{
            paddingHorizontal: 10,
            textAlign: 'center',
            borderRadius: 4,
            color: '#888',
          }}
        >
          {Math.ceil(Math.random() * 20)}
        </Text>
        <TouchableHighlight
          underlayColor={'#bfbfbf80'}
          style={{
            borderRadius: 4,
          }}
          onPress={() => {
            alert('Tambah qty');
          }}
        >
          <Text
            style={{
              color: '#20a869',
              fontWeight: 'bold',
              fontSize: 20,
              paddingHorizontal: 6,
            }}
          >
            +
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 6,
    borderRadius: 12,
    backgroundColor: '#f0fffb',
    position: 'relative',
    marginBottom: 8,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 6,
    bottom: 6,
  },
  productImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: 12,
  },
});
