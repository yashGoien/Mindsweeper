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

    options.splice(index, 1); // Deletes that spot so it's no longer an option

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
var score = 0;
var inc = 2;
var num1;

function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        if (!grid[i][j].bee) {
          var num = floor(random(questions.length));
          questions.splice(num, 1);

          num1 = num;
          console.log("Question:", num);

          // Get the modal
          var modal = document.getElementById(`q${num}`);

          // Get the submit button
          var btn = document.getElementById(`submit${num}`);

          // Get the <span> element that closes the modal
          var span = document.getElementById(`close${num}`);

          //Open a new question only if the tile is not revealed previously
          if (grid[i][j].revealed) {
            modal.style.display = "none";
          } else {
            //Reveal the tile if unrevealed initially
            grid[i][j].reveal();
            //open the modal
            if (document.getElementById("login").style.display == "none") {
              modal.style.display = "block";

              // When the user clicks on <span> (x), close the modal
              // span.onclick = function() {
              //   modal.style.display = "none";
              //   console.log("close");
              //   ans12 = document.getElementById(`userAns${num}`).value;
              //   console.log(ans12);
              // };

              // // When the user clicks anywhere outside of the modal, close it
              // window.onclick = function(event) {
              //   if (event.target == modal) {
              //     modal.style.display = "none";
              //   }
              // };
              btn.onclick = function() {
                modal.style.display = "none";
                console.log("submit");
                ans12 = document.getElementById(`userAns${num}`).value;
                console.log(ans12);
                //Increse score if ans is correct
                let hashedAns = hashCode(ans12);
                console.log(hashedAns);
                if (hashedAns == correctAns[num]) {
                  console.log(ans12);
                  score = score + inc;
                  document.getElementById("score").innerHTML = score;
                  document.getElementById(`userAns${num}`).value = null;
                }
              };
            }

            // } while (!ans);
            if (document.getElementById("login").style.display == "block") {
              console.log("Login Page");
            }
            // console.log("Answer:", ans12);
            document.getElementById("score").innerHTML = score;
          }
        }

        // hit mine
        if (grid[i][j].bee) {
          console.log("Hit Mine");
          if (!grid[i][j].revealed) {
            grid[i][j].reveal();
            score = score - 3;
            document.getElementById("score").innerHTML = score;
          }
        }
      }
    }
  }
}

function draw() {
  background(255);
  //do not display game when user is logged out
  if (document.getElementById("login").style.display == "block") {
    console.log("Login Page");
  }
  //display game only when user is logged in
  else {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j].show();
      }
    }
  }
}

function hashCode(answer) {
  return answer.split("").reduce(function(a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
}

//to push data to the database
const name = document.getElementById("submitButton");
name.addEventListener("click", saveToList);
function saveToList() {
  var storeData = new Firebase("https://mindsweeper-92ffc.firebaseio.com/");
  const email = document.getElementById("email_field").value;
  var min = document.getElementById("minutes").value;
  var sec = document.getElementById("seconds").value;

  storeData.push({
    score: score,
    email: email,
    TimeMinLeft: min,
    TimeSecLeft: sec
  });
  logout();
}

window.onbeforeunload = function() {
  event.preventDefault();
};

let questions = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  62,
  63,
  64,
  65,
  66,
  67,
  68,
  69,
  70,
  71,
  72,
  73,
  74,
  75
];
