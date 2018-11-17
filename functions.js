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
    this.ctx.fillStyle = "rgb(0, 0, 0)";
    this.ctx.fillRect(5, 5, 1, this.height - 10);
    this.ctx.
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
    this.update();
  }
}
