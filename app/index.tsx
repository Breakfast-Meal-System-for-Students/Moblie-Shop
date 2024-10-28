import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../src/components/LoginForm'; // Adjust the path as needed
import Home from '../src/screens/home'; // Adjusted to match the filename
import ProductList from '../src/components/ProductList';
import ProductPage from '../src/screens/ProductPage';
import ProductDetails from '../src/screens/ProductDetails';
import CartProvider from '../src/context/CartProvider';

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <CartProvider> 
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: false }} />
          <Stack.Screen name="ProductPage" component={ProductPage} options={{ headerShown: false }} />
          <Stack.Screen name="Screen2" component={ProductDetails} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}