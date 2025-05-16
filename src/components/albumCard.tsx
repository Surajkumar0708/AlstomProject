import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Album} from '../types';

interface AlbumCardProps {
  album: Album;
  onPress: () => void;
}

const AlbumCard = ({album, onPress}: AlbumCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{uri: album.artworkUrl100}} style={styles.thumbnail} />
      <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
        {album.collectionName}
      </Text>
    </TouchableOpacity>
  );
};

export default AlbumCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  description: {
    color: 'black',
  },
});
