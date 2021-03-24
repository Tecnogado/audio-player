import playerData from './playerData.js';

const playlist = {
    index: 0,
    start() {
        playerData.albums[playerData.currentAlbum].audios.map((e) => this.loadPlaylist());
        this.update();
    },
    loadPlaylist() {
        let playlist = document.querySelector('#playlist__list');
        let playlistCard = document.createElement('li');
        let playlistImg = document.createElement('img');
        let playlistContainer = document.createElement('div');
        let playlistTitle = document.createElement('h5');
        let playlistArtist = document.createElement('p');
        
        playlistCard.classList.add('playlist__card');
        playlistImg.classList.add('playlist__img');
        playlistContainer.classList.add('playlist__container');
        playlistTitle.classList.add('playlist__title');
        playlistArtist.classList.add('playlist__artist');
        
        playlistCard.setAttribute('index', this.index);
        playlistImg.style.background = `url('${playerData.albums[playerData.currentAlbum].audios[this.index].cover}') no-repeat center center / cover`;
        playlistTitle.innerText = playerData.albums[playerData.currentAlbum].audios[this.index].title;
        playlistArtist.innerText = playerData.albums[playerData.currentAlbum].audios[this.index].artist;
        
        playlistCard.addEventListener('click', (e) => {
            playerData.currentAudio = parseInt(playlistCard.getAttribute('index'));
            playerData.update();
            this.update();
        });

        playlistCard.appendChild(playlistImg);
        playlistCard.appendChild(playlistContainer);
        playlistContainer.appendChild(playlistTitle);
        playlistContainer.appendChild(playlistArtist);
        
        playlist.appendChild(playlistCard);
        this.index++;
    },
    update() {
        document.querySelectorAll('.playlist__card').forEach(card => {
            if (parseInt(card.getAttribute('index')) === playerData.currentAudio) {
                card.classList.add('playlist__card--active');
            } else {
                if (card.classList.contains('playlist__card--active')) {
                    card.classList.remove('playlist__card--active');
                }
            }
        })
    },
    cleanPlaylist() {
        //Work in the future
        let playlist = document.querySelector('#playlist__list');
        playlist.innerHTML = '';
        this.index = 0;
        playerData.albums[playerData.currentAlbum].audios.map((e) => this.loadPlaylist());
    }
};

export default playlist;