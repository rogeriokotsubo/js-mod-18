import { deckHand, suitHand, btnPlay } from '../page2.js';
import cards from '../modules/cards.js';

export function filterCard(_code){
    let filtered = [];
    filtered = cards.filter(function(obj){ 
        if (obj.code===_code) {
        return true;
        } else {
        return false;
        }
    });
    return filtered;
}

export function createHand(){
    for (let i = 0; i < 13; i++) {
        deckHand.push({ "card": cards[i].card, "n": 0 });
    };

    suitHand [0] = 0; // heart
    suitHand [1] = 0; // club 
    suitHand [2] = 0; // diamond
    suitHand [3] = 0; // spade      
} 

export function clearHand(){
    for (let i = 0; i < 52; i++) {
        cards[i].n = 0;

        if (i<13){
            deckHand[i].n = 0;
        }

        if (i<4){
            suitHand[i] = 0;
        }
    };
} 

export function btnPlayHover(){
  if (btnPlay.disabled){
    btnPlay.style.backgroundColor='#787878';
    btnPlay.style.color='#ffffff';
    btnPlay.style.cursor='default'
  } else {
    btnPlay.style.backgroundColor='#78787870';
    btnPlay.style.color='#000000';
    btnPlay.style.cursor='pointer';
  };
}

