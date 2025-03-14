import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="movie/[id]" 
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerBackTitle: 'Back',
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}