export default function ImageViewer(arrayBuffer, canvas) {
  // TODO: change \\ to \ if something is not working
  const exp = /^(\S+)\s+(\#.*?\n)*\s*(\d+)\s+(\d+)\s+(\d+)?\s*/;
  const match = arrayBuffer.match(exp);
  const BinaryParser = function BinaryParser(data, bytes) {
    this.data = data;
    this.bytes = bytes;
    this.pointer = 0;
  };

  BinaryParser.prototype.getNextSample = function getNextSample() {
    if (this.pointer >= this.data.length) return false;

    let val = 0;
    for (let i = 0; i < this.bytes; i += 1) {
      val = val * 255 + this.data.charCodeAt(this.pointer += 1);
    }

    return val;
  };

  const ASCIIParser = function ASCIIParser(data, bytes) {
    this.data = data.split(/\s+/);
    this.bytes = bytes;
    this.pointer = 0;
  };

  ASCIIParser.prototype.getNextSample = function getNextSample() {
    if (this.pointer >= this.data.length) return false;

    let val = 0;
    for (let i = 0; i < this.bytes; i += 1) {
      val = val * 255 + parseInt(this.data[this.pointer += 1], 10);
    }

    return val;
  };

  const PBMFormatter = function PBMFormatter(width, height) {
    this.width = width;
    this.height = height;
  };

  PBMFormatter.prototype.getCanvas = function getCanvas(parser) {
    const ctx = canvas.getContext('2d');

    ctx.width = this.width;
    canvas.width = this.width;

    ctx.height = this.height;
    canvas.height = this.height;

    const img = ctx.getImageData(0, 0, this.width, this.height);

    if (parser instanceof BinaryParser) {
      let data = '';
      let byte;
      const bytesPerLine = Math.ceil(this.width / 8);

      for (let i = 0; i < this.height; i += 1) {
        const line = parser.data.substr(i * bytesPerLine, bytesPerLine);
        let lineData = '';

        for (let j = 0; j < line.length; j += 1) lineData += (`0000000${line.charCodeAt(j).toString(2)}`).substr(-8);
        data += lineData.substr(0, this.width);
      }

      // eslint-disable-next-line no-cond-assign
      while ((byte = (parser.getNextSample())) !== false) {
        data += (`0000000${byte.toString(2)}`).substr(-8);
      }

      // eslint-disable-next-line no-param-reassign
      parser = new ASCIIParser(data.split('').join(' '), 1);
    }

    for (let row = 0; row < this.height; row += 1) {
      for (let col = 0; col < this.width; col += 1) {
        const d = (1 - parser.getNextSample()) * 255;
        const pos = (row * this.width + col) * 4;
        img.data[pos] = d;
        img.data[pos + 1] = d;
        img.data[pos + 2] = d;
        img.data[pos + 3] = 255;
      }
    }

    ctx.putImageData(img, 0, 0);
    ctx.commit();
    return canvas;
  };

  const PGMFormatter = function PGMFormatter(width, height, maxVal) {
    this.width = width;
    this.height = height;
    this.maxVal = maxVal;
  };

  PGMFormatter.prototype.getCanvas = function getCanvas(parser) {
    // const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    ctx.width = this.width;
    canvas.width = this.width;

    ctx.height = this.height;
    canvas.height = this.height;

    const img = ctx.getImageData(0, 0, this.width, this.height);

    for (let row = 0; row < this.height; row += 1) {
      for (let col = 0; col < this.width; col += 1) {
        const d = parser.getNextSample() * (255 / this.maxVal);
        const pos = (row * this.width + col) * 4;

        img.data[pos] = d;
        img.data[pos + 1] = d;
        img.data[pos + 2] = d;
        img.data[pos + 3] = 255;
      }
    }

    ctx.putImageData(img, 0, 0);
    ctx.commit();
    return canvas;
  };

  const PPMFormatter = function PPMFormatter(width, height, maxVal) {
    this.width = width;
    this.height = height;
    this.maxVal = maxVal;
  };

  PPMFormatter.prototype.getCanvas = function getCanvas(parser) {
    // const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    ctx.width = this.width;
    canvas.width = this.width;

    ctx.height = this.height;
    canvas.height = this.height;

    const img = ctx.getImageData(0, 0, this.width, this.height);

    for (let row = 0; row < this.height; row += 1) {
      for (let col = 0; col < this.width; col += 1) {
        const factor = 255 / this.maxVal;
        const r = factor * parser.getNextSample();
        const g = factor * parser.getNextSample();
        const b = factor * parser.getNextSample();
        const pos = (row * this.width + col) * 4;

        img.data[pos] = r;
        img.data[pos + 1] = g;
        img.data[pos + 2] = b;
        img.data[pos + 3] = 255;
      }
    }

    ctx.putImageData(img, 0, 0);
    ctx.commit();
    return canvas;
  };

  if (match) {
    // eslint-disable-next-line no-multi-assign
    const width = this.width = parseInt(match[3], 10);
    // eslint-disable-next-line no-multi-assign
    const height = this.height = parseInt(match[4], 10);
    const maxVal = parseInt(match[5], 10);
    const bytes = (maxVal < 256) ? 1 : 2;
    const imageData = arrayBuffer.substr(match[0].length);

    switch (match[1]) {
      case 'P1':
        this.parser = new ASCIIParser(`${maxVal} ${imageData}`, bytes);
        this.formatter = new PBMFormatter(width, height);
        break;

      case 'P2':
        this.parser = new ASCIIParser(imageData, bytes);
        this.formatter = new PGMFormatter(width, height, maxVal);
        break;

      case 'P3':
        this.parser = new ASCIIParser(imageData, bytes);
        this.formatter = new PPMFormatter(width, height, maxVal);
        break;

      case 'P4':
        this.parser = new BinaryParser(imageData, bytes);
        this.formatter = new PBMFormatter(width, height);
        break;

      case 'P5':
        this.parser = new BinaryParser(imageData, bytes);
        this.formatter = new PGMFormatter(width, height, maxVal);
        break;

      case 'P6':
        this.parser = new BinaryParser(imageData, bytes);
        this.formatter = new PPMFormatter(width, height, maxVal);
        break;

      default:
        throw new TypeError(`Sorry, your file format is not supported. [${match[1]}]`);
    }
  } else {
    throw new TypeError('Sorry, file does not appear to be a Netpbm file.');
  }

  ImageViewer.prototype.getCanvas = function getCanvas() {
    return this.formatter.getCanvas(this.parser);
  };
}
