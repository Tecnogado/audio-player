const secondsToMinutes = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
}

const path = (file) => {
    return `files/${file}`;
}

const loadJSON = async function(path) {   
    const data = await fetch(path)
        .then(response => {
            return response.json();
        });
    return data;
}

export { secondsToMinutes, loadJSON, path};