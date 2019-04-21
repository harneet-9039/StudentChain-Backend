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

const cookieparser = require('cookie-parser');
const session = require('express-session');

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
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieparser());

app.use(session({
  key: 'user_sid',
  secret: 'S#t#u@d$e!n$t',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}));


app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});


app.use('/Js',express.static(path.join(__dirname , './Static/Js')));
app.use('/CSS',express.static(path.join(__dirname , './Static/CSS')));
app.use('/Images',express.static(path.join(__dirname , './Static/Images')));
app.use('/Documents',express.static(path.join(__dirname + './Static/Documents')));

const bc = new Blockchain();
const wallet = new Wallet();

var clients = [];


var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    console.log(req.session.user);
      res.redirect('/dash');
  } else {
      next();
  }    
};

app.get('/',sessionChecker,(req, res)=>{
  
  res.sendFile(path.join(__dirname,'./Static/index.html'))
});

app.get('/login',(req, res)=>{
  res.sendFile(path.join(__dirname,'./Static/login.html'))
});

app.get('/dash',(req, res)=>{
  if (req.session.user && req.cookies.user_sid) {
    
    res.sendFile(path.join(__dirname,'./Static/studentpage.html'))
} else {
    res.redirect('/login');
}
  
});

app.get('/register',(req, res)=>{
  res.sendFile(path.join(__dirname,'./Static/signup.html'))
});

app.get('/blocks',(req,res)=>{
res.json(bc.chain);
});
var temp=false;
app.post('/Registerme',sessionChecker,(req,res)=>{
  
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
        temp=true;
        req.session.user = req.body.regno + req.body.year;

        if(req.body.year>1 && req.body.year<=4)
        wallet.AddMinerAccount(req.body.regno);
        else
        wallet.AddClientAccount(req.body.regno);
        console.log(wallet.toString());
        clients.push(wallet.toString());
        console.log(clients);
        res.send({redirect: '/dash'});
      }
      else{
        res.send({redirect: '/register'});
      }
      
    }).catch(function(err) {
      console.log(err);
      sql.close();
    });
  });
});


  
    
  app.post('/LoginUser',sessionChecker,(req,res)=>{
    sql.connect(config, function(conn) {
      var request = new sql.Request(conn);
      request.input('ID', sql.VarChar(255), req.body.id);
      request.execute('LoginUser').then(function(err, recordsets, returnValue, affected) {
        var p = JSON.stringify(err.recordset)
        console.log(p.substring(6,10));
        sql.close();
  
        if(p.substring(6,10)=='true'){
          temp=true;
          req.session.user = req.body.id;
          res.send({redirect: '/dash'});
        }
        else{
          res.send({redirect: '/register'});
        }
        
      }).catch(function(err) {
        console.log(err);
        sql.close();
      });
    });
  }); 
  

app.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
      res.redirect('/');
  } else {
      res.redirect('/login');
  }
});

io.sockets.on('connection',(socket)=>{
 
  console.log('a new connection done',socket.id);
  io.emit('UserCount',io.engine.clientsCount);
  console.log(clients);  



  socket.on('disconnect',()=>{
    io.emit('UserCount',io.engine.clientsCount);
    console.log('Connection closed',socket.id);
  });
});
 

    app.post('/mine',(req,res)=>{
      const block = bc.addBlock(req.body.data);
      console.log(`new block added: ${block.toString()}`);
      io.emit('Blockchain',bc.chain);
      //res.redirect('/blocks');
    });

  










  
