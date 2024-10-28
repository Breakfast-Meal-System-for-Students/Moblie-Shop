import React, { useState } from 'react';
import { TextInput, Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { login } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation(); // Initialize navigation
    const handleLogin = async () => {
        setError('');
        try {
            const response = await login(email, password);
            if (response.isSuccess) {
                console.log('Login successful:', response);
                await AsyncStorage.setItem('userToken', response.data.token);
                // Handle successful login (e.g., navigate to home)
                navigation.navigate("Home" as never); // Adjust the screen name as needed
            } else {
                setError('Login failed: ' + response.messages[0].content);
            }
        } catch (err) {
            // setError('Error: ' + err.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                placeholder="Username"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </TouchableOpacity>
            <Text style={styles.orConnect}>or connect with</Text>
            <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                    <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.signUp}>
                Don't have an account? <Text style={styles.signUpLink}>Sign up</Text>
            </Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#E0E7FF', // Light background color
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff', // White input background
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#4F46E5', // Button color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    forgotPassword: {
        marginBottom: 10,
        color: '#4F46E5', // Link color
    },
    orConnect: {
        marginVertical: 20,
        fontSize: 16,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    socialButton: {
        width: '48%',
        backgroundColor: '#E0E7FF', // Light background for social buttons
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 15,
    },
    socialButtonText: {
        color: '#4F46E5', // Social button text color
    },
    signUp: {
        marginTop: 20,
        fontSize: 16,
    },
    signUpLink: {
        color: '#4F46E5', // Link color
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});

export default LoginForm;
