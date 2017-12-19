console.log(`HERE IN JS!`);

$(document).ready(function(){
  console.log(`DOM LOADED!`);

  let $row11 = $('.row1 .box-1');
  let $row12 = $('.row1 .box-2');
  let $row13 = $('.row1 .box-3');
  let $box = $('.box');
  let symbolCount = 0;
  let boxContents = {
    row0: [],
    row1: [],
    row2: []
    };

  //detecting click on boxes
  $('.box').on('click', function(){
    // is this square already occupied?
    const symbolToInsert = checkSymbol();
    let currBox = $(this).attr('id');
    $(this).html(symbolToInsert);
    //checkForMatch();
  });

const checkSymbol = function(){
  let symbol = 0;
  if(symbolCount % 2 == 0){
      symbol =  'O';
  } else{
      symbol =  'X';
  }
  symbolCount++;

  //If all 9 turns are over
  if(symbolCount == 9){
    allTurnsFinished();
  }
  return symbol;
};


const checkForMatch = function(){

}

const allTurnsFinished = function(){
  console.log(`GAME OVER`);
  $('.box').off('click');//off clicks on boxes
  symbolCount = 0;
}


const showSymbol = function(){
  const $div = $('<div>');
  $div.addClass('symbol');
  // $div.css({
  //   backgroundImage:  'url(https://qph.ec.quoracdn.net/main-qimg-4ac0bf076120fa49f9b925d735b1578a)',
  //   // 'background-image':  'url(https://qph.ec.quoracdn.net/main-qimg-4ac0bf076120fa49f9b925d735b1578a)',
  //   backgroundSize: 'cover',
  //   width: '100%',
  //   height: '100%',
  //   border: '2px solid red'
  // });
  $('li.box-1').append($div);
};



});//ready fn()
