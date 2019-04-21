const express = require('express');
const bodyparser = require('body-parser');
const Account = require('../MinerWalletAccount');
var app = express();
var sql = require('mssql');
const path = require('path');
const Blockchain = require('../Chain')
var fs = require('fs');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3001;
var Authorize = require('./Authorize');

const Wallet = require('../MinerWalletAccount');

server.listen(port, function () {
  console.log('Server listening at port %d', port);
 // fs.writeFile(__dirname + '/start.log', 'started'); 
});



var config = {
  user: 'studentchain',
  password: 'harneet@9039',
  server: 'den1.mssql7.gear.host', 
  database: 'studentchain' 
};





app.use(bodyparser.json());
//app.use(express.static(path.join(__dirname,'./Static')));
app.use('/Js',express.static(path.join(__dirname , './Static/Js')));
app.use('/CSS',express.static(path.join(__dirname , './Static/CSS')));
app.use('/Images',express.static(path.join(__dirname , './Static/Images')));
app.use('/Documents',express.static(path.join(__dirname + './Static/Documents')));

const bc = new Blockchain();
const wallet = new Wallet();
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

  sql.connect(config, function(conn) {
    var request = new sql.Request(conn);
    request.input('Name', sql.VarChar(255), req.body.name);
    request.input('RegNo', sql.VarChar(50), req.body.regno);
    request.input('Email', sql.VarChar(255), req.body.email);
    request.input('Contact', sql.VarChar(255), req.body.contact);
    request.input('branch', sql.VarChar(50), req.body.branch);
    request.input('year', sql.Int, req.body.year);
    request.execute('InsertUser').then(function(err, recordsets, returnValue, affected) {
      var p = JSON.stringify(err.recordset)
      console.log(p.substring(6,10));
      sql.close();

      if(p.substring(6,10)=='true'){
        io.sockets.on('connection', function (client) {

    
          console.log('A new connection is made',client.id);
          console.log(io.engine.clientsCount);
          //io.emit('Blockchain',bc.chain);
          io.emit('UserCount',io.engine.clientsCount);
      
          
      
          client.on('disconnect',()=>{
            io.emit('UserCount',io.engine.clientsCount);
          });
        });
        
        wallet.AddUserAccount(req.body.regno);
        console.log(wallet.toString());
        res.sendStatus(200);
      }
      else{
        res.sendStatus(409);
      }

      
     
      
      
    }).catch(function(err) {
      console.log(err);
      sql.close();
    });
  });
 
    
   
  
});


    
 

    app.post('/mine',(req,res)=>{
      const block = bc.addBlock(req.body.data);
      console.log(`new block added: ${block.toString()}`);
      io.emit('Blockchain',bc.chain);
      //res.redirect('/blocks');
    });
  });  
  










  
