
import cards from './modules/cards.js';
import getCard from './modules/getCard.js';
import remoteShuffle from './modules/remoteSuffle.js';
import resultHand from './modules/resultHand.js';
import { filterCard,createHand,clearHand,btnPlayHover } from './modules/auxFunctions.js';

const btnPlay = document.querySelector('#btn-play');
const card = document.querySelectorAll('.card');
const msg = document.querySelector('#p-deck');
btnPlay.addEventListener('click', shuffle);

let remainingCards = 0;
let shuffled = false;
let deckId = '4r11xlp1bd86';
let deckHand = [];
let suitHand = [];

createHand();

async function shuffle() {
    let url='';
    msg.innerHTML = ` `;

    for (let i=0; i<5; i++){
        card[i].style.backgroundImage = '';            
        card[i].style.display = 'none';            
    }

    if (deckId===''){
        url=`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
    }    
    else{
        url=`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`;
    };    

    try {
        const res = await remoteShuffle(url);
        if (res.success === true){
            remainingCards = res.remaining;
            shuffled = res.shuffled;
            if (deckId===''){
                deckId = res.deck_id;
            };

            play();
        }else {
            remainingCards = 0;
            shuffled = false;
        };
    }    
    catch(err){
        msg.innerHTML=`[ERRO]: ${err}`;
        remainingCards = 0;
        shuffled = false;
    };
}

async function play() {
    if (remainingCards<5){
        msg.innerHTML=`[AVISO]: Por favor, embaralhe as cartas.`
        return;
    }

    msg.innerHTML=`&nbsp;`;
    btnPlay.disabled = true;
    btnPlayHover();


    // limpando deck e suit
    clearHand();

    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
    let cCard = '';
    try{
        for (let i=0; i<5; i++){
            cCard = await getCard(url);
            card[i].style.backgroundImage = `url(${cCard.img}`;   
            remainingCards = cCard.remaining;  
            let cardId = 0;       

            const cardFind = filterCard(cCard.code);

            if (cardFind[0].id % 13 === 0) {
                cardId = 12;
            } else {
                cardId = cardFind[0].id % 13 - 1;
            };
            deckHand[cardId].n += 1;
            suitHand[cardFind[0].suit] += 1;
        }
        for (let i=0; i<5; i++){
            card[i].style.display = 'block';            
        }
    
        resultHand();
        btnPlay.disabled = false;
        btnPlayHover();
    }    
    catch(err){
        msg.innerHTML=`[ERRO]: ${err}.`;
        btnPlay.disabled = false;
        btnPlayHover();
        return;
    }   
}




btnPlayHover();
clearHand();

export { deckHand, suitHand, msg, btnPlay };