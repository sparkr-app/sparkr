const canvas = document.querySelector('#draw');
console.log(canvas);

    //gets context
const ctx = canvas.getContext('2d');
    //blendMode var
let blendMode = 'source-over';

    //sets canvas to full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

    //making lines less ugly
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 40;
ctx.strokeStyle = "BABABA";
    //blend modes
ctx.globalCompositeOperation = blendMode;

    //sets up position variables
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let globalColor = 0;
let direction = true;


window.onload = init();




    //current color can go under rainbow swatch

    // add event listener
    // run sizeChange function when event listener triggers
    // store size in var
    //add transition for highlight class, clicking class

//add eraser button
    //switch blend mode?






function init(){
        //draws
    canvas.addEventListener('mousemove', draw);
        //sets isDrawing boolean
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
            //defines starting point for stroke
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    for(i = 0; i < 6; i++){
            //adds btn listeners
        let btn = document.getElementById(`btn-${i}`)
        btn.addEventListener('mouseover', addHighlight);
        btn.addEventListener('mouseout', removeHighlight);
        btn.addEventListener('click', setColor);
        btn.addEventListener('click', setColor);
    }

    //activates slid
    let slider = document.getElementById('size-slider');
    slider.addEventListener('input', updateSize);

    //activates eraser
    let btn = document.getElementById('btn-6');
    btn.addEventListener('mouseover', addHighlight);
    btn.addEventListener('mouseout', removeHighlight);
    btn.addEventListener('click', selectEraser);
}

function draw(e) {

    if (isDrawing) {
        console.log(ctx.lineWidth);
        console.log(e)
            //sets stroke color
        ctx.strokeStyle = globalColor;
        
        ctx.beginPath();
            //start from
        ctx.moveTo(lastX, lastY);
            //go to
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
            //redefines lastX, lastY
        [lastX, lastY] = [e.offsetX, e.offsetY];
            //increment hu
        // hue++;
        //     //reset hue (even though you can take HSL past 360
        //     //and it resets, this is neater)
        // if(hue > 360){
        //     hue = 0;
        // }
            //invert boolean if line hits limits
        // if(ctx.lineWidth >= 40 || ctx.lineWidth <= 10){    
        //     direction = !direction;
        // } 
        
        // if(direction){
        //     ctx.lineWidth++;
        // } else{
        //     ctx.lineWidth --;
        // }
        
    } else return; //if is not drawing, exit function
}

function addHighlight(e){
    let btn = getBtn(e);
    console.log(btn);
    btn.classList.add('highlight');
}
function removeHighlight(e){
    let btn = getBtn(e);
    console.log(btn);
    btn.classList.remove('highlight');
}

function setColor(e){
    addClicking(e)
    let clickedColor = getColor(e);
    globalColor = clickedColor;
        //sets blend to normal
    blendMode = 'source-over';
}

function getColor(e){
    let btn = getBtn(e);
    let style = getComputedStyle(btn);
    let bgColor = style.backgroundColor;
    return bgColor;
}

function getBtn(e){
    return document.getElementById(`${e.target.id}`);
}

function addClicking(e){
    let btn = getBtn(e);
    btn.classList.add('clicking');
    setTimeout(() => {btn.classList.remove('clicking')}, 300);
}

function updateSize(){
    let slider = document.getElementById('size-slider');
    let sliderValue = slider.value;
    console.log(sliderValue);
    ctx.lineWidth = sliderValue;
}

function selectEraser(e){
    let btn = getBtn(e);
    addClicking(e);
    let clickedColor = getColor(e);
    globalColor = clickedColor;
        //should set blend to erase
    blendMode = 'destination-out';
}