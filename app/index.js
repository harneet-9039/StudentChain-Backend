const express = require('express');
const bodyparser = require('body-parser');
const Account = require('../MinerWalletAccount/account');


const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();

const account = new Account();

app.use(bodyparser.json());


app.post('/api/create-account',(req,res)=>{
    const regno = req.body.regno;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

   if(account.AddUserAccount(regno, name, email, password))
   {
    res.status(200).send({
        success: 'true',
        message: 'created successfully'
      });
   }

   else{
    res.status(500).send({
        success: 'false',
        message: 'Internal Server Error'
        
      })
   }

    

});

app.get('/api/user-account-info', (req, res) => {
    const address = account.publicKey;
  
    res.json({
      address,
     // balance: account.calculateBalance({ chain: blockchain.chain, address })
     balance: 1000
    });
  });


app.listen(HTTP_PORT,()=>console.log(`listening on port ${HTTP_PORT}`));
