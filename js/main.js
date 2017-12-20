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

  //Drawing tic tac toe lines


  let $box = $('.box');
  let symbolCount = 0;


  //detecting click on boxes
  $('.box').on('click', function(){
    // is this square already occupied?
    const symbolToInsert = gameChecks.checkSymbol();
    $(this).html(symbolToInsert);
    $(this).css({
      height: '100px',
      fontSize: '50px'
    })
    $(this).addClass('symbol'+symbolToInsert).off('click');
    gameChecks.checkForMatch();
  });


//Object for game checks i.e, symbol checks and win checks
let gameChecks = {

  gameStatus: function(){
    $gamestatus = $('#game-status');
    symbolCount--;
    $gamestatus.html(`Player ${this.checkSymbol()} WINS`);
  },

// const checkSymbol = function(){
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
  $box = $('.box')
  if(symbolCount == 9){
    allTurnsFinished();
    symbolCount= 0;
  }
  return symbol;
},//checkSymbol



//const checkForMatch = function(){
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
  };  //debugger;
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


}//checkForMatch ()

};//gameChecks
const allTurnsFinished = function(){
  console.log(`ALL TURNS FIN MATCH DRAW`);
  $gamestatus = $('#game-status');
  $gamestatus.html(`MATCH DRAW`);
}






});//ready fn()
