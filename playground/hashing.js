const {SHA256} = require('crypto-js');

// se puede hashear pero no se puede deshashear
// si hasheo la pass y es igual a la guardada entonces es valida.
const message = 'I am user number 3';
let hash = SHA256(message).toString();

console.log(message, hash);

let data = {
    id:4
};

let token = {
    data, 
    hash: SHA256(JSON.stringify(data) + 'someSecret').toString()
}

let resultHash = SHA256(JSON.stringify(data) + 'someSecret').toString()

if(resultHash === token.hash){
    console.log('Data was not changed');
} else {
    console.log('Data was changed');    
}



// ASI ES COMO FUNCIONA EL JWT