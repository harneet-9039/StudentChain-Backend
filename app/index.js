const express = require('express');
const bodyparser = require('body-parser');
const Account = require('../MinerWalletAccount/account');
var app = express();

const path = require('path');
const Blockchain = require('../Chain')
var fs = require('fs');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3001;
var Authorize = require('./Authorize');

server.listen(port, function () {
  console.log('Server listening at port %d', port);
 // fs.writeFile(__dirname + '/start.log', 'started'); 
});







app.use(bodyparser.json());
//app.use(express.static(path.join(__dirname,'./Static')));
app.use('/Js',express.static(path.join(__dirname , './Static/Js')));
app.use('/CSS',express.static(path.join(__dirname , './Static/CSS')));
app.use('/Images',express.static(path.join(__dirname , './Static/Images')));
app.use('/Documents',express.static(path.join(__dirname + './Static/Documents')));

const bc = new Blockchain();

//const account = new Account();


app.get('/',(req, res)=>{
  res.sendFile(path.join(__dirname,'./Static/index.html'))
});

app.get('/login',(req, res)=>{
  res.sendFile(path.join(__dirname,'./Static/login.html'))
});

app.get('/register',(req, res)=>{
  res.sendFile(path.join(__dirname,'./Static/signup.html'))
});

app.get('/blocks',(req,res)=>{
res.json(bc.chain);
});

app.post('/Registerme',(req,res)=>{
var t = Authorize.Register(req.body.name, req.body.regno, req.body.email, req.body.contact, 
  req.body.branch, req.body.year);
  if(t=='fals')
  res.sendStatus(409);
  else{
  res.sendStatus(200);

  }
});
  io.sockets.on('connection', function (client) {

    
    console.log('A new connection is made',client.id);
    console.log(io.engine.clientsCount);
    //io.emit('Blockchain',bc.chain);
    io.emit('UserCount',io.engine.clientsCount);


    client.on('disconnect',()=>{
      io.emit('UserCount',io.engine.clientsCount);
    });

    app.post('/mine',(req,res)=>{
      const block = bc.addBlock(req.body.data);
      console.log(`new block added: ${block.toString()}`);
      io.emit('Blockchain',bc.chain);
      //res.redirect('/blocks');
    });
  });  
  










  
