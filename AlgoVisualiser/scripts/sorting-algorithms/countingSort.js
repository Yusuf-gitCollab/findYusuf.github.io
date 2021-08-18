import { ctx, canvas } from "../canvas.js";
import { darkBlue, defaultColor, invisibleColor, pointingColor, safetyColor, textColor } from "../values/colors.js";
import { maxRects, rectGap, ref2, startX, unitWidth } from "../values/measurements.js";
import { cntSortHighlight, highlight, invisibleRect, markSorted, redraw } from "../animations.js";
import { clearRectArray, rectArray } from "../utilities.js";
import Rectangle from "../Rectangle.js";

var minValue = 11;
var maxValue = 22;
var totalCountingRects = 12;
var x = startX;

var resolveTraversal;
var redrawPromiseResolver;
var resolveCntSort;

class CountingRect {
    
    constructor(posX, value) {
        this.posX = posX;
        this.height = value * 10;
        this.width = unitWidth
        this.posY = ref2-this.height;
        this.color = defaultColor;
        this.value = value;  
        this.occured = 0;      
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
        ctx.fillStyle = textColor;
        ctx.font = "16px Arial";
        ctx.fillText(this.value, this.posX, this.posY);
        ctx.fillText(this.occured, this.posX + this.width/2, this.posY + (this.height / 2));
       
    }

    changeOccurence(str) {
        if(str === '+' ) {
            this.occured += 1;
        }else if(str === '-') {
            this.occured -= 1;
        }
    }

    changeColor(color) {
        this.color = color;
        this.draw();
    }
    
}

var countingRectsArray = [];

function generateCountingRects() {
    var value = minValue;
    var x = startX;
    for(var i=0; i<totalCountingRects; i++) {
        countingRectsArray[i] = new CountingRect(x, value);
        countingRectsArray[i].draw();
        x += (unitWidth + rectGap);
        value+=1;
    }
}


function cntSortGenerateRects() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    var x = startX;
    clearRectArray();
    for(var i=0; i<maxRects; i++) {
        var value = Math.floor((Math.random() * (maxValue - minValue))  +  minValue);
        rectArray[i] = new Rectangle(x, value);
        rectArray[i].draw();
        x += (unitWidth + rectGap);
    }
}

async function drawSorted(index) {
    console.log("draw sorted called for index for " + index + " and x is " + x);
    var r = new Rectangle(x, countingRectsArray[index].value);
    r.changeColor(safetyColor);
    r.draw();
    countingRectsArray[index].changeOccurence('-');
    x += (unitWidth + rectGap);

    await cntSortHighlight(index, index, invisibleColor, 200);
    if(countingRectsArray[index].occured > 0) {
        await cntSortHighlight(index, index, darkBlue, 400);
        drawSorted(index);
    }else {
        await cntSortHighlight(index, index, defaultColor, 400);
        redrawPromiseResolver();
    }
}

function redrawPromise(index) {
    return new Promise(resolve => {
        redrawPromiseResolver = () => {
            console.log("redraw function resolved for index " + index)
            resolve();
        }
        drawSorted(index);
    });
}

async function countingRectsArrayTraversal(index) {
    console.log("counting array traversal at index = " + index);
    if(countingRectsArray[index].occured > 0) {
        // var tempO = countingRectsArray[index].occured;
        await redrawPromise(index);
    }
    index += 1;
    if(index < totalCountingRects) {
        countingRectsArrayTraversal(index )
    }else {
        resolveCntSort();
    }
}


async function traverse(index) {
    await highlight(index, index, pointingColor,300);
    await invisibleRect(index);
    let tempId = rectArray[index].value - minValue;
    console.log("tempID is " + tempId)
    countingRectsArray[tempId].changeOccurence('+');
    await cntSortHighlight(tempId, tempId, invisibleColor, 0);
    await cntSortHighlight(tempId, tempId, darkBlue, 200);
    console.log(tempId);
    if(index <= maxRects -1) {
        if(index === maxRects-1) {
            resolveTraversal();
        }else {
            traverse(index+1);
        }
        
    }
}

function traversePromise(index) {
    return new Promise(resolve => {
        resolveTraversal = () => {
            resolve();
            console.log("traversal resolved") 
            countingRectsArrayTraversal(0); 
        }
        traverse(index);
    })
}



function cntSort() {
    return new Promise(resolve => {
        traversePromise(0);
        resolveCntSort = () => {
            resolve();
        }
    });
     
}

function cntSortGenerate() {
    cntSortGenerateRects();
    generateCountingRects();
    console.log(rectArray);
    console.log(countingRectsArray)
}

export { cntSortGenerate, cntSort, countingRectsArray }


// Functioning:
// generate() -> play() -> traversePromise(0) -> traverse() -> countingRectsArrayTraversal() -> redrawPromise() -> redraw() 