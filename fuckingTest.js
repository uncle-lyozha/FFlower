"use strict";
/* как избавиться от pettleCount и др глобальные переменные. гитхаб, git, новый формат, 
контекст как параметр. 83 строки */

// initial canvas setup
const canvas = document.querySelector(".myCanvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//ctx.globalCompositeOperation = 'xor';

let drawOption;
let startBtn = document.getElementById('generateButton');

console.log(drawOption);
console.log(ctx.globalCompositeOperation);

let hue = Math.random() * 360;
let pettleCount = 0;
let pettleCoeff = 0.2;
let pettleNumber = 100;
let scale = 10;

const generate = () => {
    cleanCanvas();
    const result = getValues();
    setStyle();
    animate(result);
}

startBtn.addEventListener("click", generate);

const cleanCanvas = () => {
    ctx.clearRect(0, 0, width, height);
    pettleCount = 0;
}

const getValues = () => {
    const pettleCoeff = document.getElementById('customAngle').value;
    const scale = document.getElementById('customScale').value;
    const pettleNumber = document.getElementById('customPetules').value;
    return {pettleCoeff, scale, pettleNumber};
}

const setStyle = () => {
    drawOption = document.getElementById('stylesMenu').value;
    ctx.globalCompositeOperation = drawOption;
    console.log(drawOption);
    console.log(ctx.globalCompositeOperation);
}

const drawFlower = (flowerParams) => {
    const {pettleCoeff, scale} = flowerParams;
//initial positioning
    let angle = pettleCount * pettleCoeff;
    let radius = scale * Math.sqrt(pettleCount);
    let positionX = radius * Math.sin(angle) + width/2;
    let positionY = radius * Math.cos(angle) + height/2;

//CanvasAPI drawing methods to draw the flower
    ctx.fillStyle = 'hsl('+ hue +', 100%, 50%)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(positionX, positionY , pettleCount, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    pettleCount++;
    hue++;
}

const animate = (flowerParams) => {
/*     
    positionX += 5 * Math.sin(angle);
    positionY += 5 * Math.cos(angle);
    angle += 0.1; */

    drawFlower(flowerParams);
    if (pettleCount > flowerParams.pettleNumber) return;
    requestAnimationFrame(() => animate(flowerParams));
}