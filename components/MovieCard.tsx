import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Link } from 'expo-router';
import { Star } from 'lucide-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  date: string;
}

export default function MovieCard({ id, title, posterPath, rating, date }: MovieCardProps) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
  const year = new Date(date).getFullYear();

  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity style={styles.container}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.poster}
          resizeMode="cover"
        />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.details}>
            <View style={styles.rating}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.year}>{year}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: { 
    width: wp('40%'), marginRight: wp('4%'), backgroundColor: '#fff', borderRadius: wp('3%'), 
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: wp('2%'), 
    elevation: 3, 
    ...Platform.select({ web: { cursor: 'pointer' } }) 
  },
  poster: { width: '100%', height: hp('30%'), borderTopLeftRadius: wp('3%'), borderTopRightRadius: wp('3%') },
  info: { padding: wp('3%') },
  title: { fontSize: wp('4%'), fontWeight: '600', marginBottom: hp('1%'), color: '#1a1a1a' },
  details: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rating: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: wp('1%'), fontSize: wp('3.5%'), color: '#666' },
  year: { fontSize: wp('3.5%'), color: '#666' },
});