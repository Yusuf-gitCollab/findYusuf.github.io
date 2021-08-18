import { ctx, canvas } from './canvas.js';
import Rectangle from "./Rectangle.js";
import { minValue, maxValue, maxRects, rectGap,  startX, unitWidth } from "./values/measurements.js";

let rectArray = [];
var x = startX;


function generateRectangles() {
    rectArray = [];
    ctx.clearRect(0,0,canvas.width, canvas.height);
    x = startX;
    for(var i=0; i<maxRects; i++) {
        var value = Math.floor((Math.random() * (maxValue - minValue))  +  minValue);
        rectArray[i] = new Rectangle(x, value);
        rectArray[i].draw();
        x += (unitWidth + rectGap);
    }
}

function clearRectArray() {
    rectArray = [];
}


function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

export { drawLine, generateRectangles, rectArray, clearRectArray };
