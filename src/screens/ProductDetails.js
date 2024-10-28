import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Pressable, ActivityIndicator,
} from 'react-native';
import React, {useRef,useEffect, useState} from 'react';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import Cart, {HEIGHT, OPEN_HEIGHT} from '../components/Cart';
import {useCartStore} from '../context/CartProvider';

const IMAGE_HEIGHT = Dimensions.get('window').height * 0.4;
const foodInfo = [
  {title: 'Energy', value: '210 cal', bgColor: '#fb6d37'},
  {title: 'Proteins', value: '14.6 cal', bgColor: '#ffbe3d'},
  {title: 'Fats', value: '14.6 cal', bgColor: '#7651dc'},
  {title: 'Carbs', value: '14.6 cal', bgColor: '#84b468'},
];
export default function ProductPage() {
  const route = useRoute();
  const { productId } = route.params; // Get the product ID from the route parameters
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const {cartList, addToCart} = useCartStore();
  const {params} = useRoute();
  const cartRef = useRef();
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://bms-fs-api.azurewebsites.net/api/Product/${productId}`);
        if (response.data.isSuccess) {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }


  return (
    <>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <View style={styles.center}>
            {/* Shared Element Image */}
            <Animated.Image
              style={{width: '100%', height: IMAGE_HEIGHT}}
              sharedTransitionTag={params.tagName}
              source={{
                uri: product.images[0]?.url,
              }}
            />
            {/* <View style={styles.backBtnWrapper}>
            <Icon name="arrow-long-left" size={20} color="grey" />
          </View> */}
          </View>

          {/* Title & description */}
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.weight}>{product.price} VND</Text>
          <Text style={[styles.weight, {marginVertical: 20}]}>
          {product.description}
          </Text>

          {/* Food Info */}
          <View>
            <FlatList
              data={foodInfo}
              keyExtractor={(_, index) => index.toString()}
              horizontal={true}
              ItemSeparatorComponent={<View style={{width: 10}} />}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <View
                  style={[
                    styles.foodInfo,
                    {
                      backgroundColor: item.bgColor,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.whiteColor,
                      {
                        fontSize: 12,
                        marginBottom: 5,
                      },
                    ]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.whiteColor, {fontWeight: 'bold'}]}>
                    {item.value}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
        {/* Add to Cart */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '45%',
              backgroundColor: '#f2f4f8',
              padding: 15,
              borderRadius: 10,
            }}>
            {/* <Icon name="plus" color="black" size={20} /> */}
            <Text style={{marginHorizontal: 10, fontWeight: 'bold'}}>Delete</Text>
            {/* <Icon name="minus" color="black" size={20} /> */}
          </View>

          <Pressable
            style={{width: '45%'}}
            onPress={() => {
              addToCart(params?.productInfo);
              cartRef.current.open(OPEN_HEIGHT);
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // width: '45%',
                backgroundColor: '#1d212b',
                padding: 15,
                borderRadius: 10,
              }}>
             

              <Text
                style={{
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Update
              </Text>
            </View>
          </Pressable>
        </View>
        <SafeAreaView />
      </View>
      <Cart ref={cartRef} items={cartList} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: '#f9f9f9',
    paddingTop: 50,
  },
  center: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  weight: {
    color: 'grey',
    fontSize: 17,
  },
  foodInfo: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  whiteColor: {
    color: 'white',
  },
  backBtnWrapper: {
    position: 'absolute',
    left: 0,
    top: 20,
    backgroundColor: '#e1e1e5',
    padding: 10,
    borderRadius: 5,
  },
});
