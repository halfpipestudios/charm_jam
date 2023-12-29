class Texture {
    Initialize(name, filepath) {
        this.image = new Image();
        this.image.src = filepath;
        this.name = name;
    }

    Destroy() {
        this.image = undefined;
    }
}

class TextureManager {
    constructor() {
        this.textures = new Map();
    }

    AddTexture(name, filepath) {
        let texture = new Texture;
        texture.Initialize(name, filepath);
        this.textures.set(name, texture);
    }

    GetTexture(name) {
        let texture = this.textures.get(name);
        return texture;
    }

}