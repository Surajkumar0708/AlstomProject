import React from 'react';
import {Text, StyleSheet, ScrollView, Image} from 'react-native';

const AlbumDetailsScreen = ({route}: any) => {
  const {album} = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{uri: album.artworkUrl100}} style={styles.image} />
      <Text style={styles.title}>{album.collectionName}</Text>
      <Text>Artist: {album.artistName}</Text>
      <Text>Genre: {album.primaryGenreName}</Text>
      <Text>Release Date: {new Date(album.releaseDate).toDateString()}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default AlbumDetailsScreen;
