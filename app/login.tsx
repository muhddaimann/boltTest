import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/stores/auth';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    login(username, password);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: wp('5%'), justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: wp('8%'), fontWeight: 'bold', marginBottom: hp('4%'), textAlign: 'center' },
  input: { backgroundColor: '#f5f5f5', padding: hp('2%'), borderRadius: wp('3%'), marginBottom: hp('2%'), fontSize: wp('4%') },
  button: { backgroundColor: '#007AFF', padding: hp('2%'), borderRadius: wp('3%'), alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: wp('4.5%'), fontWeight: '600' },
  error: { color: 'red', marginBottom: hp('2%'), textAlign: 'center' },
});