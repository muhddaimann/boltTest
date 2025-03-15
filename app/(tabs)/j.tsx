import { View, Text, StyleSheet } from 'react-native';
import { useAuthStore } from '@/contexts/api/auth';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

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
  container: { flex: 1, padding: wp('5%'), backgroundColor: '#fff' },
  welcome: { fontSize: wp('6%'), fontWeight: 'bold', marginBottom: hp('2%') },
  description: { fontSize: wp('4%'), color: '#666', lineHeight: hp('3%') },
});