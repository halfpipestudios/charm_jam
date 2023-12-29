class Sprite {

    constructor(pos, w, h, color) {
        this.pos = pos;
        this.w = w;
        this.h = h;
        this.color = color;
        // TODO: set this matrix to represent the scale and position of the sprite
        this.model = Mat4Mul(Mat4Translate(this.pos.x, this.pos.y, 0), Mat4Scale(this.w, this.h, 1));

        let verticesTexCoords = new Float32Array([
            -0.5, 0.5, 0.0, 1.0,
            -0.5, -0.5, 0.0, 0.0,
            0.5, 0.5, 1.0, 1.0,
            0.5, -0.5, 1.0, 0.0,
        ]);
        let n = 4;

        // Initialize gpu buffer
        this.gpuBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.gpuBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.gpuBuffer);

        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
        gl.enableVertexAttribArray(0);

        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);
        gl.enableVertexAttribArray(1);
    }

    Update(dt) {
        this.model = Mat4Mul(Mat4Translate(this.pos.x, this.pos.y, 0), Mat4Scale(this.w, this.h, 1));
    }

    Render(shader) {
        shader.Bind();
        gl.uniformMatrix4fv(shader.GetUniformLocation("Model"), false, this.model.m);
        gl.uniform4f(shader.GetUniformLocation("Color"), this.color.x, this.color.y, this.color.z, this.color.w);

        const offset = 0;
        const vertexCount = 4;
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);

    }

    GetAABB() {
        let min = Vec2Sub(this.pos, new Vec2(this.w/2, this.h/2));
        let max = Vec2Add(this.pos, new Vec2(this.w/2, this.h/2));
        let aabb = new AABB(min, max);
        return aabb;
    }

}


