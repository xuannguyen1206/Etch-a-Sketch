var Color = require('color');
//Dom//
const pickbtn = document.querySelector('#menu input');
const rainbowbtn = document.querySelectorAll('button')[0];
const erasebtn = document.querySelectorAll('button')[1];
const clearbtn = document.querySelectorAll('button')[2];
const canvas = document.querySelector('#canvas');
const size = document.querySelector('label[for="size"] input');
const body = document.querySelector('body');
const title = document.querySelector('h1');
const btn = document.querySelectorAll('#menu button');
const signature = document.querySelector('footer span');
/////

function initTable() {
    canvas.textContent = ''; 
    canvas.style.backgroundColor = "";//clear out the board
    tableSize = size.value;
    canvas.style.gridTemplateRows = `repeat(${tableSize},1fr)`;
    canvas.style.gridTemplateColumns = `repeat(${tableSize},1fr)`;
    for(let i = 0; i < tableSize*tableSize; i++){
        newDiv = document.createElement('div');
        newDiv.style.gridArea = "span 1";
        canvas.appendChild(newDiv);
    }    
}
function interacting(btn,changePermission){
    let color = "";

    switch (btn) {
        case 'normal':
            color = pickbtn.value;
            if(!changePermission)changeTheme(color);
            break;
        case 'rainbow':
            canvas.addEventListener('mouseover',(e) =>{
                if(e.target.id == "canvas") return;
                e.target.style.backgroundColor = `rgb(${Math.round(Math.random()*257)},${Math.round(Math.random()*257)},${Math.round(Math.random()*257)})`;
            })
            return;
            break;
        case 'erase':
            color = "";
            break;
    }
    canvas.addEventListener('mouseover',(e) =>{
        if(e.target.id == "canvas") return;
        e.target.style.backgroundColor = `${color}`;
    })
    
}
function changeTheme(contrastColor){
    //generate new Colors
    let contrastHsl = Color(contrastColor).hsl().color;
    let mainColor = mainColorGenerator(contrastHsl[0],contrastHsl[1],contrastHsl[2]);
    let dominantColor = dominantColorGenerator(mainColor[0]); // only Hue needed
    let gradientColor = gradientColorGenerator(mainColor[0],mainColor[2]);
    ////////////// Aplly changes
    body.style.backgroundImage = `linear-gradient(45deg,hsl(${mainColor[0]},${mainColor[1]}%,${mainColor[2]}%),hsl(${gradientColor[0]},${gradientColor[1]}%,${gradientColor[2]}%) )`
    title.style.color = `hsl(${dominantColor[0]},${dominantColor[1]}%,${dominantColor[2]}%)`
    btn.forEach((button) =>{
        button.style.color = `hsl(${dominantColor[0]},${dominantColor[1]}%,${dominantColor[2]}%)`;
    });
    canvas.style.border = `3px solid hsl(${dominantColor[0]},${dominantColor[1]}%,${dominantColor[2]}%)`;
    signature.style.color = `hsl(${dominantColor[0]},${dominantColor[1]}%,${dominantColor[2]}%)`;

}

function mainColorGenerator(contrastH,contrastS,contrastL){
    let newHue, newSaturation, newLightness;
    //generate random number for new hsl//////////
    let randH = Math.floor(Math.random()*(131-110))+110;
    let randS = (Math.floor(Math.random()*11)+1) + randH * 0.075;
    let randL = Math.floor(Math.random()*10)+1;
    ////////////////Apply changes to make new HSL//////////////
    // HUE
    if(Math.floor(Math.random()*2+1) == 1){
        //plus forward case
        newHue = contrastH + randH;
        if(newHue > 360)newHue -=360;			 
    }
    else{
        //backward case
        newHue = contrastH-randH;
        if(newHue < 0)newHue =360-(randH - contrastH);
    }
    // Saturation
    if(contrastS < 60){
        newSaturation = contrastS + 10 + randS;
        if(newSaturation > 100) newSaturation =100;
    }
    else{
        newSaturation =contrastS - randS;
        if(newSaturation < 35) newSaturation = 35;
    }
    //Lightness
    if(contrastL < 50){
        newLightness = 50 + (50-contrastL)*0.15 + randL;
        if(newLightness > 75)newLightness = 75;
    }
    else{
        newLightness = 50 - ((contrastL-50)*0.15) - randL;
        if(newLightness < 25) newLightness = 25;
    }
    return [newHue,newSaturation,newLightness];
}
function dominantColorGenerator(mainH){
    let newHue, newSaturation, newLightness;
    //generate random number for new hsl//////////
    let randH = Math.floor(Math.random()*(70-50))+50;
    ////////////////Apply changes to make new HSL//////////////
    // HUE
    if(Math.floor(Math.random()*2+1) == 1){
        //plus forward case
        newHue = mainH + randH;
        if(newHue > 360)newHue -=360;			 
    }
    else{
        //backward case
        newHue = mainH-randH;
        if(newHue < 0)newHue =360-(randH - contrastH);
    }
    //Saturation
    newSaturation = Math.floor(Math.random()*(101-80))+80;
    //Lightness
    newLightness = Math.floor(Math.random()*(55-45))+45;
    return[newHue,newSaturation,newLightness];
}
function gradientColorGenerator(mainH,mainL){
    let newHue,newSaturation,newLightness;
    //generate random number for new hsl//////////
    let randH = Math.floor(Math.random()*41)+20;
    let randL = Math.floor(Math.random()*11)+1;
    ////////////////Apply changes to make new HSL//////////////
    // HUE
    if(Math.floor(Math.random()*2+1) == 1){
        //plus forward case
        newHue = mainH + randH;
        if(newHue > 360)newHue -=360;			 
    }
    else{
        //backward case
        newHue = mainH-randH;
        if(newHue < 0)newHue =360-(randH - contrastH);
    }
    //Saturation
    newSaturation = Math.floor(Math.random()*(101-80))+80;
    //Lightness
    newLightness =  mainL + randL;
    if(newLightness>75)newLightness=75;
    return[newHue,newSaturation,newLightness];
}
/// ADD event for each button///
size.addEventListener('mouseup',initTable);
clearbtn.addEventListener('click',initTable);
erasebtn.addEventListener('click',() =>{interacting('erase')});
pickbtn.addEventListener('input',()=>{interacting('normal')});
pickbtn.addEventListener('click',()=>{interacting('normal',0)});
rainbowbtn.addEventListener('click',()=>{interacting('rainbow')});
/////

interacting('normal');
initTable();