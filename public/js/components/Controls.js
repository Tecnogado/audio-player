import { secondsToMinutes } from '../utils.js';

export default function createControls(playerState, context, document) {
  const state = {
    playPauseButton: document.querySelector('#action__button'),
    volumeButton: document.querySelector('#volume__container img'),
    progressBar: document.querySelector('#progress__bar'),
    currentProgress: document.querySelector('#current__progress'),
    totalProgress: document.querySelector('#total__progress'),
    volumeBar: document.querySelector('#volume__bar'),
  }

  function handlePauseAndPlay() {
    if (!playerState.audio.paused) {
      playerState.audio.pause();
      context.setState({ continuePlaying: false });
      playerState.audio.removeAttribute('autoplay');
      state.playPauseButton.innerHTML = '<img src="/assets/play-icon.svg" alt="Play Button">';
    } else {
      playerState.audio.play();
      context.setState({ continuePlaying: true });
      playerState.audio.setAttribute('autoplay', '');
      state.playPauseButton.innerHTML = '<img src="/assets/pause-icon.svg" alt="Pause Button">';
    }
  }

  function handleMute() {
    if (!playerState.audio.muted) {
      playerState.audio.muted = true
      state.volumeBar.value = 0;
      state.volumeButton.src = '/assets/volume-mute-icon.svg';
    } else {
      playerState.audio.muted = false;
      state.volumeBar.value = 100;
      state.volumeButton.src = '/assets/volume-up-icon.svg';
    }
  }

  function setupEvents() {
    playerState.audio.ontimeupdate = () => {
      state.currentProgress.innerText = secondsToMinutes(playerState.audio.currentTime);
      state.progressBar.value = playerState.audio.currentTime;
    };

    state.volumeBar.oninput = () => {
      playerState.audio.volume = state.volumeBar.value / 100;
      if (state.volumeBar.value == 0)
        state.volumeButton.src = '/assets/volume-mute-icon.svg';
      else
        state.volumeButton.src = '/assets/volume-up-icon.svg';
    };

    state.progressBar.oninput = () =>
      playerState.audio.currentTime = state.progressBar.value;

    state.playPauseButton.onclick = () => handlePauseAndPlay();

    state.volumeButton.onclick = () => handleMute();
    //state.nextAlbum.onclick = () => playerState.nextAlbum();
  }

  function update() {
    const { continuePlaying } = context.getState();

    playerState.audio.onloadeddata = () => {
      state.progressBar.value = 0;
      state.progressBar.max = playerState.audio.duration;
      state.totalProgress.innerText = secondsToMinutes(playerState.audio.duration);

      if (continuePlaying)
        state.playPauseButton.innerHTML = '<img src="/assets/pause-icon.svg" alt="Pause Button">';
      else {
        if (playerState.audio.hasAttribute('autoplay')) {
          playerState.audio.removeAttribute('autoplay');
          playerState.audio.pause();
          playerState.audio.currentTime = 0;
        }
        state.playPauseButton.innerHTML = '<img src="/assets/play-icon.svg" alt="Play Button">';
      }
    };

    setupEvents();
  }

  return {
    update,
  }
}
