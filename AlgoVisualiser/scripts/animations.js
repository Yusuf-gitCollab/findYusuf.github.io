import { safetyColor } from './values/colors.js';
import { maxRects, unitWidth } from './values/measurements.js';
import { tempRects } from './sorting-algorithms/mergeSort.js'
import Rectangle from './Rectangle.js';
import { rectArray } from './utilities.js'
import { countingRectsArray } from './sorting-algorithms/countingSort.js';

function highlight(index1, index2, color, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            rectArray[index1].changeColor(color);
            rectArray[index2].changeColor(color);
            // console.log("highlight function for index is " + index1 + " and for index " + index2);
            resolve();
        }, delay);
    });
}

let animationOver;
function swap(index1, index2, pos1, pos2) {
    // console.log("swap function is being called");
    rectArray[index1].clear();
    rectArray[index2].clear();

    rectArray[index2].posX -= 9;
    rectArray[index1].posX += 9;
    
    rectArray[index1].draw();
    rectArray[index2].draw();
    // console.log(rectArray[index1].posX);
    // console.log(rectArray[index2].posX);
    if(rectArray[index1].posX < pos2 && rectArray[index2].posX > pos1) {
        // console.log("inside the condition ");
        
        window.requestAnimationFrame(() => {
            swap(index1, index2, pos1, pos2);
        });
    }else {
        var temp = rectArray[index1];
        rectArray[index1] = rectArray[index2];
        rectArray[index2] = temp;
        animationOver();
    }
}


function swapPromise(index1, index2) {
    // console.log("swap function was called for " + index1 + " and " + index2);
    
    return new Promise(resolve => {
        setTimeout(() => {
            animationOver = () => {
                resolve();
            }
            var pos1 = rectArray[index1].posX;
            var pos2 = rectArray[index2].posX;
            // console.log("pos1 = " + pos1 + " pos2 =" + pos2);
            window.requestAnimationFrame(() => {
                swap(index1, index2, pos1, pos2);
            });
        }, 500)
    });
}

function auxMoveUp(index) {
    return new Promise(resolve => {
        setTimeout(() => {
            rectArray[index].moveUp();
            resolve();
        }, 300)
    });
}

function auxMoveDown(index) {
    return new Promise(resolve => {
        setTimeout(() => {
            rectArray[index].moveDown();
            resolve();
        }, 300)
    })
}

function merge_highlight(low, high, color) {
    return new Promise (resolve => {
        setTimeout(() => {
            for(var i=low; i<=high; i++) {
                rectArray[i].changeColor(color);
            }
            resolve();
        }, 400);
    })
    
}

function redraw(tempX, tempV, l) {
    return new Promise(resolve => {
        setTimeout(() => {
            tempRects[l] = new Rectangle(tempX, tempV);
            tempRects[l].draw();
            resolve();
        }, 400)
    })
}

function invisibleRect(index) {
    return new Promise(resolve => {
        setTimeout(() => {
            rectArray[index].clear();
            resolve();
        }, 200); 
    });
}

function cntSortHighlight(index1, index2, color, delay=100) {
    return new Promise(resolve => {
        setTimeout(() => {
            countingRectsArray[index1].changeColor(color);
            countingRectsArray[index2].changeColor(color);
            // console.log("highlight function for index is " + index1 + " and for index " + index2);
            resolve();
        }, delay);
    });
}

function markSorted() {
    for(var i=0; i<maxRects; i++) {
        rectArray[i].changeColor(safetyColor);
    }
}

export { highlight, swapPromise, auxMoveUp, markSorted, auxMoveDown, merge_highlight, redraw, invisibleRect, cntSortHighlight };