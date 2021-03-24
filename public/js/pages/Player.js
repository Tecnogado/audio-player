import { getInfo } from '../utils.js';

import createContext from '../Context/context.js';

import createPlayerData from '../components/PlayerData.js';
import createPlaylist from '../components/Playlist.js';
import createControls from '../components/Controls.js';

(async () => {
  const { baseURL } = await getInfo();
  const { data } = await axios.get(`${baseURL}/files`);

  const context = createContext({
    baseURL,
    currentAudio: null,
    currentAlbum: null,
    continuePlaying: false,
  });

  const playerData = createPlayerData(data.albums, context, document);
  const controls = createControls(playerData.getState(), context, document);
  const playlist = createPlaylist(playerData.getState(), context, document);
  
  context.subscribe(playerData.update, ['currentAudio', 'currentAlbum']);
  context.subscribe(controls.update, ['currentAudio', 'currentAlbum', 'continuePlaying']);
  context.subscribe(playlist.update, ['currentAudio', 'currentAlbum']);

  context.setState({
    currentAudio: 0,
    currentAlbum: 0,
  })
})()