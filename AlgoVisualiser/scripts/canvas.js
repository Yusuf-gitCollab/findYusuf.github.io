import { drawLine, generateRectangles } from './utilities.js';
import { ref1, ref2, startX, maxValue, minValue, maxRects, unitWidth, rectGap } from './values/measurements.js';
import { bubbleSort } from './sorting-algorithms/bubbleSort.js';
import { insertionSort } from './sorting-algorithms/insetionSort.js';
import { selectionSort } from './sorting-algorithms/selectionSort.js'
import { mergeSort } from './sorting-algorithms/mergeSort.js';
import { cntSortGenerate, cntSort } from './sorting-algorithms/countingSort.js';
import { navigationColor, textHighlight } from './values/colors.js';
import { highlight } from './animations.js';

var bubbleSortBtn = document.getElementById("bubbleSortBtn");
var insertionSortBtn = document.getElementById("insertionSortBtn");
var selectionSortBtn = document.getElementById("selectionSortBtn");
var mergeSortBtn = document.getElementById("mergeSortBtn");
var countingSortBtn = document.getElementById("countingSortBtn");
var playBtn = document.getElementById("playBtn");

var canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight-35;
canvas.width = (0.8 * window.innerWidth);
console.log(canvas);

var ctx = canvas.getContext("2d");

drawLine(0, ref1, window.innerWidth, ref1);
drawLine(0, ref2, window.innerWidth, ref2);

// onclick events
bubbleSortBtn.addEventListener("click", prepareCanvas);
insertionSortBtn.addEventListener("click", prepareCanvas);
selectionSortBtn.addEventListener("click", prepareCanvas);
mergeSortBtn.addEventListener("click", prepareCanvas);
countingSortBtn.addEventListener("click", prepareCanvas);
playBtn.addEventListener("click", playAlgorithm);

var selectedAlorithm;
var selectedTab = null;

function prepareCanvas(e) {
    console.log(e.target);
    if(selectedTab !== null) {
        toogleTabColor(0);
        selectedTab = e.target;
        toogleTabColor(1);
    }else {
        selectedTab = e.target;
        toogleTabColor(1);
    }
    toogleTabColor(1);
    selectedAlorithm = e.target.id;
    if(selectedAlorithm === "countingSortBtn") {
        cntSortGenerate();
    }else {
        generateRectangles();
    }
}

function toogleTabColor(val) {
    if(selectedTab !== null) {
        if(val === 1) {
            selectedTab.style.backgroundColor = textHighlight;
        }else {
            selectedTab.style.backgroundColor = navigationColor;
        }
    }
}



async function playAlgorithm() {
    playBtn.removeEventListener("click", playAlgorithm);
    console.log("play algorithm was called" + selectedAlorithm);
    playBtn.style.opacity = 0.4;
    switch (selectedAlorithm) {
        case "bubbleSortBtn":
            await bubbleSort();
            toogleTabColor(0);
            selectedAlorithm = null;
            break;
        case "insertionSortBtn":
            await insertionSort();
            toogleTabColor(0);
            selectedAlorithm = null;
            break;
        case "selectionSortBtn":
            await selectionSort();
            toogleTabColor(0);
            selectedAlorithm = null;
            break;
        case "mergeSortBtn":
            await mergeSort();
            toogleTabColor(0);
            selectedAlorithm = null;
            break;
        case "countingSortBtn":
            await cntSort();
            toogleTabColor(0);
            selectedAlorithm = null;
            break;
        default:
            window.alert("Please select an algorithm first");
            break;
        
    }
    playBtn.addEventListener("click", playAlgorithm);
    playBtn.style.opacity = 1;
}

export { ctx, canvas } ;
