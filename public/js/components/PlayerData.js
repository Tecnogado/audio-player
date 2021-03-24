export default function createPlayerData(albums, context, document) {
  const state = {
    album: document.querySelector('#playlist__name p'),
    audio: document.querySelector('#card__audio'),
    title: document.querySelector('#card__title'),
    artist: document.querySelector('#card__artist a'),
    cover: document.querySelector('#card__img'),
    albums: albums,
  }

  function nextSong() {
    const { currentAudio, currentAlbum } = context.getState();
    if (currentAudio < (state.albums[currentAlbum].audios.length - 1))
      context.setState({ currentAudio: currentAudio + 1 });
    else
      context.setState({ currentAudio: 0, continuePlaying: false });
  }

  function nextAlbum() {
    const { currentAudio, currentAlbum } = context.getState();
    //Work in the future
    if (currentAlbum < (state.albums.length - 1)) {
      context.setState({
        currentAudio: 0,
        currentAlbum: currentAlbum + 1,
      });
    } else {
      context.setState({
        currentAudio: 0,
        currentAlbum: 0,
      });
    }
    // playlist.cleanPlaylist();
  }

  function update() {
    const { currentAudio, currentAlbum } = context.getState();

    state.album.innerText = state.albums[currentAlbum].album;
    if (state.albums[currentAlbum].audios[currentAudio].cover !== "") {
      state.cover.style.background = `url('/songs/${state.albums[currentAlbum].audios[currentAudio].cover}') no-repeat center center / cover`;
    } else {
      state.cover.style.background = "url('https://via.placeholder.com/300') no-repeat center center / cover";
    }
    state.audio.src = `/songs/${state.albums[currentAlbum].audios[currentAudio].file}`;
    state.title.innerText = state.albums[currentAlbum].audios[currentAudio].title;
    state.artist.innerText = state.albums[currentAlbum].audios[currentAudio].artist;
    state.audio.onended = () => nextSong();
  }

  function getState() {
    return state;
  }

  return {
    update,
    getState,
  }
}
