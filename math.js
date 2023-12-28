class Vec2 {
    x = 0;
    y = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    length() {
        let result = Math.sqrt(this.x * this.x + this.y * this.y);
        return result;
    }

}

function Vec2Add(a, b) {
    let result = new Vec2;
    result.x = a.x + b.x;
    result.y = a.y + b.y;
    return result;
}

function Vec2Sub(a, b) {
    let result = new Vec2;
    result.x = a.x - b.x;
    result.y = a.y - b.y;
    return result; 
}

function Vec2Mul(a, b) {
    let result = new Vec2;
    result.x = a.x * b.x;
    result.y = a.y * b.y;
    return result; 
}

function Vec2Div(a, b) {
    let result = new Vec2;
    result.x = a.x / b.x;
    result.y = a.y / b.y;  
    return result;
}

function Vec2AddScalar(a, b) {
    let result = new Vec2;
    result.x = a.x + b;
    result.y = a.y + b;
    return result;
}

function Vec2SubScalar(a, b) {
    let result = new Vec2;
    result.x = a.x - b;
    result.y = a.y - b;
    return result;
}

function Vec2MulScalar(a, b) {
    let result = new Vec2;
    result.x = a.x * b;
    result.y = a.y * b;
    return result;
}

function Vec2DivScalar(a, b) {
    let result = new Vec2;
    result.x = a.x / b;
    result.y = a.y / b;
    return result;
}

function Vec2Normalize(a) {
    let result = new Vec2;
    let len = Math.sqrt(a.x*a.x + a.y*a.y);
    result.x = a.x / len;
    result.y = a.y / len;
    return result;
}


class Mat4 {
    m = undefined;

    constructor() {
        this.m = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }
}

function Mat4Translate(x, y, z) {
    let m = new Mat4;
    m.m = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1
    ];
    return m;
}

function Mat4Scale(x, y, z) {
    let m = new Mat4;
    m.m = [
        x, 0, 0, 0,
        0, y, 0, 0,
        0, 0, z, 0,
        0, 0, 0, 1
    ];
    return m;
}

function Mat4Orthographic(l, r, b, t, n, f) {
    let m = new Mat4;
    m.m = [
        2.0 / (r - l), 0, 0, 0,
        0, 2.0 / (t - b), 0, 0,
        0, 0, -2.0 / (f - n), 0,
        -((r + l) / (r - l)), -((t + b) / (t - b)), -((f + n) / (f - n)), 1
    ];
    return m;
}

function Mat4Mul(a, b) {
    let m = new Mat4;

    for(let col = 0; col < 4; ++col) {
        for(let row = 0; row < 4; ++row) {
            m.m[row * 4 + col] =
                a.m[0 * 4 + col] * b.m[row * 4 + 0] +
                a.m[1 * 4 + col] * b.m[row * 4 + 1] +
                a.m[2 * 4 + col] * b.m[row * 4 + 2] +
                a.m[3 * 4 + col] * b.m[row * 4 + 3];
        }
    }

    return m;
}