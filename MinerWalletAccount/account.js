const ChainUtil = require('../chain-util');
const {INITIAL_BALANCE} = require('../config');

class Wallet {
    constructor(){
      this.balance = INITIAL_BALANCE;
      this.keyPair = ChainUtil.genKeyPair();
      this.publicKey = this.keyPair.getPublic().encode('hex');
    }
  
    toString(){
      return `MinerAccount -
       publicKey: ${this.publicKey.toString()}
       balance  : ${this.balance}`
    }
}