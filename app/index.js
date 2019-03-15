const express = require('express');
const bodyparser = require('body-parser');
const Account = require('../MinerWalletAccount/account');


const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();

const account = new Account();

app.use(bodyparser.json());

app.get('/public-key',(req,res)=>{
    res.json({publicKey: account.publicKey});
    });

app.listen(HTTP_PORT,()=>console.log(`listening on port ${HTTP_PORT}`));
