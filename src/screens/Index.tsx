import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';

const Index = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome! Please log in.</Text>
            <LoginForm />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0E7FF', // Light background color
    },
    welcomeText: {
        fontSize: 20,
        marginBottom: 20,
    },
});

export default Index;