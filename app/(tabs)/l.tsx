import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useMoviesStore } from '@/stores/movies';
import SearchBar from '@/components/SearchBar';
import MovieCard from '@/components/MovieCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const { searchResults, loading, error, searchMovies } = useMoviesStore();

  useEffect(() => {
    const debounce = setTimeout(() => {
      searchMovies(query);
    }, 500);

    return () => clearTimeout(debounce);
  }, [query]);

  const renderItem = ({ item }: any) => (
    <View style={styles.movieCard}>
      <MovieCard
        id={item.id}
        title={item.title}
        posterPath={item.poster_path}
        rating={item.vote_average}
        date={item.release_date}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChangeText={setQuery} />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.results}
          ListEmptyComponent={
            !loading ? (
              <Text style={styles.empty}>
                {query ? 'No movies found' : 'Start searching for movies'}
              </Text>
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  results: { padding: wp('2%') },
  movieCard: { flex: 1, padding: wp('2%') },
  error: { padding: hp('2%'), color: 'red', textAlign: 'center' },
  empty: { padding: hp('2%'), textAlign: 'center', color: '#666' },
});
