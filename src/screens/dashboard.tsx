import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import {fetchAlbums} from '../api/albums';
import AlbumCard from '../components/albumCard';
import {Album} from '../types';
import {useNetInfo} from '@react-native-community/netinfo';

const DashboardScreen = ({navigation}: any) => {
  const [albums, setAlbums] = React.useState<Album[]>([]);
  const [isLoading, setIsLoading] = React.useState<Boolean>(true);
  const {isConnected = false} = useNetInfo();

  React.useEffect(() => {
    (async () => {
      const res = await fetchAlbums(isConnected);
      setAlbums(res);
      setIsLoading(false);
    })();
  }, [isConnected]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (albums?.length === 0) {
    return (
      <View style={styles.center}>
        <Text>
          No albums available offline. Please connect to the internet and try
          again.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={albums}
      keyExtractor={item => item.collectionId.toString()}
      renderItem={({item}: {item: Album}) => (
        <AlbumCard
          album={item}
          onPress={() => navigation.navigate('AlbumDetails', {album: item})}
        />
      )}
      ListEmptyComponent={
        <Text style={{padding: 20}}>No Albums Available</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default DashboardScreen;
