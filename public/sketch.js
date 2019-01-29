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

var totalBees = 30;

var set;

function setup() {
  createCanvas(801, 801);

  cols = floor(width / w);

  rows = floor(height / w);

  grid = make2DArray(cols, rows);
  set = Math.floor(Math.random() * 7);

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
var num1 = 0;
var flag = false;

function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        if (!grid[i][j].bee) {
          if (set === 0) var questions = [...questionsSet0];
          if (set === 1) var questions = [...questionsSet1];
          if (set === 2) var questions = [...questionsSet2];
          if (set === 3) var questions = [...questionsSet3];
          if (set === 4) var questions = [...questionsSet4];
          if (set === 5) var questions = [...questionsSet5];
          if (set === 6) var questions = [...questionsSet6];

          var num = questions[num1];

          // Get the modal
          var modal = document.getElementById(`q${num}`);

          // Get the submit button
          var btn = document.getElementById(`submit${num}`);
          //Open a new question only if the tile is not revealed previously

          if (grid[i][j].revealed) {
            modal.style.display = "none";
          } else {
            //Reveal the tile if unrevealed initially
            if(flag === false)
            grid[i][j].reveal();
            //open the modal
            if (document.getElementById("login").style.display == "none" && flag === false) {
              modal.style.display = "block";
              flag = true;

              window.onclick = function(event) {
              }

              btn.onclick = function() {
                modal.style.display = "none";
                flag = false;
                console.log("submit");
                ans12 = document.getElementById(`userAns${num}`).value;
                //Increse score if ans is correct
                let hashedAns = hashCode(ans12);
                if (hashedAns == correctAns[num]) {
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
            document.getElementById("score").innerHTML = score;
          }
          num1++;
        }

        // hit mine
        if (grid[i][j].bee && flag === false) {
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
 document.getElementById("game").style.display = "none";
 document.getElementById("thanks").style.display = "block";


}

window.onbeforeunload = function() {
  event.preventDefault();
};
