class Sprite {

    constructor(pos, w, h, color) {
        this.pos = pos;
        this.rotation = 0;
        this.w = w;
        this.h = h;
        this.color = color;

        this.damageAnimationEnable      = false;
        this.damageAnimationDuration    = 0.0;
        this.damageAnimationCurrentTime = 0;
        this.dameAnimationSrcColor      = c.white;
        this.dameAnimationDesColor      = c.white;
        this.dameAnimationFreq          = 1;
        
        // TODO: set this matrix to represent the scale and position of the sprite
        this.model = Mat4Mul(Mat4Mul(Mat4Translate(this.pos.x, this.pos.y, 0), Mat4Scale(this.w, this.h, 1)), Mat4RotateZ(this.rotation));
    }

    Update(dt) {
        this.model = Mat4Mul(Mat4Mul(Mat4Translate(this.pos.x, this.pos.y, 0), Mat4Scale(this.w, this.h, 1)), Mat4RotateZ(this.rotation));
        this.UpdateDamageAnimation(dt);
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


    PlayDamageAnimation(duration, color, freq)  {
        this.damageAnimationEnable = true;
        this.damageAnimationCurrentTime = 0;
        this.damageAnimationDuration    = duration;
        this.dameAnimationDesColor      = color;
        this.dameAnimationFreq          = freq;
    }

    UpdateDamageAnimation(dt) {
        
        if(!this.damageAnimationEnable) return;

        if(this.damageAnimationCurrentTime > this.damageAnimationDuration) {
            this.color = this.dameAnimationSrcColor;
            this.damageAnimationEnable = false;
            return;
        }
        let t = (Math.sin(this.damageAnimationCurrentTime * this.dameAnimationFreq) + 1) / 2;
        this.color = Vec4Lerp(this.dameAnimationSrcColor, this.dameAnimationDesColor, t);
        this.damageAnimationCurrentTime += dt;
    }
}


