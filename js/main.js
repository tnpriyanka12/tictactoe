console.log(`HERE IN JS!`);




$(document).ready(function(){
  //Global Variable for accessing box & symbol count
  let $box = $('.box');
  let symbolCount = 0;
  let $playbutton = $('.play-button');
  let gameOver = false;
  let addImage = 1;
  let playerOneWinCount = 0;
  let playerTwoWinCount = 0;
  //let playMode = 'multi';
  let box = {};
  let randBox = '';


  let playMode = 'single';
  let aiActve = 0;

  const initGame = function () {

    // start a single player game (when the page first loads, this is the default)
    if(playMode == 'single'){
       //Highlight single game MODE
       $('.singleplay-button').css({
         color: 'yellow'
       });
    }//if playmode = single
    //Start when play button is clicked
    $('.box').css({
    backgroundColor: '',
    color: 'white'
    });

  // //for first time
  // playMode = ($(this).attr('class') == 'multiplay-button') ? 'multi' : 'single';
  // console.log(`class clicked is : ${$(this).attr('class')},  ${playMode}`);

  //As soon as play is hit
  $playbutton.html('Game in Progress...')
  //Show the game board
  $('#game_container').slideDown('slow');


    //As a box clicks, check which symbol to insert and check for match
    $('.box').on('click', function(){
      $(this).off('click');
      console.log(`hello hereeeee`);
      const symbolToInsert = gameChecks.checkSymbol();
      $(this).html(symbolToInsert);
      $(this).css({
        height: '100px',
        fontSize: '50px'
      });
      console.log(`im hereeeeeee: ${symbolCount}`);

      //Once symbol is inserted, check for Match, i.e, check for win
      gameChecks.checkForMatch();

      if(aiActve)
      playAIMode();

    });//box



//This object contains all functions needed for the game
//Symbols, images , turns , related checks etc
  let gameChecks = {

    //Check which symbol to inserted
    //Alternate between symbols.
    //When All turns are over (9 turns) -> game finished
    checkSymbol: function() {
      let symbol = 0;
      if(symbolCount % 2 == 0){
          symbol =  'O';
      } else {
          symbol =  'X';
      }
      symbolCount++;
      return symbol;
    },//checkSymbol()

    //Check & Display Which player won & display in #game-status class
    checkGameStatus: function(){
      $gamestatus = $('#game-status');
      $gamestatus.css({
        fontSize: '20px'
      });
      symbolCount--;
      $gamestatus.html(`Player  ${this.checkSymbol()}  WINS`);
      $('.box').off('click');

      if(playMode == 'multi'){
        console.log(`cureeeent symb: ${this.checkSymbol()}`);
        if(this.checkSymbol() == 'X'){
          playerOneWinCount++;
          console.log(`cureeeent player1count: ${playerOneWinCount}`);

        } else {
          playerTwoWinCount++
          console.log(`cureeeent player2count: ${playerTwoWinCount}`);

        }

        $gamestatus.html(`Player  ${this.checkSymbol()}  WINS
        <br/>Player X Score : ${playerOneWinCount}
        <br/>Player O Score : ${playerTwoWinCount}`);
      };

      askForRepeatPlay();
    },


  //All possible 'win' situations are checked
  checkForMatch: function(){

    box[1] = $('#row11').text();
    box[2] = $('#row12').text();
    box[3] = $('#row13').text();
    box[4] = $('#row21').text();
    box[5] = $('#row22').text();
    box[6] = $('#row23').text();
    box[7] = $('#row31').text();
    box[8] = $('#row32').text();
    box[9] = $('#row33').text();

    //WIN LOGIC
    if(box[1]+box[2]+box[3] ==='OOO' || box[1]+box[2]+box[3] ==='XXX'){
      this.checkGameStatus();
      $('#row11, #row12, #row13').css({
        backgroundColor: 'rgba(255,255,255,.4)',
        color: 'black'
      });
      }
    else if(box[4]+box[5]+box[6] ==='OOO' || box[4]+box[5]+box[6] ==='XXX'){
      this.checkGameStatus();
      $('#row21, #row22, #row23').css({
        backgroundColor: 'rgba(255,255,255,.4)',
        color: 'black'
      });
    }
    else if(box[7]+box[8]+box[9] ==='OOO' || box[7]+box[8]+box[9] ==='XXX'){
      this.checkGameStatus();
      $('#row31, #row32, #row33').css({
        backgroundColor: 'rgba(255,255,255,.4)',
        color: 'black'
      });
    }
    else if(box[1]+box[4]+box[7] ==='OOO' || box[1]+box[4]+box[7] ==='XXX'){
      this.checkGameStatus();
      $('#row11, #row21, #row31').css({
        backgroundColor: 'rgba(255,255,255,.4)',
        color: 'black'
      });
    }
    else if(box[2]+box[5]+box[8] ==='OOO' || box[2]+box[5]+box[8] ==='XXX'){
      this.checkGameStatus();
      $('#row12, #row22, #row32').css({
        backgroundColor: 'rgba(255,255,255,.4)',
        color: 'black'
      });
    }
    else if(box[3]+box[6]+box[9] ==='OOO' || box[3]+box[6]+box[9] ==='XXX'){
      this.checkGameStatus();
      $('#row13, #row23, #row33').css({
        backgroundColor: 'rgba(255,255,255,.4)',
        color: 'black'
      });
    }
    else if(box[1]+box[5]+box[9] ==='OOO' || box[1]+box[5]+box[9] ==='XXX'){
      this.checkGameStatus();
      $('#row11, #row22, #row33').css({
        backgroundColor: 'rgba(255,255,255,.4)',
        color: 'black'
      });
    }
    else if(box[3]+box[5]+box[7] ==='OOO' || box[3]+box[5]+box[7] ==='XXX'){
      this.checkGameStatus();
      $('#row13, #row22, #row31').css({
        backgroundColor: 'rgba(255,255,255,.4)',
        color: 'black'
      });
    }
    else if(symbolCount == 9){
      console.log(`match draw`);
      allTurnsFinished();
    }

    }//checkForMatch ()

    };//gameChecks

  }; // end of initGame()

const multiGame = function(){
  playMode = 'multi';

      //Highlight multi game MODE
      $('.multiplay-button').css({
        color: 'yellow'
      });
      $('.singleplay-button').css({
        color: 'white'
      });

  resetGame();
  initGame();
};

const aiModeGame = function(){
  playMode = 'single';
  aiActve = 1;

      //Highlight multi game MODE
      $('.aimode-button').css({
        color: 'yellow'
      });
      $('.singleplay-button, .multiplay-button').css({
        color: 'white'
      });

  resetGame();
  initGame();
};

//ACTUAL
  $('.play-button').on( 'click', initGame );
  $('.multiplay-button').on('click', multiGame);
  $('.aimode-button').on('click', aiModeGame);



//Reset game
const resetGame = function(){
  gameOver = false;
  $box.html('');
  symbolCount = 0;
  $gamestatus.html('');
};//resetGame


const allTurnsFinished = function(){
    console.log(`ALL TURNS FIN MATCH DRAW`);
    console.log(`symb count1 = ${symbolCount}`);
    $gamestatus = $('#game-status');
    $gamestatus.html(`MATCH DRAW`);
      $('.box').off('click');
    askForRepeatPlay();

};//allTurnsfinished


const askForRepeatPlay =  function(){
    gameOver = true;
    console.log(`symb countrepplay = ${symbolCount}`);


    //If game over, promt user to restart
    $('.play-button').html('GAME OVER!!!!');
    $('.play-button').animate({
      fontSize: '20px'
    });

      $para = $('<p></p>');
      $para.css({
        fontSize: '20px'
      });
      $('.play-button').append($para);
      $para.html('->RESTART (click to restart)<-');
      console.log($para);
      $para.animate({
        fontSize: '20pt'
      }, 2500);

      $('.play-button p').on('click', function(){
        resetGame();
      });

};



//AI mode
const playAIMode = function(){

          if(aiActve && symbolCount %2 == 1){
            let availBoxes= [];

            box[1] = $('#row11').text();
            box[2] = $('#row12').text();
            box[3] = $('#row13').text();
            box[4] = $('#row21').text();
            box[5] = $('#row22').text();
            box[6] = $('#row23').text();
            box[7] = $('#row31').text();
            box[8] = $('#row32').text();
            box[9] = $('#row33').text();

            for( let i = 1; i < 10; i++ ){
             if(box[i] == ''){
               availBoxes.push(i);
              console.log(`after push: ${availBoxes}`);

             }
           }//for

            let randNumForAvailBoxes = (Math.floor ( Math.random() * availBoxes.length ));
            randBox = availBoxes[randNumForAvailBoxes];
            console.log(`after rand: ${randNumForAvailBoxes}, ${randBox}`);

            let randrow = '';

            if(randBox == 1)      randrow = '#row11';
            else if(randBox == 2) randrow  = '#row12';
            else if(randBox == 3) randrow  = '#row13';
            else if(randBox == 4) randrow  = '#row21';
            else if(randBox == 5) randrow  = '#row22';
            else if(randBox == 6) randrow  = '#row23';
            else if(randBox == 7) randrow  = '#row31';
            else if(randBox == 8) randrow  = '#row32';
            else if(randBox == 9) randrow  = '#row33';
            console.log(`randrow: ${randrow}`);

            $(randrow).html('X');
            $(randrow).css({
              height: '100px',
              fontSize: '50px'
            });
            symbolCount++;
            gameChecks.checkForMatch();
            return;

          }

};


  initGame(); // start the game in single player mode when the page loads

});//ready fn()
