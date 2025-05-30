import { baseUrl, clientId, realm, scope } from '@/constants/env';
import { authorize, refresh, AuthConfiguration } from 'react-native-app-auth';
import { Observable } from 'rxjs';
import { from } from 'rxjs/internal/observable/from';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session'
const issuer= `${baseUrl}/realms/${realm}`; // Your issuer URL
const config:AuthConfiguration = {
    issuer: `${issuer}`, // Your issuer URL
    clientId: `${clientId}`, // Your client ID
    redirectUrl: 'com.mingle://callback', // Your redirect URL
    scopes: scope.split(' ') , // Scopes you want to request
    additionalParameters:{},
    serviceConfiguration: {
        authorizationEndpoint: `${issuer}/protocol/openid-connect/auth`,
        tokenEndpoint: `${issuer}/protocol/openid-connect/token`,
        revocationEndpoint: `${issuer}/protocol/openid-connect/logout`,
    },
}
export function login() {
    const discovery=useAutoDiscovery(issuer);
    const redirectUri =makeRedirectUri()
    const [request, response, promptAsync]=useAuthRequest({
        clientId: clientId,
        scopes: scope.split(' '),
        redirectUri: redirectUri,
    },discovery)
    console.log('request', request);
    console.log('request', promptAsync);
}