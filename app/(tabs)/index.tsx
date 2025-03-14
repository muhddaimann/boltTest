import { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useMoviesStore } from '@/stores/movies';
import MovieCard from '@/components/MovieCard';

export default function DiscoverScreen() {
  const { trending, loading, error, fetchTrending } = useMoviesStore();

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchTrending} />
      }>
      <View style={styles.header}>
        <Text style={styles.title}>Trending Movies</Text>
        <Text style={styles.subtitle}>Discover what's hot this week</Text>
      </View>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.movieList}>
          {trending.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              rating={movie.vote_average}
              date={movie.release_date}
            />
          ))}
        </ScrollView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  movieList: {
    padding: 16,
  },
  error: {
    padding: 16,
    color: 'red',
    textAlign: 'center',
  },
});