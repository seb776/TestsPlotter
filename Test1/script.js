

  let canvas = null;

var w = window.innerWidth;
var h = window.innerHeight;  

let img;

function preload()
{
  img = loadImage('test.png');
}
let lines = [];
function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    console.log("test");



    let yCount = 80;
    let yStep = 439/yCount;
    for (let y = 0; y < yCount; ++y)
    {
      let currentLine = [];
      let memory = null;
      for (let x = 0; x < 792; ++x)
      {
        if (img.get(x, y*yStep)[0] > 0.5)
        {
          if (memory == null)
            memory = {start:{x:x,y:y*yStep},end:{x:x,y:y*yStep}}
          else
            memory.end = {x:x,y:y*yStep};
        }
        else if (memory != null)
        {
          currentLine.push(memory);
          memory = null;
        }
      }
      lines.push(currentLine);
    }
    let outText = "";
    for (let y = 0; y < lines.length; ++y)
    {
      let curLine = lines[y];
      for (let x = 0; x < curLine.length; ++x)
      {
        let tuple = curLine[x];
        let normalize = (val, normPlotter, normImg) => { return ((val/normImg) * normPlotter).toFixed(2); }
        let normXImg = 792;
        let normYImg = 439;
        let normXPlotter = 16.5;//16.53;
        let normYPlotter = 11.6;//11.69;
        outText += `ad.moveto(${normalize(tuple.start.x, normXPlotter, normXImg)}, ${normalize(tuple.start.y, normYPlotter, normYImg)});\n`;
        outText += `ad.lineto(${normalize(tuple.end.x, normXPlotter, normXImg)}, ${normalize(tuple.end.y, normYPlotter, normYImg)});\n`;
      }
    }
    download("test.py", outText);
  }
  
  function draw() {
    background(0);
    translate(-width*.25,-height*.25);

    // img.get(mouseX, mouseY); // 792/439

    push();
    stroke(255,255,255);
    strokeWeight(2.0);
    // strokeCap(ROUND);
    for (let y = 0; y < lines.length; ++y)
    {
      let curLine = lines[y];
      for (let x = 0; x < curLine.length; ++x)
      {
        let tuple = curLine[x];
        line(tuple.start.x, tuple.start.y, tuple.end.x, tuple.end.y);
//        console.log(tuple);
      }
    }
    pop();
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    console.log("resize");
  }

  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }