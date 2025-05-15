import AsyncStorage from '@react-native-async-storage/async-storage';
import {Album} from '../../types';
export const ALBUMS_LIST = 'albums-list';

export const fetchCachedAlbums = async () => {
  try {
    const res: any = await AsyncStorage.getItem(ALBUMS_LIST);
    const parsedList = JSON.parse(res);
    return parsedList || [];
  } catch (e) {
    console.log(e);
  }
};

export const setAlbumsForOffline = async (list: Album[]) => {
  const albumsList = JSON.stringify(list);
  await AsyncStorage.setItem(ALBUMS_LIST, albumsList);
};
