console.log(`HERE IN JS!`);

$(document).ready(function(){
  console.log(`DOM LOADED!`);


  //background theme - chalkboard
  $('body').css({
  backgroundImage: 'url("images/chalkboard_bg.jpeg")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  fontFamily: 'My Chalkboard'
  });

  //Hide the # initially -> show on click of play button
  $('#game_container').hide();


  //Global Variable for accessing box & symbol count
  let $box = $('.box');
  let symbolCount = 0;
  let $playbutton = $('.play-button');

//Start when play button is clicked
$('.play-button').on('click', function(){
  let gameOver = false;
  //Show the # once play button is hit
  $('#game_container').slideDown('slow');

  //detecting click on boxes
  $('.box').on('click', function(){
    if( gameOver ){
      resetGame();
      return;
    }
    //Check which symbol to insert
    const symbolToInsert = gameChecks.checkSymbol();
    //Add class and symbol and attach to the current class
    $(this).html(symbolToInsert);
    $(this).css({
      height: '100px',
      fontSize: '50px'
    })
    $(this).addClass('symbol'+symbolToInsert).off('click');
    //Once symbol is inserted, check for Match, i.e, check for win
    gameChecks.checkForMatch();
  });




//Reset game
const resetGame = function(){

  gameOver = false;
  $box.html('');
  symbolCount = 0;
  $gamestatus.html('');
};

//This object contains all functions needed for the game
//Symbols, images , turns , related checks etc

let gameChecks = {
  //Check for Which player won & display in #game-status class
  gameStatus: function(){
  //  debugger;

    $gamestatus = $('#game-status');
    symbolCount--;
    $gamestatus.css({
      fontSize: '20px'
    });
    $gamestatus.html(`Player  ${this.checkSymbol()}  WINS`);
     gameOver = true;
    // //if( gameOver || squareIsOccupied(this) ){
    this.askForRepeatPlay();
  },


//Check which symbol to inserted
//Alternate between symbols.
//When All turns are over (9 turns) -> game finished
checkSymbol: function() {
  let symbol = 0;
  if(symbolCount % 2 == 0){
      symbol =  'O';
  } else{
      symbol =  'X';
  }
  symbolCount++;
  //debugger;
  //If all  turns are over
  if(symbolCount == 9){
    allTurnsFinished();
    symbolCount= 0;
  }
  return symbol;
},//checkSymbol()


//All possible 'win' situations are checked
checkForMatch: function(){
  let box = {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
  };
  box[1] = $('#row11').html();
  box[2] = $('#row12').html();
  box[3] = $('#row13').html();
  box[4] = $('#row21').html();
  box[5] = $('#row22').html();
  box[6] = $('#row23').html();
  box[7] = $('#row31').html();
  box[8] = $('#row32').html();
  box[9] = $('#row33').html();

  //WIN LOGIC
  if(box[1]+box[2]+box[3] ==='OOO' || box[1]+box[2]+box[3] ==='XXX'){
    this.gameStatus();
  }
  else if(box[4]+box[5]+box[6] ==='OOO' || box[4]+box[5]+box[6] ==='XXX'){
    this.gameStatus();
  }
  else if(box[7]+box[8]+box[9] ==='OOO' || box[7]+box[8]+box[9] ==='XXX'){
    this.gameStatus();

  console.log(`row3 match`);
  }
  else if(box[1]+box[4]+box[7] ==='OOO' || box[1]+box[4]+box[7] ==='XXX'){
    this.gameStatus();

    console.log(`col1 match`);
  }
  else if(box[2]+box[5]+box[8] ==='OOO' || box[2]+box[5]+box[8] ==='XXX'){
    this.gameStatus();

  console.log(`col2 match`);
  }
  else if(box[3]+box[6]+box[9] ==='OOO' || box[3]+box[6]+box[9] ==='XXX'){
    this.gameStatus();

  console.log(`col3 match`);
  }
  else if(box[1]+box[5]+box[9] ==='OOO' || box[1]+box[5]+box[9] ==='XXX'){
    this.gameStatus();

  console.log(`diag \\ match`);
  }
  else if(box[3]+box[5]+box[7] ==='OOO' || box[3]+box[5]+box[7] ==='XXX'){
    this.gameStatus();

  console.log(`diag / match`);
  }
},//checkForMatch ()


askForRepeatPlay: function(){
console.log(`Do you wish to replay??`);
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
    $('.play-button p').on('click', function(){
      resetGame();
    });

  }

};//gameChecks



const allTurnsFinished = function(){
  console.log(`ALL TURNS FIN MATCH DRAW`);
  $gamestatus = $('#game-status');
  $gamestatus.html(`MATCH DRAW`);
  $playbutton.html();
}

})//play-button

});//ready fn()
