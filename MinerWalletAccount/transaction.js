const ChainUtil = require('../chain-util');
const {MINING_REWARD} = require('../config');
class Transaction{
    constructor(){
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = [];
    }

    static transactionWithOutputs(senderWallet, outputs){
        const transaction = new this();
        transaction.outputs.push(...outputs);

        Transaction.signTransaction(transaction, senderWallet);
        return transaction;
    }
    static newTransaction(senderWallet, recipient, AssignmentHash){
        

        return Transaction.transactionWithOutputs(senderWallet,[
            {amount: senderWallet.balance, address: senderWallet.publicKey},
            { AssignmentHash, address: recipient}
        ]);
        
    }

    static rewardTransaction(minerWallet, blockchainWallet){
        return Transaction.transactionWithOutputs(blockchainWallet, [{
            amount: MINING_REWARD, address: minerWallet.publicKey
        }]);
    }

    static signTransaction(transaction, senderAddress){
        transaction.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
        }
    }

    static verifyTransaction(transaction){
        return ChainUtil.verifySignature(transaction.input.address, transaction.input.signature, ChainUtil.hash(transaction.outputs));
    }
}