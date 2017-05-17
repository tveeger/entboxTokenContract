import EntboxContract from '../build/contracts/EntboxContract.json';
import Web3 from 'web3';

var provider = new Web3.providers.HttpProvider('http://localhost:8545')
var contract = require('truffle-contract')
var entboxContract = contract(EntboxContract)
entboxContract.setProvider(provider)
var web3 = new Web3(provider);
/*
// callback1
web3.shh.watch({
    'topic': [ web3.fromAscii('myApp'), web3.fromAscii('topic1') ]
}).arrived(function(message) {
    console.log('callback 1', message);
});

setTimeout(function(){
    // delayed doublicate callback1
    web3.shh.watch({
        'topic': [ web3.fromAscii('myApp'), web3.fromAscii('topic1') ]
    }).arrived(function(message) {
        console.log('callback 1 doublicate', message);
    });
}, 1000);


// callback2
web3.shh.watch({
    'topic': [ web3.fromAscii('myApp'), web3.fromAscii('topic2') ]
}).arrived(function(message) {
    console.log('callback 2', message);
});
*/


// SEND
setTimeout(function(){
    web3.shh.post({
        "from": web3.shh.newIdentity(),
        "topic": [web3.fromAscii('myApp'), web3.fromAscii('topic1')],
        "payload": web3.fromAscii('Hello world'),
        "ttl": 100,
        "priority": 1000
    });
}, 2000);


// anonoymous message
web3.shh.post({
        "topic": [web3.fromAscii('whisper-chat-client'), web3.fromAscii('ethereum')],
        "payload": web3.fromAscii('Hello world'),
        "ttl": 100,
        "priority": 1000
    });
