export default function remoteShuffle(_url) {
    return new Promise((resolve, reject) => {
        fetch(_url, { method: 'GET' })       
        .then(response => {
            if (response.status===200) {
                return response.json();  
            } else {
                return Promise.reject('Erro embaralhando deck');
            }
        })
        .then(function(data) {
            resolve(data);     
        })
        .catch(err => {
            reject(err);
        });
    });   
}