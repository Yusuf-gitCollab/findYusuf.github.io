import { ctx } from './canvas.js';
import { ref1, ref2,  unitHeight, unitWidth } from './values/measurements.js';
import { defaultColor, textColor } from './values/colors.js';

export default class Rectangle {
    constructor(posX, value) {
        this.posX = posX;
        this.height = value * unitHeight;
        this.width = unitWidth;
        this.posY = ref1 - this.height;
        this.color = defaultColor;
        this.value = value;        
    }
    draw () {
        ctx.fillStyle = textColor;
        ctx.font = "16px Arial";
        ctx.fillText(this.value, this.posX, this.posY);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
        // console.log("redrwaing the rects and posx is " + this.posX)
    }
    changeColor(color) {
        // console.log("the color was changed to " );
        // console.log(this.color);
        this.color = color;
        this.draw();
    }

    clear() {
        ctx.clearRect(this.posX, this.posY-12, this.width, this.height+12);
    }

    moveUp() {
        this.clear();
        this.posY = ref1 - this.height;
        this.draw();
    }

    moveDown() {
        this.clear();
        this.posY = ref2 - this.height;
        this.draw();
    }
}