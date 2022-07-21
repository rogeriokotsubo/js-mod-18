
import cards from './modules/cards.js';
import getCard from './modules/getCard.js';
import remoteShuffle from './modules/remoteSuffle.js';
import resultHand from './modules2/resultHand.js';
import { filterCard,createHand,clearHand,btnPlayHover } from './modules2/auxFunctions.js';

const btnPlay = document.querySelector('#btn-play');
const card = document.querySelectorAll('.card');
const msg = document.querySelector('#p-deck');
btnPlay.addEventListener('click', shuffle);

let remainingCards = 0;
let shuffled = false;
let deckId = '4r11xlp1bd86';
//let deckId = '';
let deckHand = [];
let suitHand = [];

createHand();

function shuffle() {
    let url='';
    msg.innerHTML = ` `;

    for (let i=0; i<5; i++){
        card[i].style.backgroundImage = '';            
        card[i].style.display = 'none';            
    }

    msg.innerHTML=`&nbsp;`;
    btnPlay.disabled = true;
    btnPlayHover();
    clearHand();

    if (deckId===''){
        url=`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;

        remoteShuffle(url)
            .then(res => {
                if (res.success === true){
                    remainingCards = res.remaining;
                    shuffled = res.shuffled;
                    deckId = res.deck_id;
                    }else {
                    return Promise.reject('Erro buscando deckId');
                };
            })    
            .catch(err => {
                msg.innerHTML=`[ERRO]: ${err}`;
                remainingCards = 0;
                shuffled = false;
                return;
            });
        msg.innerHTML=`[AVISO]: Inicializando Id do Deck. Favor Embaralhar novamente.`;
        btnPlay.disabled = false;
        btnPlayHover();
        return;
        }    
    else{
        url=`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`;
    };    

    const url1 = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;

    const res = remoteShuffle(url);
    const cCard1 = getCard(url1);
    const cCard2 = getCard(url1);
    const cCard3 = getCard(url1);
    const cCard4 = getCard(url1);
    const cCard5 = getCard(url1);

    Promise.all([res, cCard1, cCard2, cCard3, cCard4, cCard5])
        .then((values) => {
            if (values[0].shuffled && values[0].success){        
                for (let i=0; i<5; i++){    
                    card[i].style.backgroundImage = `url(${values[i+1].img}`;   

                    let cardId = 0;       
                    let cardFind = filterCard(values[i+1].code);

                    cards[cardFind[0].id-1].n += 1;

                    if (cardFind[0].id % 13 === 0) {
                        cardId = 12;
                    } else {
                        cardId = cardFind[0].id % 13 - 1;
                    };
                    deckHand[cardId].n += 1;
                    suitHand[cardFind[0].suit] += 1;
                }

                for (let i=0; i<52; i++){
                    if (cards[i].n>1){
                        return Promise.reject('Erro de duplicidade.')
                    }
                }           

                remainingCards = values[5].remaining;  

                for (let i=0; i<5; i++){
                    card[i].style.display = 'block';            
                }
                resultHand();
                btnPlay.disabled = false;
                btnPlayHover();
            }else {
                return Promise.reject('Erro embaralhando.')
            }    
            })
        .catch((err) => {
            msg.innerHTML=`[ERRO]: ${err}.`;
            btnPlay.disabled = false;
            btnPlayHover();
            return;
        });
}

btnPlayHover();
clearHand();

export { deckHand, suitHand, msg, btnPlay };