import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/stores/auth';
import { LogOut } from 'lucide-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function ProfileScreen() {
  const { username, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.email}>{username}@example.com</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={24} color="white" style={styles.icon} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: wp('5%'), backgroundColor: '#fff' },
  header: { marginBottom: hp('4%') },
  username: { fontSize: wp('6%'), fontWeight: 'bold', marginBottom: hp('1%') },
  email: { fontSize: wp('4%'), color: '#666' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF3B30', padding: hp('2%'), borderRadius: wp('3%'), justifyContent: 'center' },
  logoutText: { color: '#fff', fontSize: wp('4.5%'), fontWeight: '600', marginLeft: wp('2%') },
  icon: { marginRight: wp('2%') },
});