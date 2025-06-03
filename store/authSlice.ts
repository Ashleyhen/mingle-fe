import * as AuthSession from 'expo-auth-session';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { clientId } from '@/constants/env';
import { from, lastValueFrom } from 'rxjs';
import { DiscoveryDocument, TokenResponseConfig, useAutoDiscovery } from 'expo-auth-session';
import { useDispatch } from 'react-redux';

 
type AuthState = {
  accessToken: TokenResponseConfig | null;
};

const initialState: AuthState = {
  accessToken: null,
};

// const dispatch = useDispatch();

// export const refreshAccessToken = createAsyncThunk(
//   'auth/refreshAccessToken',
//   async (
//     {
//       accessToken,
//       refreshToken,
//       scope,
//     }: {
//       accessToken: string;
//       refreshToken: string;
//       scope?: string;
//     },
//     { dispatch }
//   ) => {
//     if (!isTokenExpired(accessToken)) return Promise.resolve(accessToken);

//     if (!discovery) {
//       return Promise.reject(new Error('Discovery document is not available'));
//     }

//     const refresh$ = from(
//       AuthSession.refreshAsync(
//         { clientId, refreshToken, scopes: scope ? scope.split(' ') : undefined },
//         discovery
//       )
//     );

//     // Return the promise directly, no await
//     return lastValueFrom(refresh$).then(refreshed => {
//       dispatch(setAccessToken(refreshed.accessToken));
//       if (refreshed.refreshToken) {
//         dispatch(setRefreshToken(refreshed.refreshToken));
//       }
//       return refreshed.accessToken;
//     });
//   }
// );

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (discovery:DiscoveryDocument, thunkAPI) => {
    const authState = thunkAPI.getState() as { auth: AuthState };
    const accessToken = authState.auth.accessToken;
    // const discovery = useAutoDiscovery(issuer);
    if (!accessToken || !isTokenExpired(accessToken)) return Promise.resolve(accessToken);
    if (!discovery) {
      return Promise.reject(new Error('Discovery document is not available'));
    }

    
    const refreshToken = accessToken.refreshToken || '';
    const scope = accessToken.scope || '';
    const refreshed = 
      await AuthSession.refreshAsync(
        { clientId, refreshToken, scopes: scope ? scope.split(' '):[]  },
        discovery
      )

      console.log('refereshed!:', refreshed);
    // Return the promise directly, no await
    return refreshed;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<TokenResponseConfig>) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(refreshAccessToken.fulfilled, (state, action: PayloadAction<TokenResponseConfig | null>) => {
      state.accessToken = action.payload;
    });
  },
});

export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;

export function isTokenExpired(token: TokenResponseConfig): boolean {
  if (!token || token.expiresIn === undefined) return true;
  // expiresIn: number of seconds the token is valid after issuedAt
  const expiry = (token.issuedAt ?? 0) + token.expiresIn;
  return expiry < Date.now() / 1000; // true if expired
}