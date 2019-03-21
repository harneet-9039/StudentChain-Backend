const express = require('express');
const bodyparser = require('body-parser');
const Account = require('../MinerWalletAccount/account');
var app = express();
const path = require('path');
var fs = require('fs');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3001;
var loopLimit = 0;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
 // fs.writeFile(__dirname + '/start.log', 'started'); 
});


app.use(express.static(path.join(__dirname,'./Static')));
app.use('/Js',express.static(path.join(__dirname , './Static/Js')));
app.use('/CSS',express.static(path.join(__dirname , './Static/CSS')));
app.use('/Images',express.static(path.join(__dirname , './Static/Images')));
app.use('/Documents',express.static(path.join(__dirname + './Static/Documents')));



//const account = new Account();

app.use(bodyparser.json());


/*app.post('/api/create-account',(req,res)=>{
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
      });
   }

    

});*/

/*app.get('/api/user-account-info', (req, res) => {
    const address = account.publicKey;
  
    res.json({
      address,
     // balance: account.calculateBalance({ chain: blockchain.chain, address })
     balance: 1000
    });
  });*/
  io.on('connection', function (socket) {
  socket.on('join-network', function (){
    console.log(socket.username + " wants to join the network");
    io.emit('useradded', {
      username: socket.username
    });
  });
});


//app.listen(HTTP_PORT,()=>console.log(`listening on port ${HTTP_PORT}`));
