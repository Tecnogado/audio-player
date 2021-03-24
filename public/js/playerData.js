import { path } from './utils.js'
import controls from './controls.js';
import playlist from './playlist.js';

const playerData = {
    album: document.querySelector('#playlist__name p'),
    audio: document.querySelector('#card__audio'),
    title: document.querySelector('#card__title'),
    artist: document.querySelector('#card__artist a'),
    cover: document.querySelector('#card__img'),
    currentAudio: 0,
    currentAlbum: 0,
    albums: null,
    start(database) {
        this.albums = database.data;
        this.update();
        controls.start();
        playlist.start();
    },
    update() {
        this.album.innerText = this.albums[this.currentAlbum].album;
        this.audio.src = path(this.albums[this.currentAlbum].audios[this.currentAudio].file);
        this.title.innerText = this.albums[this.currentAlbum].audios[this.currentAudio].title;
        this.artist.innerText = this.albums[this.currentAlbum].audios[this.currentAudio].artist;
        this.cover.style.background = `url('${this.albums[this.currentAlbum].audios[this.currentAudio].cover}') no-repeat center center / cover`;
        this.audio.onended = (e) => this.nextSong();
        controls.update();
        playlist.update();
    },
    nextSong() {
        if (this.currentAudio < (this.albums[this.currentAlbum].audios.length - 1)) this.currentAudio++;
        else this.currentAudio = 0;
        this.update();
    },
    nextAlbum() {
        //Work in the future
        if (this.currentAlbum < (this.albums.length - 1)) {
            this.currentAlbum++;
            this.currentAudio = 0;
        } else {
            this.currentAlbum = 0;
            this.currentAudio = 0;
        }
        playlist.cleanPlaylist();
        this.update();
    }
}

export default playerData;