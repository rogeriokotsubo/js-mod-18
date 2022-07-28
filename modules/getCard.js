export default function getCard(_url) {
    return new Promise((resolve, reject) => {
        fetch(_url, { method: 'GET' })       
        .then(response => {
            if (response.status===200) {
                return response.json();  
            } else {
                return Promise.reject('Erro buscando carta');
            }
        })
        .then(function(data) {
            if (data.cards[0].success===false){
                return Promise.reject('Erro buscando 1 carta');
            }
            const cCard = {
                            code: data.cards[0].code,
                            img: data.cards[0].image,
                            remaining: data.remaining
                        };
            resolve(cCard);     
        })
        .catch(err => {
            reject(err);
        });
    });   
}