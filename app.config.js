// app.config.js
module.exports = {
  expo: {
    extra: {
      // Default development value
      GATEWAY_HOEST: "http://localhost:8080",
      REALM: "mingle",
      CLIENT_ID: 'mingle-user-client',
      SCOPE: 'openid',
    }
  }
};
// http://localhost:8000/realms/mingle/protocol/openid-connect/token