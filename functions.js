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
  constructor(ctx, dataRows, minID = 0, maxID = 1, minVal = 0, maxVal = 50) {
    this.ctx = ctx;
    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;
    this.dataRows = dataRows;
    this.minID = minID;
    this.maxID = maxID;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.entries = new Array();
    this.ctx.lineWidth = 2;
    this.update();
  }

  update() {
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

    var step = (this.maxVal - this.minVal) / (this.height + 10);
    var last = Array. apply(null, {length: this.dataRows.length}).map(function() {return 0});
    var lastID = 0;
    this.ctx.lineWidth = 1;
    for (let id in this.entries) {
      let points = this.entries[id];
      for(let pnt in points) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.getXCoord(lastID), this.getYCoord(last[pnt]));
        this.ctx.lineTo(this.getXCoord(id), this.getYCoord(points[pnt]));
        this.ctx.stroke();
        // height - step * last[pnt] + 15
      }
      last = points;
      lastID = id;
    }
    console.log("---");
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
    if(id < this.minID)
      throw "Below specified range";
    else if(id > this.maxID)
    this.maxID += 2;
    this.entries[id] = content;
    this.update();
  }
}
