<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TELL ME WHY</title>
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

      lC = new LineChart(document.getElementById('canvas').getContext("2d"), ["U", "I"], 1, 15, 3, 10, true);
      lC.addDataEntry(1, [5, 2]);
      lC.addDataEntry(2, [15, 4]);
      lC.addDataEntry(3, [10, 2]);
      lC.addDataEntry(4, [25, 6]);
      lC.addDataEntry(5, [40, 40]);
      lC.addDataEntry(6, [25, 25]);
      lC.addDataEntry(8, [5, 5]);
    </script>
  </body>
</html>
