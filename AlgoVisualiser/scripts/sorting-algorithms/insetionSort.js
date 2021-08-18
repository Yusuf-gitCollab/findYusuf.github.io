
import { defaultColor, dangerColor, safetyColor, pointingColor } from '../values/colors.js'
import { maxRects } from '../values/measurements.js';
import { auxMoveUp, highlight, markSorted, swapPromise } from '../animations.js';
import { rectArray } from '../utilities.js';

var innerLoopResolve;
var outerLoopResolve;

async function innerLoop(index) {
    await swapPromise(index-1, index);
    await highlight(index, index, defaultColor, 100);
    index = index - 1;
    if(index !== 0 && rectArray[index].value < rectArray[index-1].value) {
        await highlight(index-1, index, dangerColor, 300);
        innerLoop(index);
    }else {
        await auxMoveUp(index);
        await highlight(index, index+1, defaultColor, 300);
        innerLoopResolve();
    }
}


function promiseInnerLoop(index) {
    return new Promise(resolve => {
        innerLoopResolve = () => {
            resolve();
        }
        innerLoop(index);
    })
}

async function outerLoop(index) {
    await highlight(index-1, index, pointingColor, 400);
    if(rectArray[index].value < rectArray[index-1].value) {
        await highlight(index-1, index, dangerColor, 300);
        rectArray[index].moveDown(); 
        await promiseInnerLoop(index);
    }else {
        await highlight(index-1, index-1, defaultColor, 300);
    }
    index = index + 1;
    if(index < maxRects) {
        outerLoop(index);
    }else {
        outerLoopResolve();
        console.log("outer loop resolved ");
        markSorted();
    }
}

function promiseOuterLoop() {
    return new Promise(resolve => {
        outerLoopResolve = () => {
            resolve();
        }
        outerLoop(1);
    })
}



export { promiseOuterLoop as insertionSort, outerLoopResolve };