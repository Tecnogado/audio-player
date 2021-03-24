import { secondsToMinutes } from './utils.js';
import playerData from './playerData.js';

const controls = {
    playPauseButton: document.querySelector('#action__button'),
    volumeButton: document.querySelector('#volume__container img'),
    progressBar : document.querySelector('#progress__bar'),
    currentProgress : document.querySelector('#current__progress'),
    totalProgress : document.querySelector('#total__progress'),
    volumeBar : document.querySelector('#volume__bar'),
    //nextAlbum : document.querySelector('#next__album'),
    start() {
        this.update();
        playerData.audio.ontimeupdate = (e) => {
            this.currentProgress.innerText = secondsToMinutes(playerData.audio.currentTime);
            this.progressBar.value = playerData.audio.currentTime;
        }
        this.volumeBar.oninput = (e) => {
            playerData.audio.volume = this.volumeBar.value / 100;
            if (this.volumeBar.value == 0) this.volumeButton.src = './assets/volume-mute-icon.svg';
            else this.volumeButton.src = './assets/volume-up-icon.svg';
        }
        this.progressBar.oninput = (e) => playerData.audio.currentTime = this.progressBar.value;
        this.playPauseButton.onclick = (e) => this.pausePlay();
        this.volumeButton.onclick = (e) => this.mute();
        //this.nextAlbum.onclick = (e) => playerData.nextAlbum();
    },
    update() {
        playerData.audio.onloadeddata = (e) => {
            this.progressBar.value = 0;
            this.playPauseButton.innerHTML = '<img src="./assets/play-icon.svg" alt="">';
            this.progressBar.max = playerData.audio.duration;
            this.totalProgress.innerText = secondsToMinutes(playerData.audio.duration);
        }
    },
    pausePlay() {
        if (!playerData.audio.paused) {
            playerData.audio.pause();
            this.playPauseButton.innerHTML = '<img src="./assets/play-icon.svg" alt="">';
        } else {
            playerData.audio.play();
            this.playPauseButton.innerHTML = '<img src="./assets/pause-icon.svg" alt="">';
        }
    },
    mute() {
        if (!playerData.audio.muted) {
            playerData.audio.muted = true,
            this.volumeBar.value = 0;
            this.volumeButton.src = './assets/volume-mute-icon.svg';
        } else {
            playerData.audio.muted = false;
            this.volumeBar.value = 100;
            this.volumeButton.src = './assets/volume-up-icon.svg';
        }
    }
}

export default controls;