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
import Toast from '../components/toast';

const DashboardScreen = ({navigation}: any) => {
  const [albums, setAlbums] = React.useState<Album[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [showToast, setShowToast] = React.useState<boolean>(false);
  const {isConnected = false} = useNetInfo();

  React.useEffect(() => {
    (async () => {
      const res = await fetchAlbums(isConnected);
      setAlbums(res);
      setIsLoading(false);
    })();
  }, [isConnected]);

  React.useEffect(() => {
    if (!isConnected) {
      setShowToast(true);
    }
  }, [isConnected]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="black" />
        <Text style={styles.textColor}>Loading...</Text>
      </View>
    );
  }

  if (albums?.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.textColor}>
          No albums available offline. Please connect to the internet and try
          again.
        </Text>
      </View>
    );
  }

  return (
    <React.Fragment>
      <Toast
        show={showToast}
        message="No internet connection"
        onHide={() => setShowToast(false)}
      />
      <FlatList
        testID="albumList"
        data={albums}
        keyExtractor={item => item.collectionId.toString()}
        renderItem={({item}: {item: Album}) => (
          <AlbumCard
            album={item}
            onPress={() => navigation.navigate('AlbumDetails', {album: item})}
          />
        )}
        ListEmptyComponent={
          <Text style={[{padding: 20}, styles.textColor]}>
            No Albums Available
          </Text>
        }
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  textColor: {
    color: 'black',
  },
});

export default DashboardScreen;
