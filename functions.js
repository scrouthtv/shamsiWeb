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
    this.leftStart = 35;
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
    this.ctx.moveTo(this.leftStart, this.height - 15);
    this.ctx.lineTo(this.leftStart, 10);
    this.ctx.moveTo(this.leftStart, 9);
    this.ctx.lineTo(this.leftStart - 4, 16);
    this.ctx.moveTo(this.leftStart, 9);
    this.ctx.lineTo(this.leftStart + 4, 16);
    this.ctx.moveTo(this.leftStart, this.height - 15);
    this.ctx.lineTo(this.width - 15, this.height - 15);
    this.ctx.moveTo(this.width - 14, this.height - 15); // this code is ugly
    this.ctx.lineTo(this.width - 21, this.height - 19);
    this.ctx.moveTo(this.width - 14, this.height - 15);
    this.ctx.lineTo(this.width - 21, this.height - 11);
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();

    let maxTicks = 4;
    this.ctx.beginPath();
    for(let tick = 0; tick < maxTicks; tick++) {
      this.ctx.fillStyle = "rgb(0, 0, 0)";
      let id = (tick / maxTicks) * (this.maxID - this.minID);
      let val = (tick / maxTicks) * (this.maxVal - this.minVal);
      this.ctx.textAlign = "center";
      this.ctx.fillText(id, this.getXCoord(id), this.height - 3);
      this.ctx.moveTo(this.getXCoord(id), this.height - 11);
      this.ctx.lineTo(this.getXCoord(id), this.height - 19);
      this.ctx.textAlign = "right";
      this.ctx.fillText(val, this.leftStart - 5, this.getYCoord(val) + 3)
      this.ctx.moveTo(this.leftStart - 4, this.getYCoord(val));
      this.ctx.lineTo(this.leftStart + 4, this.getYCoord(val));
    }
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();

    // add some x & y steps with respective values / ids
  }

  update() {
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
    return Math.floor(this.leftStart + xStep * id);
  }

  addDataEntry(id, content) {
    if(this.dataRows.length != content.length)
      throw "Content not matching"; // likely to change to an error code
    for(let val of content)
      if(id < this.minID || id > this.maxID || val < this.minVal || val > this.maxVal)
        if(this.dynamic) {
          this.minID = Math.min(id * 1.3, this.minID);
          this.maxID = Math.max(id * 1.3, this.maxID);
          this.minVal = Math.floor(Math.min(val * 1.3, this.minVal));
          this.maxVal = Math.ceil(Math.max(val * 1.3, this.maxVal));
          this.update();
        } else
          throw "Specified data is outside of boundaries";
    this.entries[id] = content;
    console.log("---");
  }

  drawDataEntry(id, content) {
    this.ctx.lineWidth = 2;
    for(let data in content) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.getXCoord(this.lastID), this.getYCoord(this.last[data]));
      this.ctx.lineTo(this.getXCoord(id), this.getYCoord(content[data]));
      console.log("line: " + this.getYCoord(this.last[data]) + " | " + this.getYCoord(content[data]));
      this.ctx.strokeStyle = "black"; // color per data row?
      this.ctx.stroke();
    }
    this.last = content;
    this.lastID = id;
  }
}
