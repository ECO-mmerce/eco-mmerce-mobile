import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';
import { fetchProducts } from '../store';

const renderItem = ({ item }) => <ItemCard product={item} />;

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProducts().then((returnValue) => setProducts(returnValue));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        refreshControl={
          <RefreshControl
            colors={['#52d9a8']}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchProducts().then((returnValue) => {
                setProducts(returnValue);
                setRefreshing(false);
              });
            }}
          />
        }
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
      />
      <TouchableHighlight
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          borderRadius: 50,
        }}
        underlayColor="#333"
        onPress={() => navigation.navigate('CheckProduct')}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            borderRadius: 50,
            backgroundColor: '#1efc95',
          }}
        >
          <Ionicons name="ios-scan" size={18} color="#5c5c5c" />
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d8e1e3',
    flex: 1,
    paddingHorizontal: 12,
    position: 'relative',
  },
});
