var ref1 = 465;
var ref2 = ref1 * 2;
var windowWitdth = 0.8 * window.innerWidth;

var unitHeight = 10; // smallest height of a unit rectangle
var unitWidth = 50;
var maxValue = 45;
var minValue = 1;

var rectGap = 40;
var startX = 15;
var maxRects =  12;//Math.floor((windowWitdth - startX) / (rectGap + unitWidth));

export {ref1, ref2, unitHeight, unitWidth, rectGap, startX, maxValue, minValue, maxRects};