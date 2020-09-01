import ImageViewer from './module/viewer';
/*
fetch('/map.pgm')
  .then((response) => response.ok && response.blob())
  .then((buffer) => {
    let arrayBuffer;
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(buffer);
    fileReader.onload = function onload(event) {
      arrayBuffer = event.target.result;
      const img = new ImageViewer(arrayBuffer);
      const canvas = img.getCanvas();
      if (canvas) {
        canvas.id = 'myMap';
        postMessage(canvas);
      } else {
        // eslint-disable-next-line no-console
        console.log('Unable to create');
      }
    };
  })
  .catch((err) => console.error(err)); */

// eslint-disable-next-line no-restricted-globals
self.onmessage = function onmessage(e) {
  if (typeof e.data === 'object') {
    fetch('/map.pgm')
      .then((response) => response.ok && response.blob())
      .then((buffer) => {
        let arrayBuffer;
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(buffer);
        fileReader.onload = function onload(event) {
          arrayBuffer = event.target.result;
          const img = new ImageViewer(arrayBuffer, e.data.canvas);
          img.getCanvas();
          postMessage({ created: true });
        };
      })
      .catch((err) => console.error(err));
  }
};
