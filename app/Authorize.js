var sql = require('mssql');

var config = {
    user: 'studentchain',
    password: 'harneet@9039',
    server: 'den1.mssql7.gear.host', 
    database: 'studentchain' 
};

class Authorize{
    
    
    
 static Register(name, regno, email, contact, branch, year)
    {
        
        sql.connect(config, function(conn) {
          var request = new sql.Request(conn);
          request.input('Name', sql.VarChar(255), name);
          request.input('RegNo', sql.VarChar(50), regno);
          request.input('Email', sql.VarChar(255), email);
          request.input('Contact', sql.VarChar(255), contact);
          request.input('branch', sql.VarChar(50), branch);
          request.input('year', sql.Int, year);
          request.execute('InsertUser').then(function(err, recordsets, returnValue, affected) {
            //console.dir(recordsets);
            console.dir(err);
            console.dir(err.recordset);
            var p = JSON.stringify(err.recordset)
            console.log(p.substring(6,10));
            return p;
            
            sql.close();
          }).catch(function(err) {
            console.log(err);
            sql.close();
          });
        });
    }
}

module.exports = Authorize;