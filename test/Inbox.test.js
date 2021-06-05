const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {abi, bytecode} = require('../compile');

const web3 = new Web3(ganache.provider()); // chnage provder when use different network


let accounts;
let inbox;
const innitial_message = 'Hi There';

beforeEach( async ()=>{
//get a list of all accounts
accounts = await web3.eth.getAccounts();

// use one account to deploy contract 
console.log('Attempting to deploy from account:', accounts[0]);
inbox = await new web3.eth.Contract(abi).deploy(
    { 
        data:bytecode, 
        arguments:[innitial_message] // smartcontact contructor param / argument multiple can be done ['1','2',..]
    })
    .send(
    {
        from :accounts[0], 
        gas:'1000000'
    });
});

describe('Inbox',()=>{
    it('deploy a contract',()=>{
// console.log(accounts);
// console.log(inbox);
     assert.ok(inbox.options.address); //ok mean value exist or a dfined value 
     console.log('contract deployed at' + inbox.options.address );
    });

    it('constructor has default value', async ()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message,innitial_message);
    });

    it('setMessage works',async ()=>{
        await inbox.methods.setMessage('hello bye').send({
            from: accounts[0]
        });
        const message = await inbox.methods.message().call();
        assert.equal(message,'hello bye');

    })





});




// class Car{
//     park(){
//         return 'stopped';
//     }
//     drive(){
//         return 'vroom';
//     }
// }


// // this is used for some common code , this will run before every IT
// let car;
// beforeEach(()=>{
//     car = new Car();
// })
// describe('car', ()=>{
//     it('car-park-fn',()=>{
        
//         assert.equal(car.park(),'stopped');
//     });

//     it('can drive',()=>{
        
//         assert.equal(car.drive(),'vroom');
//     })

// });