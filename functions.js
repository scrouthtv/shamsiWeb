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
  // canvas context, width, height, array with contents
  constructor(ctx, width, height, dataRows, minID = 0, maxID = 1) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.dataRows = dataRows;
    this.minID = minID;
    this.maxID = maxID;
    this.entries = new Array();
  }

  addDataEntry(id, content) {
    if(entries.length != content.length)
      throw "Content not matching"; // likely to change to an error code
    if(id < minID)
      throw "Below specified range";
    else if(id > maxID)
    this.maxID += 2;
    this.entries[id] = content;
  }
  update() {
    this.ctx.fillStyle = "rgb(0, 0, 0)";
    this.ctx.
  }
}
