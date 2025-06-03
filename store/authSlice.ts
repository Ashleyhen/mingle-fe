import * as AuthSession from 'expo-auth-session';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { clientId } from '@/constants/env';
import { discovery } from '@/api/auth';

type AuthState = {
  accessToken: AuthSession.TokenResponse | null;
};

const initialState: AuthState = {
  accessToken: null,
};

// export const refreshAccessToken = createAsyncThunk(
//   'auth/refreshAccessToken',
//   async (
//     {
//       tokenResponse,
//     }: {
//       tokenResponse: AuthSession.TokenResponse;
//     },
//     { dispatch }
//   ) => {
//     // Only refresh if expired
//     if (!isTokenExpired(tokenResponse)) return tokenResponse;
    
//     const { refreshToken, scope } = tokenResponse;
//     if (!discovery) {
//       throw new Error('Discovery document is not available');
//     }
//     const refreshed = await AuthSession.refreshAsync(
//       { clientId, refreshToken, scopes: scope ? scope.split(' ') : undefined },
//       discovery
//     );
//     dispatch(setAccessToken(refreshed));
    
//     return refreshed.accessToken;
//   }
// );

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<AuthSession.TokenResponse>) => {
      state.accessToken = action.payload;
    },
    
  
  },
});

export const { setAccessToken   } = authSlice.actions;
export default authSlice.reducer;

// Utility to check if a JWT is expired
export function isTokenExpired(token: AuthSession.TokenResponse): boolean {
  if (!token) return true;
  const expiresIn = token.expiresIn ?? 0;
  return token.issuedAt + expiresIn < Math.floor(Date.now() / 1000);
  
}