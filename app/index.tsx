import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { LogIn } from 'lucide-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Our App</Text>
        <Text style={styles.subtitle}>Your one-stop solution for everything</Text>
        
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.button}>
            <LogIn size={24} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: wp('5%') },
  title: { fontSize: wp('8%'), fontWeight: 'bold', marginBottom: hp('1.5%'), textAlign: 'center' },
  subtitle: { fontSize: wp('4.5%'), color: '#666', textAlign: 'center', marginBottom: hp('5%') },
  button: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#007AFF', paddingVertical: hp('2%'), paddingHorizontal: wp('7%'), borderRadius: wp('3%') },
  buttonText: { color: '#fff', fontSize: wp('4.5%'), fontWeight: '600', marginLeft: wp('2%') },
  icon: { marginRight: wp('2%') },
});
