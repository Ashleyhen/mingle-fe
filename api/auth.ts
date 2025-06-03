
import { baseUrl, clientId, realm, scope } from '@/constants/env';
import { CredentialsDto } from '@/protos/protos/mingle_pb';
import * as AuthSession from 'expo-auth-session';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
 
export const issuer = `${baseUrl}/realms/${realm}`;
export const discovery = useAutoDiscovery(issuer);
export const redirectUri = makeRedirectUri();

export const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      scopes: scope.split(' '),
      redirectUri: redirectUri,
    },
    discovery
  );