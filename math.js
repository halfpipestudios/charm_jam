function Lerp(des, src, t) {
    let result = (des * (1-t)) + (src * t);
    return result;
}

class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    length() {
        let result = Math.sqrt(this.x * this.x + this.y * this.y);
        return result;
    }

}

class Vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    length() {
        let result = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        return result;
    }
}

class Vec4 {
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}

function Vec4Lerp(des, src, t) {
    let result = new Vec4;
    result.x = Lerp(des.x, src.x, t);
    result.y = Lerp(des.y, src.y, t);
    result.z = Lerp(des.z, src.z, t);
    result.w = Lerp(des.w, src.w, t);
    return result;
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


function Vec2Dot(a, b) {
    return (a.x * b.x) + (a.y * b.y); 
}

function Vec2Normalize(a) {
    let result = new Vec2;
    let len = Math.sqrt(a.x*a.x + a.y*a.y);
    result.x = a.x / len;
    result.y = a.y / len;
    return result;

}

function Vec3Normalize(a) {
    let result = new Vec3;
    let len = a.length();
    result.x = a.x / len;
    result.y = a.y / len;
    result.z = a.z / len;
    return result;
}

function Vec3Cross(a, b) {
    return new Vec3(
        a.y * b.z - a.z * b.y,      
        a.z * b.x - a.x * b.z,      
        a.x * b.y - a.y * b.x
    );
}

function Vec3Dot(a, b) {
    return (a.x * b.x) + (a.y * b.y) + (a.z * b.z); 
}

function Vec3Add(a, b) {
    let result = new Vec3;
    result.x = a.x + b.x;
    result.y = a.y + b.y;
    result.z = a.z + b.z;
    return result;
}

function Vec3MulScalar(a, b) {
    let result = new Vec2;
    result.x = a.x * b;
    result.y = a.y * b;
    result.z = a.z * b;
    return result;
}

function Vec3Sub(a, b) {
    let result = new Vec3;
    result.x = a.x - b.x;
    result.y = a.y - b.y;
    result.z = a.z - b.z;
    return result;
}


class Mat4 {
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

function Mat4RotateZ(angle) {
    let m = new Mat4;
    m.m = [
        Math.cos(angle), -Math.sin(angle), 0, 0,
        Math.sin(angle),  Math.cos(angle), 0, 0,
                  0,            0, 1, 0,
                  0,            0, 0, 1
    ];
    return m;
}

function Mat4Orthographic(l, r, b, t, n, f) {
    let m = new Mat4;
    m.m = [
        2.0 / (r - l),
        0,
        0,
        0,

        0,
        2.0 / (t - b),
        0,
        0,

        0,
        0,
        -2.0 / (f - n),
        0,

        -((r + l) / (r - l)),
        -((t + b) / (t - b)),
        -((f + n) / (f - n)),
        1
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

function Mat4LookAt(position, target, up) {
        // Remember, forward is negative z
        let f = Vec3Normalize(Vec3Sub(position, target));
        let r = Vec3Cross(f, up);
        if (r.length() === 0.0) {
            return {}; // Error
        }
        r = Vec3Normalize(r);
        let u = Vec3Normalize(Vec3Cross(r, f));
        let t = new Vec3(
                Vec3MulScalar(Vec3Dot(r, position), -1.0),
                Vec3MulScalar(Vec3Dot(u, position), -1.0),
                Vec3MulScalar(Vec3Dot(f, position), -1.0)
        );
        let m = new Mat4;
        m.m = [
                // Transpose upper 3x3 matrix to invert it
                r.x, u.x, f.x, 0,
                r.y, u.y, f.y, 0,
                r.z, u.z, f.z, 0,
                t.x, t.y, t.z, 1
        ];
        return m;
    }