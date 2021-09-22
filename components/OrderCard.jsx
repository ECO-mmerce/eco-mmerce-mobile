import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function OrderCard({ data }) {
  const statusStyle = [
    styles.statusOk,
    styles.statusWarning,
    styles.statusDanger,
  ];

  const statusText = ['Paid', 'On Process', 'Cancelled'];

  const random = Math.floor(Math.random() * statusStyle.length);

  return (
    <View style={styles.container}>
      <View style={{ width: '80%' }}>
        <Text style={styles.orderId}>{data.Product.name}</Text>
        {/* <Text style={styles.orderId}>Qty. {data.Product.qty}</Text> */}
        <Text style={styles.orderId}>
          Total: Rp
          {data.Product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')},
          00
        </Text>
      </View>
      <View>
        <Text style={styles.statusOk}>Paid</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#f0fffb',
    position: 'relative',
    marginBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  orderId: {
    fontWeight: 'bold',
  },
  statusDanger: {
    backgroundColor: '#ffc6c2',
    color: '#ff4336',
    padding: 6,
    borderRadius: 8,
  },
  statusOk: {
    backgroundColor: '#c4ffe4',
    color: '#20a869',
    padding: 6,
    borderRadius: 8,
  },
  statusWarning: {
    backgroundColor: '#fff0b5',
    color: '#e8b900',
    padding: 6,
    borderRadius: 8,
  },
});
