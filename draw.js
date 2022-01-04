const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 60;
canvas.height = 400;

let context = canvas.getContext("2d");
let start_background_color = "white";
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);


let draw_color = "black";
let draw_width = "2";
let is_drawing = false;
let restore_array = [];
let index = -1;




function change_color(element){
    draw_color = element.style.background;
}


function upload(){
    var fileinput = document.getElementById("#finput");
    var image = new SimpleImage(fileinput);
    var canvas = document.getElementById("canvas");
    image.drawTo(canvas);
  }



canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);


function start(event) {
    is_drawing = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);

    event.preventDefault();
}

function draw(event){
    if (is_drawing) {
        context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();

    }
    event.preventDefault();
}

function stop(event){
    if (is_drawing){
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    event.preventDefault();

if ( event.type != 'mouseout' ){
    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
}
    
}

// Set up touch events for mobile, etc

canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY 
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY 
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, false);
document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, false);
document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, false);

// Get the position of the mouse relative to the canvas
function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top
    };
}

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

// Draw to the canvas
function renderCanvas() {
    if (drawing) {
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
        lastPos = mousePos;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

const fileInput = document.querySelector("#upload");

  // enabling drawing on the blank canvas
  drawOnImage();
  
  fileInput.addEventListener("change", async (e) => {
    const [file] = fileInput.files;
  
    // displaying the uploaded image
    const image = document.createElement("img");
    image.src = await fileToDataUri(file);
  
    // enbaling the brush after after the image
    // has been uploaded
    image.addEventListener("load", () => {
      drawOnImage(image);
    });
  
    return false;
  });
  
  function fileToDataUri(field) {
    return new Promise((resolve) => {
      const reader = new FileReader();
  
      reader.addEventListener("load", () => {
        resolve(reader.result);
      });
  
      reader.readAsDataURL(field);
    });
  }


  function drawOnImage(image = null) {
    // const canvasElement = document.getElementById("canvas");
    // const context = canvasElement.getContext("2d");
  
    // if an image is present,
    // the image passed as a parameter is drawn in the canvas
    if (image) {
      const imageWidth = image.width;
      const imageHeight = image.height;
  
      // rescaling the canvas element
      canvas.width = imageWidth;
      canvas.height = imageHeight;
  
      context.drawImage(image, 0, 0, imageWidth, imageHeight);
    }
  
    let isDrawing;
}

console.log(drawOnImage);






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// clear function to clear what inside canves 
function clear_canvas() {
    context.fillStyle = start_background_color;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);

    restore_array = [];
    index = -1;
}


// undo function to undo what your write /draw 
function undo_last() {
if( index <= 0) {
    clear_canvas();
} else {
    index -= 1;
    restore_array.pop();
    context.putImageData(restore_array[index], 0, 0);
}
}



// function upload(){
//     var fileinput = document.getElementById("finput");
//     var image = new SimpleImage(fileinput);
//     var canvas = document.getElementById("canvas");
//     image.drawTo(canvas);
//   }







