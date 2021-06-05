const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {abi, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'sphere hobby retire real tumble observe jungle lyrics price trial gossip light', // wallet Mnemonic
    'https://rinkeby.infura.io/v3/2cb95db2b07543e48b501372b2edcb84' // infura Node link
);

const web3 = new Web3(provider);

const innitial_message = 'Hi there';
const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account',accounts[0]);
    const result = await new web3.eth.Contract(abi).deploy(
        { 
            data:bytecode, 
            arguments:[innitial_message] // smartcontact contructor param / argument multiple can be done ['1','2',..]
        })
        .send(
        {
            from :accounts[0], 
            gas:'1000000'
        });

        console.log('Contract deployed at', result.options.address);
}

deploy();

//0x6c0C294AeCCdd24a300c0776e4279C9AAd7796e3 
// contract address
