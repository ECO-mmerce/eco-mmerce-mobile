import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
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
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fetchProducts().then((returnValue) => setProducts(returnValue));
  }, []);

  const AnimatedTouchableHighlight =
    Animated.createAnimatedComponent(TouchableHighlight);

  const scaleIn = () => {
    // Will change scaleAnim value to 1 in 5 seconds
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const scaleOut = () => {
    // Will change scaleAnim value to 0 in 5 seconds
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

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
        onScroll={({ nativeEvent }) => {
          if (
            nativeEvent.contentOffset.y >
            (nativeEvent.contentSize.height -
              nativeEvent.layoutMeasurement.height) /
              2
          ) {
            scaleOut();
          } else {
            scaleIn();
          }
        }}
      />
      {/* Scan button */}
      <AnimatedTouchableHighlight
        style={[
          {
            position: 'absolute',
            bottom: 20,
            right: 20,
            borderRadius: 50,
          },
          {
            opacity: scaleAnim,
            transform: [
              {
                scale: scaleAnim,
              },
            ],
          },
        ]}
        underlayColor="#333"
        onPress={() => navigation.navigate('CheckProduct')}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            borderRadius: 50,
            backgroundColor: '#7ce6b8',
          }}
        >
          <Ionicons name="ios-scan" size={18} color="#5c5c5c" />
        </View>
      </AnimatedTouchableHighlight>
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
