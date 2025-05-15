import axios from 'axios';
import {fetchCachedAlbums, setAlbumsForOffline} from '../utils/offline/offline';

export const fetchAlbums = async (isConnected: boolean | null) => {
  try {
    if (isConnected) {
      const response = await axios.get(
        'https://itunes.apple.com/search?term=jack+johnson&entity=album',
      );
      await setAlbumsForOffline(response?.data?.results);
      return response?.data?.results || [];
    } else {
      return await fetchCachedAlbums();
    }
  } catch (e) {
    console.log(e);
  }
};
