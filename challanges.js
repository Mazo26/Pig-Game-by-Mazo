/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice, input, winningScore, dices;


document.querySelector('.btn-roll').addEventListener('click', function(){ 
    if(gamePlaying){
        //random number
    var dice = Math.floor(Math.random()*6) + 1;
  //display the number
     var diceDOM = document.querySelector('.dice');
    diceDOM.style.display= 'block';
    diceDOM.src = 'dice-' + dice + '.png';
        
//diceDOM2
        var dice2 = Math.floor(Math.random()*6) + 1;
var diceDOM2 = document.querySelector('.dice2');
    diceDOM2.style.display= 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png';   
        
        dices = dice + dice2;
  //update the score
        if(dice === 1 || dice2 === 1){
            scores[activePlayer] = 0;
            document.querySelector('#score-'+ activePlayer).textContent = '0';
            nextPlayer();
        }else if(dice !== 1){
        roundScore += dices;
        document.querySelector('#current-' + activePlayer).textContent= roundScore; //dodaje score u crvenoj kockici
    }else{
        //sledeci igrac
        nextPlayer();
    }
        lastDice = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //dodaj trenutni score u globalni score
    scores[activePlayer] += roundScore;
    //update the UI
    document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];
        
    input = document.querySelector('.final-score').value;
    if(input){
        input = winningScore;
    }else{
        winningScore= 100;
    }
    //proveri da li je igrac pobedio
    if(scores[activePlayer] >= winningScore){
        document.getElementById('name-'+ activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        gamePlaying = false;
         }else{
         //sledeci igrac
    nextPlayer();
    }
       }
   });

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent='0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
scores = [0,0];
roundScore = 0;
activePlayer = 0; 
gamePlaying = true;

document.querySelector('.dice').style.display= 'none'; //-menjanje css kroz js 
document.querySelector('.dice2').style.display= 'none';
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;

document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
    
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
}

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; - samo da znam za html elemente
//var x = document.querySelector('#score-0').textContent;

/* function btn(){
    //nesto radi i kasnije se poziva u eventlistener
} */




/* 1. A player loses the entire score if he gets two 6's in a row. After that, it's the next player's turn. (Hint: always save the previous dice roll in a separate variable.)
2. Add a input field to the HTML where players can set the the winning score, so that they can change predefined score of 100. (hint: you can read that the value with the .value property in Javascript. This is a good opportuinity to use google to figure this out)
3. Add another dice to the game, so that there are two dices now. The player loses his current score when one of them is a 1. (hint: you will need css code for the first one. )
*/