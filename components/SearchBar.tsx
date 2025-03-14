import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { Search } from 'lucide-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search movies...',
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Search size={20} color="#666" style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', 
    borderRadius: wp('3%'), paddingHorizontal: wp('4%'), 
    paddingVertical: Platform.OS === 'ios' ? hp('1.5%') : hp('1%'), 
    marginHorizontal: wp('4%'), marginVertical: hp('1%') 
  },
  icon: { marginRight: wp('2%') },
  input: { 
    flex: 1, fontSize: wp('4%'), color: '#1a1a1a', 
    ...Platform.select({ web: { outline: 'none' } }) 
  },
});