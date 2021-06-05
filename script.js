//Dom//
const pickbtn = document.querySelectorAll('button')[0];
const rainbowbtn = document.querySelectorAll('button')[1];
const erasebtn = document.querySelectorAll('button')[2];
const clearbtn = document.querySelectorAll('button')[3];
const canvas = document.querySelector('#canvas');
const size = document.querySelector('label input');
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
        newDiv.style.border ="1px solid white";
        canvas.appendChild(newDiv);
    }    
}
function interacting(btn){
    let color = "";

    switch (btn) {
        case 'normal':
            color = 'green';
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
    interacting('normal');

/// ADD event for each button///
size.addEventListener('mouseup',initTable);
clearbtn.addEventListener('click',initTable);
erasebtn.addEventListener('click',() =>{interacting('erase')});
pickbtn.addEventListener('click',()=>{interacting('normal')});
rainbowbtn.addEventListener('click',()=>{interacting('rainbow')});
/////