const ChainUtil = require('../chain-util');
const {INITIAL_BALANCE} = require('../config');

class Wallet {

      constructor(){
      this.regno = "";
      this.coins = "";
      this.keyPair = "";
      this.publicKey = "";
    }

   
    AddMinerAccount(regno)
    {
        try{
        this.regno = regno;
        this.coins = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
        return true;
        }
        catch{
            return false;
        }
    }

    
    AddClientAccount(regno)
    {
        try{
        this.regno = regno;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
        return true;
        }
        catch{
            return false;
        }
    }
    toString(){
      return `"regno":"${this.regno.toString()},","publicKey":"${this.publicKey.toString()}","balance"  :"${this.coins.toString()}"`
    }

    sign(AssignmentFileDataHash){
        return this.keyPair.sign(AssignmentFileDataHash);
      }
}

module.exports = Wallet;