import {
  Stage, Shape, Touch, Ticker, Point,
} from '@createjs/easeljs';
import ImageViewer from './module/viewer';

const ds = document.querySelector('#canvas-container');

let stage;
let stroke;
let oldPt;
let oldMidPt;
let color = '#fff';
let drawingCanvas;
function handleMouseMove(event) {
  if (!event.primary) { return; }
  // eslint-disable-next-line no-bitwise
  const midPt = new Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);
  drawingCanvas.graphics.clear().setStrokeStyle(stroke, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y)
    .curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);
  oldPt.x = stage.mouseX;
  oldPt.y = stage.mouseY;
  oldMidPt.x = midPt.x;
  oldMidPt.y = midPt.y;
  stage.update();
}
function handleMouseDown(event) {
  if (!event.primary) { return; }
  /* if (stage.contains(title)) {
          stage.clear();
          stage.removeChild(title);
      } */
  stroke = parseInt(document.querySelector('#stroke').value, 10);
  oldPt = new Point(stage.mouseX, stage.mouseY);
  oldMidPt = oldPt.clone();
  stage.addEventListener('stagemousemove', handleMouseMove);
}

function handleMouseUp(event) {
  if (!event.primary) { return; }
  stage.removeEventListener('stagemousemove', handleMouseMove);
}
document.querySelector('#color-selector').addEventListener('change', (e) => {
  color = e.target.value;
});

function initProcess() {
  stage = new Stage('myMap');
  stage.autoClear = false;
  stage.enableDOMEvents(true);
  Touch.enable(stage);
  Ticker.framerate = 24;
  drawingCanvas = new Shape();
  stage.addEventListener('stagemousedown', handleMouseDown);
  stage.addEventListener('stagemouseup', handleMouseUp);
  stage.addChild(drawingCanvas);
  stage.update();
}

(function generateMap() {
  fetch('/map.pgm')
    .then((response) => response.ok && response.blob())
    .then((buffer) => {
      let arrayBuffer;
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(buffer);
      fileReader.onload = function onload(event) {
        arrayBuffer = event.target.result;
        console.log(arrayBuffer);
        const img = new ImageViewer(arrayBuffer);
        const canvas = img.getCanvas();
        canvas.id = 'myMap';
        ds.appendChild(canvas);
        initProcess();
      };
    })
    .catch((err) => console.error(err));
}());
