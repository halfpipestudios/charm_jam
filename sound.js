class Sound {

    Initialize(name, filepath, loop) {
        this.player = new Audio(filepath);
        this.player.loop = loop;
        this.name = name;
    }

    Destroy() {
        this.player = undefined;
    }

    Play() {
        this.player.play();
    }

    Pause() {
        this.player.pause();
    }

    Stop() {
        this.Pause();
        this.player.currentTime = 0;
    }

}

class SoundManager {
    constructor() {
        this.sounds = new Map();
    }

    AddSound(name, filepath, loop) {
        let sound = new Sound;
        sound.Initialize(name, filepath, loop);
        this.sounds.set(name, sound);
    }

    GetSound(name) {
        let sound = this.sounds.get(name);
        return sound;
    }

}