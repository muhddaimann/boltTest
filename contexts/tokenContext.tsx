import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'staffToken';
const EXPIRATION_KEY = 'tokenExpiration';

export const storeToken = async (token: string, expiration: number): Promise<void> => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(EXPIRATION_KEY, expiration.toString());
  } catch (error) {
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const expiration = await SecureStore.getItemAsync(EXPIRATION_KEY);
    if (token && expiration) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime < parseInt(expiration, 10)) {
        return token;
      } else {
        await removeToken();
        return null;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(EXPIRATION_KEY);
  } catch (error) {
  }
};
  