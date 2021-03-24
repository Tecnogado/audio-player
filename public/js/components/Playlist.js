export default function createPlaylist(playerState, context, document) {
  function cleanPlaylist() {
    //Work in the future
    const { currentAlbum } = context.getState();

    const playlist = document.querySelector('#playlist__list');
    playlist.innerHTML = '';
    state.index = 0;
    playerState.albums[currentAlbum].audios.map(() => loadPlaylist());
}

  function loadPlaylistCard(currentAlbum, index) {
    const playlist = document.querySelector('#playlist__list');
    const playlistCard = document.createElement('li');
    const playlistImg = document.createElement('img');
    const playlistContainer = document.createElement('div');
    const playlistTitle = document.createElement('h5');
    const playlistArtist = document.createElement('p');
    
    playlistCard.classList.add('playlist__card');
    playlistImg.classList.add('playlist__img');
    playlistContainer.classList.add('playlist__container');
    playlistTitle.classList.add('playlist__title');
    playlistArtist.classList.add('playlist__artist');
    
    playlistCard.setAttribute('index', index);
    if (playerState.albums[currentAlbum].audios[index].cover !== '') {
      playlistImg.style.background = `url('/songs/${playerState.albums[currentAlbum].audios[index].cover}') no-repeat center center / cover`;
    } else {
      playlistImg.style.background = "url('https://via.placeholder.com/300') no-repeat center center / cover";
    }
    playlistTitle.innerText = playerState.albums[currentAlbum].audios[index].title;
    playlistArtist.innerText = playerState.albums[currentAlbum].audios[index].artist;
    
    playlistCard.addEventListener('click', () => {
      context.setState({
        currentAudio: parseInt(playlistCard.getAttribute('index')),
      });
    });

    playlistCard.appendChild(playlistImg);
    playlistCard.appendChild(playlistContainer);
    playlistContainer.appendChild(playlistTitle);
    playlistContainer.appendChild(playlistArtist);
    
    playlist.appendChild(playlistCard);
  }

  function loadPlaylist() {
    const { currentAlbum } = context.getState();

    document.querySelector('#playlist__list').innerHTML = '';
    playerState.albums[currentAlbum].audios.forEach((_, index) => loadPlaylistCard(currentAlbum, index));
  }

  function update() {
    loadPlaylist();

    const { currentAudio } = context.getState();

    document.querySelectorAll('.playlist__card').forEach(card => {
      if (parseInt(card.getAttribute('index')) === currentAudio) {
        card.classList.add('playlist__card--active');
      } else {
        if (card.classList.contains('playlist__card--active')) {
          card.classList.remove('playlist__card--active');
        }
      }
    });
  }

  return {
    update,
  }
}
