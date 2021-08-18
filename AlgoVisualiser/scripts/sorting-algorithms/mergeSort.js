import { defaultColor,  pointingColor } from '../values/colors.js'
import { maxRects, unitWidth, rectGap, startX } from '../values/measurements.js';
import { redraw, auxMoveDown, merge_highlight, markSorted } from '../animations.js';
import { rectArray } from '../utilities.js';


var mergeSortResolver;  
var mergeSortAnimationResolver;
var mergePromiseResolver;

var tempRects = [];

async function merge(low, mid, high) {
    await merge_highlight(low, high, pointingColor);
    await auxMoveDown(low);
    for(var i=low+1; i<=high; i++) {
        rectArray[i].moveDown();
    }
    var aux1 = [];
    var aux2 = [];

    var n1 = (mid - low) + 1;
    var n2 = (high - mid);

    for(var i=0; i<n1; i++) {
        aux1[i] = rectArray[low + i];
    }
    for(var i=0; i<n2; i++) {
        aux2[i] = rectArray[mid+i+1];
    }

    var i=0, j=0, k=low, l=0;
    while(i < n1 && j<n2) {

        if(aux2[j].value <= aux1[i].value) {
            var tempX = (k * (unitWidth + rectGap)) + startX;
            var tempV = aux2[j].value;
            await redraw(tempX, tempV, l);
            rectArray[mid+1+j].clear();
            j++;
        }else {
            var tempX = (k * (unitWidth + rectGap)) + startX;
            var tempV = aux1[i].value;
            await redraw(tempX, tempV, l);
            rectArray[low+i].clear();
            i++;
        }
        k++;
        l++;
        debugger;
    }

    while(i < n1) {
        var tempX = (k * (unitWidth + rectGap)) + startX;
        var tempV = aux1[i].value;
        await redraw(tempX, tempV, l);
        rectArray[low+i].clear();
        i++;
        k++;
        l++;
    }

    while(j < n2) {
        var tempX = (k * (unitWidth + rectGap)) + startX;
        var tempV = aux2[j].value;
        await redraw(tempX, tempV, l);
        rectArray[mid+1+j].clear();
        j++;
        k++;
        l++;
    }
    l = 0;
    for( i=low; i<=high; i++) {
        rectArray[i] = tempRects[l];
        l++;
    }
    if(low === 0 && high === maxRects-1) {
        mergeSortAnimationResolver();
    }
    mergePromiseResolver();
}

function mergePromise(low, mid, high) {
    return new Promise(resolve => {
        mergePromiseResolver = () => {
            resolve();
        }
        merge(low, mid, high);
    })
}

async function mergeSort(low, high) {
    await merge_highlight(low, high, pointingColor);
    await merge_highlight(low, high, defaultColor);
    if(low < high) {
        var mid = Math.floor((low + high) / 2);
        await mergeSort(low, mid);
        await mergeSort(mid+1, high);
        await mergePromise(low, mid, high);
    }else {
        mergeSortResolver();
    }
}

function mergeSortPromise(low, high) {
    return new Promise(resolve => {
        mergeSortResolver = () => {
            resolve();
        }
        mergeSort(low, high);
    })
}

function mergeSortAnimationPromise() {
    return new Promise(resolve => {
        mergeSortAnimationResolver = () => {
            resolve();
            markSorted();
        }
        mergeSortPromise(0, maxRects-1);
    })
}

export { mergeSortAnimationPromise as mergeSort, tempRects, mergeSortAnimationResolver };
