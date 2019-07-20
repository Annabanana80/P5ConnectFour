  var myBoard,
    shift,
    turn, // 0:you 1:computer
    end,
    winner,
    myComputer,
    playerImage,
    computerImage;

function setup(){
  createCanvas(window.innerWidth,window.innerHeight);
  //bg= loadImage(Koji.config.images.background);
  //playerImage=loadImage(Koji.config.images.player);
  //computerImage=loadImage(Koji.config.images.computer);
  shift = window.innerWidth/6;
  myBoard = new board();
  myBoard.init();
  myComputer = new computer();
  turn = 0; // initially, it's your turn
  end = false;
}


function draw(){
   background("#999");
   myBoard.draw();
  frameRate(2);
  if(myBoard.full()){
    end = true;
    winner = '-';
    
  }

  if(end){
    background(0,0,0,200);
    textSize(64);
    noStroke();
    if(winner == 'X'){
      fill("#000");
      var msg = "YOU WON!\n";
      frameRate(15000);
    }
    else if(winner == 'O'){
      fill("#222");
      var msg = "Computer WON!\n";
      frameRate(15000);
    }
    else if(winner == '-'){
      fill("#333");
      var msg = "DRAW!\n";
      frameRate(15000);
    }
    text(msg,width/2-100,height/2);
   // noLoop();
    
  }

  if(turn == 1){
    var state = myComputer.play();
    if(state != '-' && state != false){
      end = true;
      winner = state;
    }
    turn = 1 - turn;
  }
}
function windowResized() {
  resizeCanvas(window.innerWidth,window.innerHeight);
}
function mousePressed(){
  if(turn == 1) return;
  var begin = shift + myBoard.base.width;
  var newCol = floor(map(mouseX , begin, width-shift * 1.5, 0, 7.5));
  if(myBoard.checkColFull(newCol)) return;
  var state = myBoard.addInCol(newCol, turn);
  if(state != '-'){
    end = true;
    winner = state;
    console.log(state);
    newGame();
  }
  turn = 1 - turn;
}
   function newGame() {
       setup();
       draw();
    }
function board(){
    //portrait
  if(window.innerWidth < window.innerHeight){
    this.width = window.innerWidth/1.75;
    this.height = window.innerHeight/1.13;
    this.base = {
      width: window.innerWidth/15,
      height: window.innerHeight/1.2
    }
    //landscape
  }else{
    this.width = window.innerWidth/1.92;
    this.height = window.innerHeight/1.15;
    this.base = {
      width: window.innerWidth/45,
      height: window.innerHeight/1.13
    }
  }

  this.cells = [];
    this.sym = ['X','O'];

    this.init = function(){
        for(var i=0; i<6; i++){
            this.cells.push([]);
            for(var j=0; j<7; j++)
                this.cells[i].push('-');
        }
    }

    this.full = function(){
        for(var i=0; i<6; i++){
            for(var j=0; j<7; j++)
                if(this.cells[i][j] == '-')
                    return false;
        }
        return true;
    }

    this.checkColFull = function(col){
        return this.cells[0][col] != '-';
    }

    this.addInCol = function(col, turn){
            for(var i=5; i>=0; i--) if(this.cells[i][col] == '-'){
                this.cells[i][col] = this.sym[turn];
                break;
            }
            return this.checkWin();
    }

    this.checkWin = function(turn){
        // check rows
        for(var i=0; i<6; i++){
            for(var j=0; j<4; j++){
                if(this.cells[i][j]==this.cells[i][j+1] && this.cells[i][j]==this.cells[i][j+2] &&
                     this.cells[i][j]==this.cells[i][j+3] && this.cells[i][j]!='-')
                     return this.cells[i][j];
            }
        }
        // check cols
        for(var i=0; i<7; i++){
            for(var j=0; j<3; j++){
                if(this.cells[j][i]==this.cells[j+1][i] && this.cells[j][i]==this.cells[j+2][i] &&
                     this.cells[j][i]==this.cells[j+3][i] && this.cells[j][i]!='-')
                     return this.cells[j][i];
            }
        }
        // check right diagonals
        for(var i=0; i<3; i++){
            for(var j=0; j<4; j++){
                if(this.cells[i][j]==this.cells[i+1][j+1] && this.cells[i][j]==this.cells[i+2][j+2] &&
                     this.cells[i][j]==this.cells[i+3][j+3] && this.cells[i][j]!='-')
                     return this.cells[i][j];
            }
        }
        // check left diagonals
        for(var i=0; i<3; i++){
            for(var j=3; j<7; j++){
                if(this.cells[i][j]==this.cells[i+1][j-1] && this.cells[i][j]==this.cells[i+2][j-2] &&
                     this.cells[i][j]==this.cells[i+3][j-3] && this.cells[i][j]!='-')
                     return this.cells[i][j];
            }
        }

        return '-';
    }

    this.draw = function(){
        // right key
        // var msg;
        // if(turn == 0)
        //     msg = "Your\nTurn";
        // else
        //     msg = "Computer\nTurn"; // computer
        // strokeWeight(4);
        // stroke(240);
        // fill("green");
        // textFont('Righteous');
        // textSize(45);
        // text(msg,50,height/2);

        // body
        fill("blue");
        noStroke();
        rect(shift + this.base.width, 60, this.width, this.height);
    
        

        // base
        fill("royalblue");
        stroke(0);
        strokeWeight(2);
        // left base
        rect(shift, 50, this.base.width, this.base.height);
        // right base
        rect(shift + this.width, 50, this.base.width, this.base.height);
        // bottom base
        // noStroke();
        // rect(shift - 25, height - 30, this.width + this.base.width * 2 + 25, 30);

        // cells
        stroke(0);
        strokeWeight(4);
        for(var i=0; i<6; i++) for(var j=0; j<7; j++){

            if(this.cells[i][j] == '-')
                //noFill();
            fill("purple");
            else if(this.cells[i][j] == 'O')
                fill("white");
                //this.base.width * 2 adjusts the size of both the computer and player images
                //image(computerImage,j * 100 + shift + 20 + this.base.width + 10, i * 100 + 60 + 30, this.base.width * 2, this.base.width * 2);
            else if(this.cells[i][j] == 'X')
               // image(playerImage,j * 100 + shift + 20 + this.base.width + 10, i * 100 + 60 + 30, this.base.width * 2, this.base.width * 2);
                fill("pink");
            ellipse(j * 100 + shift + this.base.width + 60, i * 100 + 60 + 60, this.base.width * 2.5,this.base.width * 2.5);
        }

    }

}
function computer(){ // O: computer
  var board;
  this.play = function(){
    board = myBoard.cells;
    var state = false;
    // check rows
        for(var i=0; i<6; i++){
            for(var j=0; j<4; j++){
        var curr = [board[i][j],board[i][j+1],board[i][j+2],board[i][j+3]];
        state = this.checkCurr(curr, i, j, 1);
        if(state != false)
          return state;
            }
        }
        // check cols
        for(var i=0; i<7; i++){
            for(var j=0; j<3; j++){
        var curr = [board[j][i],board[j+1][i],board[j+2][i],board[j+3][i]];
        state = this.checkCurr(curr, i, j, 2);
        if(state != false)
          return state;
            }
        }
        // check right diagonals
        for(var i=0; i<3; i++){
            for(var j=0; j<4; j++){
        var curr = [board[i][j],board[i+1][j+1],board[i+2][j+2],board[i+3][j+3]];
        state = this.checkCurr(curr, i, j, 3);
        if(state != false)
          return state;
            }
        }
        // check left diagonals
        for(var i=0; i<3; i++){
            for(var j=3; j<7; j++){
       var curr = [board[i][j],board[i+1][j-1],board[i+2][j-2],board[i+3][j-3]];
       state = this.checkCurr(curr, i, j, 4);
       if(state != false)
         return state;
            }
        }

    // if reaches here, then play a random move
    var ok = true;
    while(ok){
      var c = floor(random(0,7));
      if(!myBoard.checkColFull(c)){
        myBoard.addInCol(c, turn);
        state = myBoard.checkWin();
        ok = false;
        return state;
      }
    }

      return false; // all the board is full !
  }

  this.checkCurr = function(curr, i, j, cs){
    var xCnt = 0, oCnt = 0;
    for(var k=0; k<4; k++){
     if(curr[k] == 'X') xCnt++;
     else if(curr[k] == 'O') oCnt++;
    }

    // attack
    if(oCnt == 3 && xCnt != 1){
      for(var k=0; k<4; k++){
        if(curr[k] == '-'){
          if(cs == 1){
            myBoard.addInCol(j+k, turn);
          }
          if(cs == 2)
            myBoard.cells[j+k][i] = 'O';
          if(cs == 3){
            myBoard.addInCol(j+k, turn);
          }
          if(cs == 4){
            myBoard.addInCol(j-k, turn);
          }

          return myBoard.checkWin();
        }
      }
    }

    // defend
     if(xCnt == 3 && oCnt != 1){
       for(var k=0; k<4; k++){
          if(curr[k] == '-'){
            if(cs == 1){
              myBoard.addInCol(j+k, turn);
            }
            if(cs == 2)
              myBoard.cells[j+k][i] = 'O';
            if(cs == 3){
              myBoard.addInCol(j+k, turn);
            }
            if(cs == 4){
              myBoard.addInCol(j-k, turn);
            }

          return myBoard.checkWin();
         }
       }
     }

    return false;
  }
}
