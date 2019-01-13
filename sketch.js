function make2DArray(cols, rows) {
  var arr = new Array(cols);

  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }

  return arr;
}

var grid;

var cols;

var rows;

var w = 80;

var totalBees = 25;

function setup() {
  createCanvas(801, 801);

  cols = floor(width / w);

  rows = floor(height / w);

  grid = make2DArray(cols, rows);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  // Pick totalBees spots

  var options = [];

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  for (var n = 0; n < totalBees; n++) {
    var index = floor(random(options.length));

    var choice = options[index];

    var i = choice[0];

    var j = choice[1];

    // Deletes that spot so it's no longer an option

    options.splice(index, 1);

    grid[i][j].bee = true;
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].countBees();
    }
  }
}

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
}

var ans12;

function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        if (!grid[i][j].bee) {
          var num = floor(random(questions.length));
          console.log("Question:", num + 1);
          do {
            ans12 = prompt(questions[num]);
          } while (!ans12);
          if (ans12) grid[i][j].reveal();
          console.log("Answer:", ans12);
          questions.splice(num, 1);

          //  TODO: pop up question
        }
      }
    }
  }
}

function draw() {
  background(255);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}
