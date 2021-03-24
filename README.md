# The project
Simple personal project for training file structuring and event management from javascript. The result: customized audio player.

![Screenshots-v1.0](https://raw.githubusercontent.com/Tecnogado/audio-player/master/screenshots/audio-player-1.0.png)

## What it can do?
You can run it on a server to listen to your favorite music or podcasts just like a spotify.

## How it works?
The server initializes all the routes (player and upload, at the moment), as well the scripts in the 'js' folder to run the aplication properly. These js files write the details of the current song and playlist directly in the html, using events of the html to manage the interactions (pause, play, next song, mute and so on).

## How do I test?
For the moment you can only clone/download the project and test on your local computer, but I intend to make a live example in the future.

After cloning / downloading the project you will need to run:
```bash
$ yarn install
$ yarn start
```
If you use npm, run this instead:
```bash
$ npm install
$ npm run start
```
Then open it in `localhost:5500/player` or `YOUR_IP:5500/player`.

To upload songs and covers you will need to open `localhost:5500/upload` or `YOUR_IP:5500/upload`, fill in the inputs and submit the files.

## To do list
- [x] Implement the system of songs management;
- [x] Implement the system of upload songs and cover to the files folder;
- [ ] Implement the system of album management;
- [ ] Make a live example.

## Changelogs
- Reestructuracion of the code.
- Added the upload system.
- Added a path to execute both player and upload views.
