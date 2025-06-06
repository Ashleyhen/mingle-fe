import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import {loginApi}  from '@/api/UserApi';
import { green, grey, lightBlue, red } from '@mui/material/colors';
import { ErrorDetailResponse } from '@/protos/protos/ErrorDetailResponse_pb';
import { CredentialsDto } from '@/protos/protos/mingle_pb';
import { useErrorAlert } from './ui/dialogBoxs/ErrorAlertContext';
import { useMemo, useState, useEffect, useContext } from 'react';
import { useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import { makeRedirectUri } from 'expo-auth-session';
import { baseUrl, clientId, issuer, realm, scope } from '@/constants/env';
import * as AuthSession from 'expo-auth-session';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAccessToken, setAccessToken  } from '@/store/authSlice';
import { AppDispatch, RootState } from '@/store';
import { from } from 'rxjs';
import mingleUserSlice, { setMingleUser } from '@/store/mingleUserSlice';


export default function SignInScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showError } = useErrorAlert();
  const dispatch = useDispatch();

  const discovery = useAutoDiscovery(issuer);
  const redirectUri = makeRedirectUri()
  const tokenSelector=useSelector((state:RootState) => state.auth.accessToken) ;
  ;
  // https://rene-wilby.de/en/blog/rn-expo-oauth-authorization-code-flow-pkce-keycloak
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      scopes: scope.split(' '),
      redirectUri: redirectUri,
    },
    discovery
  );

  // Parse code from URL on mount (for web)
  useEffect(() => {
    const url = window.location.href;
    const match = url.match(/[?&]code=([^&]+)/);
    if (match && discovery) {
      const code = decodeURIComponent(match[1]);
      const codeVerifier = localStorage.getItem('pkce_code_verifier') ?? undefined;

      // Wrap the async call in an Observable
      const token$ = from(
        AuthSession.exchangeCodeAsync(
          {
            clientId,
            code,
            redirectUri,
            extraParams: {
              code_verifier: codeVerifier ?? '',
            },
          },
          discovery
        )
      );

      token$.subscribe({
        next: (tokenResponse) => {
          const credentials = new CredentialsDto();
          loginApi(credentials, tokenResponse.accessToken).subscribe({
            next: (response) => {
              console.log('Login successful:', response);
              console.log('Access Token:', tokenResponse.accessToken);
              dispatch(setMingleUser(response)); // Dispatch action to set access token in Redux store
              navigation.navigate("Home");
            },
            error: (err) => {
              console.error('Login failed:', err);
              showError(err);
            },
          });

          // Optionally, clear the codeVerifier from storage
          localStorage.removeItem('pkce_code_verifier');
          window.history.replaceState({}, document.title, window.location.pathname);
        },
        error: (err) => {
          showError(err);
        },
      });
    }
  }, [discovery]);

  const navigateToCreateAccount = () => navigation.navigate('New Account');

  const handleLogin = async () => {
    if (request?.codeVerifier) {
      localStorage.setItem('pkce_code_verifier', request.codeVerifier);
    }
    await promptAsync()  
  };

  return (
    <View style={styles.container}>
        <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
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
          Need an account? 
        </Text>
        <View style={{ paddingVertical: '2%' }}>
        <Button title="Sign up" color={green[300]} onPress={navigateToCreateAccount} />
        </View>
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