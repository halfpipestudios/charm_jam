function LoadGPUTexture(image, texture) {

    //gl.uniform1i(u_Sampler, 0);
}

class Texture {
    Initialize(name, filepath) {
        this.image = new Image();
        this.image.onload = (function() { 
            this.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.texture);

            //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

        }).bind(this);
        
        this.image.src = filepath;
        this.image.crossOrigin = "";
        this.name = name;
    }



    Destroy() {
        this.texture = undefined;
        this.name = undefined;
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

    BindTexture(name) {
        let texture = this.GetTexture(name);
        gl.bindTexture(gl.TEXTURE_2D, texture.texture);

    }

}