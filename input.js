const KeyCode = {
    KEY_LEFT: 37,
    KEY_UP: 38,
    KEY_RIGHT: 39,
    KEY_DOWN: 40
}

var keys = [];
var mouseX = 0;
var mouseY = 0;
var mouseLastX = 0;
var mouseLastY = 0;

function OnKeyDown(ev) {
    keys[ev.keyCode].isDown = true;
}

function OnKeyUp(ev) {
    keys[ev.keyCode].isDown = false;
}

function OnMouseMove(ev) {
    let canvas = document.getElementById("glcanvas");
    var clientRect = canvas.getBoundingClientRect();
    mouseX = ev.clientX - clientRect.left;
    mouseY = ev.clientY - clientRect.top;
}

function InputInitialize() {
    for(let i = 0; i < 255; ++i) {
        keys[i] = {isDown: false, wasDown: false};
    }
    window.addEventListener("keydown", OnKeyDown);
    window.addEventListener("keyup", OnKeyUp);
    window.addEventListener("mousemove", OnMouseMove);
}

function InputPrepareForNextFrame() {
    for(let i = 0; i < 255; ++i) {
        let key = keys[i];
        key.wasDown = key.isDown;
        keys[i] = key;
    }
    mouseLastX = mouseX;
    mouseLastY = mouseY;
}

function KeyDown(keyCode) {
    return keys[keyCode].isDown;
}

function KeyUp(keyCode) {
    return !keys[keyCode].isDown;
}

function KeyJustDown(keyCode) {
    return keys[keyCode].isDown && !keys[keyCode].wasDown;
}

function KeyJustUp(keyCode) {
    return !keys[keyCode].isDown && keys[keyCode].wasDown;
}

function MouseX() {
    return mouseX;
}

function MouseY() {
    return mouseY;
}

function MouseLastX() {
    return mouseLastX;
}

function MouseLastY() {
    return mouseLastY;
}