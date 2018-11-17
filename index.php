<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <script src="functions.js"></script>

    <script type="text/javascript">
      function canvasDrawPixel(ctx, x, y, r, g, b, a = 0) {
        fS = ctx.fillStyle;
        ctx.fillStyle = "rgba(" + r + ", " + g + "," + b + "," + a + ")";
        ctx.fillRect(x, y, 1, 1);
        ctx.fillStyle = fS;
      }
    </script>
  </head>
  <body>
    <canvas id="canvas" width="512" height="512"></canvas>
    <script>
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext("2d");
      for(x = 0; x < 512; x++) {
        for(y = 0; y < 512; y++) {
          canvasDrawPixel(ctx, x, y, rnd(0, 255), rnd(0, 255), rnd(0, 255), rnd(0, 50) / 100 + 50);
        }
      }
    </script>
  </body>
</html>
