function rnd(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min) + min + 1);
}

function canvasDrawPixel(ctx, x, y, r, g, b, a = 0) {
  fS = ctx.fillStyle;
  ctx.fillStyle = "rgba(" + r + ", " + g + "," + b + "," + a + ")";
  ctx.fillRect(x, y, 1, 1);
  ctx.fillStyle = fS;
}

class LineChart {

  // canvas context, width, height, array with contents
  constructor(ctx, dataRows, minID = 0, maxID = 1, minVal = 0, maxVal = 50, dynamic = true) {
    this.ctx = ctx;
    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;
    this.dataRows = dataRows;
    this.minID = minID;
    this.maxID = maxID;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.entries = new Array();
    this.dynamic = dynamic; // if set to true, min/max id/val will update to values outside the boundaries
    this.ctx.lineWidth = 2;
    this.drawAxis();
    this.last = Array. apply(null, {length: this.dataRows.length}).map(function() {return 0}); // holds last values
    this.lastID = 0; // holds last id
  }

  drawAxis() {
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(5, this.height - 15);
    this.ctx.lineTo(5, 10);
    this.ctx.moveTo(5, 9);
    this.ctx.lineTo(1, 16);
    this.ctx.moveTo(5, 9);
    this.ctx.lineTo(9, 16);
    this.ctx.moveTo(5, this.height - 15);
    this.ctx.lineTo(this.width - 15, this.height - 15);
    this.ctx.moveTo(this.width - 14, this.height - 15);
    this.ctx.lineTo(this.width - 21, this.height - 19);
    this.ctx.moveTo(this.width - 14, this.height - 15);
    this.ctx.lineTo(this.width - 21, this.height - 11);
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();

    // add some x & y steps with respective values / ids
  }

  update() {
    console.log("redraw everything");
    this.ctx.fillStyle = "rgb(255, 255, 255)";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.drawAxis();
    this.last = Array. apply(null, {length: this.dataRows.length}).map(function() {return 0}); // holds last values
    this.lastID = 0;
    for(let id in this.entries)
      this.drawDataEntry(id, this.entries[id]);
  }

  getYCoord(val) {
    let yStep = (this.height - 15) / (this.maxVal -  this.minVal);
    return Math.floor(this.height - 15 - (yStep * val));
  }

  getXCoord(id) {
    let xStep = (this.width - 15) / (this.maxID - this.minID);
    return Math.floor(5 + xStep * id);
  }

  addDataEntry(id, content) {
    if(this.dataRows.length != content.length)
      throw "Content not matching"; // likely to change to an error code
    for(let val of content)
      if(id < this.minID || id > this.maxID || val < this.minVal || val > this.maxVal)
        if(this.dynamic) {
          this.minID = Math.min(id, this.minID); // todo: add a little bit more to the left / right / up / down
          this.maxID = Math.max(id, this.maxID);
          this.minVal = Math.min(val, this.minVal);
          this.maxVal = Math.max(val, this.maxVal);
          this.update();
        } else
          throw "Specified data is outside of boundaries";
    this.entries[id] = content;
  }

  drawDataEntry(id, content) {
    for(let data in content) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.getXCoord(this.lastID), this.getYCoord(this.last[data]));
      this.ctx.lineTo(this.getXCoord(id), this.getYCoord(content[data]));
      this.ctx.stroke();
    }
    this.last = content;
    this.lastID = id;
  }
}
