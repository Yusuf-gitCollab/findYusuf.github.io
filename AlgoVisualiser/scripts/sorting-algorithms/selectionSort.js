import { rectArray } from '../utilities.js';
import { defaultColor, safetyColor, pointingColor } from '../values/colors.js'
import { maxRects } from '../values/measurements.js';
import { auxMoveDown, auxMoveUp, highlight, markSorted, swapPromise } from '../animations.js'

var lastLimitOuter = maxRects-1;
var startIndex = 0;
var minInTheListIndex = startIndex;

var innerLoopResolver;
var outerLoopResolver;


async function innerLoop(index) {
    // console.log("inner loop running for index =" + index);
    await highlight(index, index, pointingColor, 300);
    // console.log("min In " + minInTheListIndex)
    if(rectArray[index].value < rectArray[minInTheListIndex].value) {
        if(minInTheListIndex !== startIndex) {
            await highlight(minInTheListIndex, minInTheListIndex, defaultColor, 300);
        } 
        minInTheListIndex = index;
        rectArray[index].changeColor(pointingColor);
    }else {
        // rectArray[index].changeColor(defaultColor);
        await highlight(index, index, defaultColor, 300);
    }
    index = index + 1;
    if(index < maxRects) {
        innerLoop(index);
    }else {
        
        if(startIndex != minInTheListIndex) {
            await auxMoveDown(startIndex);
            rectArray[minInTheListIndex].moveDown();
            await swapPromise(startIndex, minInTheListIndex);
            await auxMoveUp(startIndex);
            rectArray[minInTheListIndex].moveUp();
            await highlight(startIndex, startIndex, safetyColor, 300);
            rectArray[minInTheListIndex].changeColor(defaultColor);
        }else {
            await highlight(startIndex, startIndex, safetyColor, 300);
        }
        innerLoopResolver();
    }
}

function innerLoopPromise(index) {
    return new Promise(resolve => {
        innerLoopResolver = () => {
            startIndex = startIndex + 1;
            minInTheListIndex = startIndex;
            resolve();
            console.log("resolved");
        }
        innerLoop(index);
    })
}

async function outerLoop() {
    highlight(startIndex, startIndex, pointingColor, 300);
    await innerLoopPromise(startIndex+1);
    if(startIndex < lastLimitOuter) {
        outerLoop();
    }else {
        outerLoopResolver();
    }
}

function promiseOuterLoop() {
    return new Promise (resolve => {
        outerLoopResolver = () => {
            resolve();
            markSorted();
        }
        outerLoop();
    });
}


export { promiseOuterLoop as  selectionSort, outerLoopResolver };