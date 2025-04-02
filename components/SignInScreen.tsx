import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import login  from '@/api/UserApi';
import { CredentialsDto } from '@/protos/protos/user_pb';
import { Alert } from 'react-native';


export default function SignInScreen({ navigation }: { navigation: NavigationProp<any> }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    const credentials= new CredentialsDto();
    credentials.setEmail(email);
    credentials.setPassword(password);
    login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        navigation.navigate('New Account');
      },
      error: (err) => {
        console.error('Login failed:', err);
        console.log('Error message:', err.message);
        Alert.alert(
          'Login Failed', // Title of the popup
          err.message || 'An unknown error occurred.', // Error message to display
          [{ text: 'OK', onPress: () => console.log('Popup dismissed') }] // Action for the "OK" button
        );
      },
    });
  };
  // const loginWithPopup = (credentials) => {
  //   login(credentials).subscribe({
  //     next: (response) => {
  //       console.log('Login successful:', response);
  //       navigation.navigate('New Account');
  //     },
  //     error: (err) => {
  //       console.error('Login failed:', err);
  
  //       // Display popup with error message
  //       Alert.alert(
  //         'Login Failed', // Title of the popup
  //         err.message || 'An unknown error occurred.', // Error message to display
  //         [{ text: 'OK', onPress: () => console.log('Popup dismissed') }] // Action for the "OK" button
  //       );
  //     },
  //   });
  // };
  
  

  return (
    <View style={styles.container}>
        <View style={styles.form}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />
        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <Text style={styles.separatorText}>or</Text>
          <View style={styles.line} />
        </View>
        <Text style={{ color: 'grey', textAlign: 'center' }}>Forgot Password?</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
        <FacebookIcon style={styles.icon}/>
        <AppleIcon style={styles.icon}/>
        <GoogleIcon style={styles.icon}/>
        </View>
        <Text style={{ textAlign: 'center', marginTop: 16 }}>
          Need an account? <Text style={styles.createAccount  }>SIGN UP</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  
  form: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 50,
    textAlign: 'center',
    borderRadius: 10,
    margin: '3%',
    width: '33%',
    minWidth: 300,
  },
// Removed invalid media query
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  separatorText: {
    marginHorizontal: 8,
    fontSize: 16,
    color: 'gray',
  },
  icon: {
    margin: 16,
  },
  createAccount: {
    textDecorationLine: 'underline',
    textAlign: 'center'
  }
});