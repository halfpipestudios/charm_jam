class Sound {

    player = undefined;

    Initialize(filepath, loop) {
        this.player = new Audio(filepath);
        this.player.loop = loop;
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
    sounds = undefined;
    name = undefined;

    constructor() {
        this.sounds = new Map();
    }

    AddSound(name, filepath, loop) {
        let sound = new Sound;
        sound.Initialize(filepath, loop);
        this.sounds.set(name, sound);
        this.name = name;
    }

    GetSound(name) {
        let sound = this.sounds.get(name);
        return sound;
    }

}