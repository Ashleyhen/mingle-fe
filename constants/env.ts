// config.ts (or config.js)
import Constants from 'expo-constants';

// Get the value from app.config.js
export const realm=Constants.expoConfig?.extra?.REALM || "";
export const baseUrl:string = Constants.expoConfig?.extra?.GATEWAY_HOEST || "";
export const clientId = Constants.expoConfig?.extra?.CLIENT_ID || "";
export const scope = Constants.expoConfig?.extra?.SCOPE || "";
export const issuer = `${baseUrl}/realms/${realm}`;
// Optional: Add type safety
interface AppConfig {
  GATEWAY_HOEST: string;
  REALMS: string;
  // Add other config properties as needed
}

const getConfig = (): AppConfig => ({
  GATEWAY_HOEST: Constants.expoConfig?.extra?.GATEWAY_HOEST || "",
  REALMS: Constants.expoConfig?.extra?.REALMS || "",
  // Initialize other config properties
});

// http://localhost:8000/realms/mingle/protocol/openid-connect/token