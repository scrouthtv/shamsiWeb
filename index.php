<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <script src="functions.js"></script>
  </head>
  <body>
    <canvas id="canvas" width="512" height="256"></canvas>
    <script>
      // randomly draw pixels
      //var canvas = document.getElementById('canvas');
      //var ctx = canvas.getContext("2d");
      //for(x = 0; x < 512; x++) {
        //for(y = 0; y < 512; y++) {
          //canvasDrawPixel(ctx, x, y, rnd(0, 255), rnd(0, 255), rnd(0, 255), rnd(0, 50) / 100 + 50);
        //}
      //}

      lC = new LineChart(document.getElementById('canvas').getContext("2d"), ["U", "I"], 1, 15);
      lC.addDataEntry(1, [15, 22]);
      lC.addDataEntry(2, [20, 18]);
      lC.addDataEntry(3, [18, 24]);
      lC.addDataEntry(4, [20, 15]);
    </script>
  </body>
</html>
