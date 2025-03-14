import { View, Text, StyleSheet } from 'react-native';
import { useAuthStore } from '@/stores/auth';

export default function HomeScreen() {
  const username = useAuthStore((state) => state.username);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {username}!</Text>
      <Text style={styles.description}>
        This is your personalized home screen. Start exploring our features!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});