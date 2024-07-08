import { transpileModule } from "typescript";

export const oktaConfig = {
    clientId: '0oagjmiambJL4oO2L697',
    issuer: 'https://trial-8073086.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid','profile','email'],
    pkce: true,
    disableHttpsCheck: true,
}