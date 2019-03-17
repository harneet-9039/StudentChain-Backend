const ChainUtil = require('../chain-util');
const {INITIAL_BALANCE} = require('../config');

class Account {

      constructor(){
      this.regno = "";
      this.name = "";
      this.email = "";
      this.password = "";
      this.coins = "";
      this.keyPair = "";
      this.publicKey = "";
    }

   
    AddUserAccount(regno, name, email, password)
    {
        try{
        this.regno = regno;
        this.name = name;
        this.email = email;
        this.password = password;
        this.coins = INITIAL_BALANCE;
      this.keyPair = ChainUtil.genKeyPair();
      this.publicKey = this.keyPair.getPublic().encode('hex');
        return true;
        }
        catch{
            return false;
        }
    }
    toString(){
      return `MinerAccount -
       publicKey: ${this.publicKey.toString()}
       balance  : ${this.coins.toString()}`
    }
}

module.exports = Account;