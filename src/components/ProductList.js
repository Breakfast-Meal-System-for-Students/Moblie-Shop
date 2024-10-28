import {useNavigation} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import Animated from 'react-native-reanimated';
import { fetchProductsByShopId } from '../api/product'; // Import the API functio
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductList({ searchQuery, pageIndex, setTotalPages }) {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]); // State to hold products
  const PAGESIZE = 2;
  useEffect(() => {
      const getProducts = async () => {
        const id = await AsyncStorage.getItem('shopId');
        const fetchedProducts = await fetchProductsByShopId(id, pageIndex, searchQuery); // Fetch products using the API function
        setProducts(fetchedProducts.data.data); // Update state with fetched products
        setTotalPages(Math.ceil(fetchedProducts.data.total / PAGESIZE)); // Cập nhật tổng số trang
      };

      getProducts(); // Call the function to fetch products
  }, [searchQuery, pageIndex]); // Add searchQuery and pageIndex as dependencies

  const handleProductPress = (product) => {
      navigation.navigate('ProductPage', { productInfo: product }); // Navigate to ProductPage with product info
  };

  return (
    <View style={{marginTop: 20, backgroundColor: '#f9f9f9'}}>
      <FlatList
        data={products}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={<View style={{width: 10}} />}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() =>
              navigation.navigate('Screen2', {
                tagName: `sharedTag${index}`,
                productInfo: item,
                productId: item.id,
              })
            }>
            <Animated.View style={styles.row}>
              <Animated.Image
                style={{width: 100, height: 100}}
                sharedTransitionTag={`sharedTag${index}`}
                source={{
                  uri: item.images[0]?.url,
                }}
              />
              <View style={{paddingHorizontal: 10}}>
                <Text style={styles.highlight}>{item.name}</Text>
                <Text style={{marginVertical: 4, marginBottom: 8}}>
                  {item.description.length > 25 
                    ? `${item.description.slice(0, 25)}...` 
                    : item.description}
                </Text>
                <Text style={styles.highlight}>{item.price}</Text>
              </View>
              <Text style={styles.tag}>Top</Text>
            </Animated.View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',   marginBottom: 5,
  },
  highlight: {
    fontWeight: 'bold',
  },
  tag: {
    backgroundColor: '#8bda60',
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
    position: 'absolute',
    right: 0,
    overflow: 'hidden',
  },
});
