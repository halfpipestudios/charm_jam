class Sprite {
    pos = undefined;
    vel = undefined;
    w = undefined;
    h = undefined;

    gpuBuffer;
    texture = undefined;
    model = undefined;

    constructor(pos, vel, w, h, texture) {

        this.pos = pos;
        this.vel = vel;
        this.w = w;
        this.h = h;
        this.texture = texture;
        // TODO: set this matrix to represent the scale and position of the sprite
        this.model = Mat4Mul(Mat4Translate(this.pos.x, this.pos.y, 2), Mat4Scale(this.w, this.h, 1));

        // Initialize gpu buffer
        this.gpuBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.gpuBuffer);
        const positions = [0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    }

    Update(dt) {
        this.model = Mat4Mul(Mat4Translate(this.pos.x, this.pos.y, 2), Mat4Scale(this.w, this.h, 1));
    }

    Render(shader) {
        let attributePosLoc = gl.getAttribLocation(shader.program, "aVertexPosition")

        gl.bindBuffer(gl.ARRAY_BUFFER, this.gpuBuffer);
        gl.vertexAttribPointer(attributePosLoc, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(attributePosLoc);

        shader.Bind();
        gl.uniformMatrix4fv(shader.GetUniformLocation("Model"), false, this.model.m);

        const offset = 0;
        const vertexCount = 4;
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);

    }
}


