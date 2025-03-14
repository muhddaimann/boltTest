import { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useMoviesStore } from '@/stores/movies';
import MovieCard from '@/components/MovieCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


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
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: hp("2%") },
  title: { fontSize: hp("4%"), fontWeight: 'bold', color: '#1a1a1a' },
  subtitle: { fontSize: hp("2%"), color: '#666', marginTop: hp("0.5%") },
  movieList: { padding: hp("2%") },
  error: { padding: hp("2%"), color: 'red', textAlign: 'center' },
});