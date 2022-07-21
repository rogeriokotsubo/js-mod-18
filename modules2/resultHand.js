import { deckHand, suitHand, msg } from '../page2.js';

export default function resultHand(){
    let color = 0;
    let sequencia = 0;
    let dupla = 0;
    let trinca = 0;
    let quadra = 0;

    for (let i = 0; i < 13; i++) {
        if (deckHand[i].n === 2) {
            dupla += 1;
        }
        if (deckHand[i].n === 3) {
            trinca += 1;
        }
        if (deckHand[i].n === 4) {
            quadra += 1;
        }
        if (deckHand[i].n === 1) {
            if (deckHand[12] === 1 && i === 0) {
                sequencia += 1;
            }
            sequencia += 1;
        } else {
            sequencia = 0;
        }
    }

    for (let i = 0; i < 4; i++) {
        if (suitHand[i] === 5) {
            color = 1;  // 5 cartas do mesmo naipe
        }
    }

    if (sequencia === 5 && color === 1) {       // 5 cartas em sequencia do mesmo naipe
        msg.innerHTML = `Straight Flush !!!!!!!`;
    } else if (quadra === 1) {                // 4 cartas iguais
        msg.innerHTML = `Quadra !!!!!!`;
    } else if (trinca === 1 && dupla === 1) {  // 1 trinca e 1 dupla
        msg.innerHTML = `Full House !!!!!`;
    } else if (sequencia === 5) {             // 5 cartas na sequencia
        msg.innerHTML = `Sequencia !!!!`;
    } else if (trinca === 1) {                // 1 trinca
        msg.innerHTML = `Trinca !!!`;
    } else if (dupla === 2) {                // 2 duplas
        msg.innerHTML = `Duas Duplas !!`;
    } else if (dupla === 1) {                // 1 dupla
        msg.innerHTML = `Uma Dupla !`;
    } else {
        msg.innerHTML = `Nada`;
    };
}
