import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView ,Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'; // Import LinearGradient
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserProfile } from '../api/myProfile'; // Import the new function
import { fetchProductsRecent } from '../api/product'; // Import the function to fetch products
import { useNavigation } from '@react-navigation/native'; 
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Categories from '../components/Categories';
const HomeScreen = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recentProducts, setRecentProducts] = useState([]); // Initialize recentProducts state
    const navigation = useNavigation();
    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken'); // Retrieve the token from storage
                const data = await fetchUserProfile(token); // Call the new function
                if (data.isSuccess) {
                    setUserProfile(data.data);
                    await AsyncStorage.setItem('shopId', data.data.shopId); // Store shopId
                    console.log("shopId: "+data.data.shopId);  
                } else {
                    console.error('Failed to fetch user profile:', data.messages);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        getUserProfile();
    }, []);
    useEffect(() => {
        const getProducts = async () => {
            if (userProfile) {
                try {
                    const shopId = userProfile.shopId; // Assuming you have the shopId from userProfile
                    const productsData = await fetchProductsRecent(shopId);
                    if (productsData.isSuccess) {
                        setRecentProducts(productsData.data); // Set the fetched products
                    } else {
                        console.error('Failed to fetch products:', productsData.messages);
                    }
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            }
        };

        getProducts(); // Call the function to fetch products
    }, [userProfile]); // Dependency on userProfile
    if (loading) {
        return <Text>Loading...</Text>; // Show a loading indicator while fetching data
    }

    if (!userProfile) {
        return <Text>No user profile found.</Text>; // Handle case where no profile is found
    }
    return (
        <LinearGradient colors={['#FF7E5F', '#FEB47B']} style={styles.container}> 
            <ScrollView>
          
            <SafeAreaView style={styles.container1}>
        <View style={styles.topBar}>
          <Ionicons
            name="search"
            size={25}
            color="black"
            style={{marginRight: 10}}
          />
          <Ionicons name="notifications-outline" size={25} color="black" />
        </View>

        <Text style={styles.subTitle}>Whats New</Text>
        <Text style={styles.title}>
  From The Shop{' '}
  <Text style={{ color: 'red' }}>{userProfile.firstName} {userProfile.lastName}</Text>
</Text>
        <View style={{marginTop: 20}}>
          <Categories />
        </View>

        <View style={styles.profileContainer}>
                <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
                <Text style={styles.greeting}>Phone: {userProfile.phone}</Text>
                <Text style={styles.subGreeting}>Shop ID: {userProfile.shopId}</Text>
            </View>
      </SafeAreaView>

                <View style={styles.storageContainer}>
                    <View style={styles.storageInfo}>
                        <Text style={styles.usedSpace}>So Luong Don: 2400  </Text>
                        <Text style={styles.totalSpace}>Doanh Thu: 3000 VND </Text>
                        <Text style={styles.freeSpace}> Product Number: {recentProducts.total} </Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProductPage')}>
                        <Text style={styles.buttonText}>Product</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Voucher</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Feedback</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Shop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Location</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>DashBoard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Transaction</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.recentImagesTitle}> Product</Text>
                <View style={styles.recentImagesContainer}>
                    {recentProducts.length === 0 ? ( // Check if recentProducts is empty
                        <Text>No products available.</Text> // Placeholder message
                    ) : (
                        recentProducts.data.map(product => (
                            <View key={product.id} style={styles.imagePlaceholder}>
                                <Image source={{ uri: product.images[0]?.url }} style={styles.productImage} />
                                <Text>{product.name}</Text>
                                <Text>{product.price} VND</Text>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
      },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subGreeting: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    storageContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    storageInfo: {
        alignItems: 'center',
    },
    usedSpace: {
        fontSize: 16,
    },
    totalSpace: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    freeSpace: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#E0E7FF',
        borderRadius: 10,
        padding: 15,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    recentImagesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    recentImagesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    imagePlaceholder: {
        width: '30%',
        height: 100,
        backgroundColor: '#ccc',
        borderRadius: 10,
        alignItems: 'center',
        padding: 5,
    },
    productImage: {
        width: '100%',
        height: '70%',
        borderRadius: 10,
    }, avatar: {
        width: '30%',
        height: '30%',
        borderRadius: 100,
    } , container1: {
        flex: 1,
        paddingHorizontal: 25,
        backgroundColor: '#f9f9f9',
      },
      topBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 20,
      },
      subTitle: {
        fontSize: 23,
        marginBottom: 10,
      },
      title: {
        fontSize: 27,
        fontWeight: 'bold',
      },
});

export default HomeScreen;
