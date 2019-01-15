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
var score=0;
var inc=1;
function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        if (!grid[i][j].bee) {
          var num = floor(random(questions.length));
          console.log("Question:", num + 1);
          // do {
          // ans12 = prompt(questions[num]);
          // Get the modal
          var modal = document.getElementById("myModal");

          // Get the button that opens the modal
          var btn = document.getElementById("submit");

          // Get the <span> element that closes the modal
          var span = document.getElementsByClassName("close")[0];

          // When the user clicks on the button, open the modal
          if(document.getElementById('login').style.display=="none"){
          modal.style.display = "block";
        }
          // When the user clicks on <span> (x), close the modal
          span.onclick = function() {
            modal.style.display = "none";
            ans12 = document.getElementById("ans00").value;
            // ans12 = prompt("Your Answer");
            // ans12 = prompt(questions[num]);
          };

          // When the user clicks anywhere outside of the modal, close it
          window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
              ans12 = document.getElementById("ans00").value;
              // ans12 = prompt("Your Answer");
              // ans12 = prompt(questions[num]);
            }
          };
          btn.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
              ans12 = document.getElementById("ans00").value;
            }
          };
          // } while (!ans12);
          if (ans12&&(document.getElementById('login').style.display=="none")) 
            {grid[i][j].reveal();
              score=score+inc;
            }if(document.getElementById('login').style.display=="block") {
  console.log('Login Page')
}
          console.log("Answer:", ans12);
          document.getElementById("score").innerHTML= score;
          questions.splice(num, 1);
        }
        if (grid[i][j].bee) {
          console.log("Hit Mine");
          score=score-5;
          document.getElementById("score").innerHTML=score;         
          grid[i][j].reveal();
        }
      }
    }
  }
}

function draw() {
  background(255);
//do not display game when user is logged out
if(document.getElementById('login').style.display=="block") {
  console.log('Login Page')
}
//display game only when user is logged in
else{
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}
}


hashCode = function(answer) {
  return s.split("").reduce(function(a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};

// When the user clicks on <div>, open the popup
function popup() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

//to push data to the database
const name=document.getElementById("submitButton");
name.addEventListener("click", saveToList);
function saveToList() {
var storeData = new Firebase('https://mindsweeper-92ffc.firebaseio.com/');  
const email =document.getElementById('email_field').value   
    storeData.push({
        score:score,
        email:email
    });
};