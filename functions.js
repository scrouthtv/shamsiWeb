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
  constructor(ctx, dataRows, minID = 0, maxID = 1) {
    this.ctx = ctx;
    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;
    this.dataRows = dataRows;
    this.minID = minID;
    this.maxID = maxID;
    this.entries = new Array();
    this.ctx.lineWidth = 2;
    this.update();
  }

  update() {
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

    var max = Array.apply(null, {length: this.dataRows.length}).map(function() {return 0});
    for (let id in this.entries) {
      let points = this.entries[id];
      for(let valID in points) {
        if(points[valID] > max[valID])
          max[valID] = points[valID];
      }
    }
    var steps = new Array(); // in y values per 1 px
    for(let cat in max) {
      steps[cat] = max[cat] / (this.height + 10);
      //steps[cat] = Math.round((max[cat] / (this.height + 10)) * 10000) / 10000; rounded
    }
    console.log(steps);

    var last = new Array();
    for (let id in this.entries) {
      let points = this.entries[id];
      for(let pnt in points) {
        // draw them
      }
    }
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
