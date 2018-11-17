function rnd(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min) + min + 1);
}

function canvasDrawPixel(ctx, x, y, r, g, b, a = 0) {
  fS = ctx.fillStyle;
  ctx.fillStyle = "rgba(" + r + ", " + g + "," + b + "," + a + ")";
  ctx.fillRect(x, y, 1, 1);
  ctx.fillStyle = fS;
}

class BarChart {

  addDataEntry(id, content) {
    if(entries.length != content.length)
      throw "Content not matching"; // likely to change to an error code
    if(id < minID)
      throw "Below specified range";
    else if(id > maxID)
    maxID += 2;
    entries[id] = content;
    update();
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
  }

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
}
