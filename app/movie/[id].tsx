import { useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useMoviesStore } from '@/contexts/api/movie';
import { Star, Calendar } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function MovieScreen() {
  const { id } = useLocalSearchParams();
  const { selectedMovie, loading, error, getMovieDetails } = useMoviesStore();

  useEffect(() => {
    if (id) {
      getMovieDetails(Number(id));
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!selectedMovie) {
    return null;
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`;
  const releaseDate = new Date(selectedMovie.release_date).toLocaleDateString();

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: backdropUrl }} style={styles.backdrop} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={{ uri: posterUrl }} style={styles.poster} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{selectedMovie.title}</Text>
            <View style={styles.stats}>
              <View style={styles.rating}>
                <Star size={20} color="#FFD700" fill="#FFD700" />
                <Text style={styles.ratingText}>
                  {selectedMovie.vote_average.toFixed(1)}
                </Text>
              </View>
              <View style={styles.date}>
                <Calendar size={20} color="#666" />
                <Text style={styles.dateText}>{releaseDate}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.overview}>
          <Text style={styles.overviewTitle}>Overview</Text>
          <Text style={styles.overviewText}>{selectedMovie.overview}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    width,
    height: width * 0.5625, // 16:9 aspect ratio
  },
  content: {
    marginTop: -50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 16,
    color: '#666',
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 4,
    fontSize: 16,
    color: '#666',
  },
  overview: {
    marginTop: 24,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  overviewText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  error: {
    color: 'red',
  },
});