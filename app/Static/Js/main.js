
  var socket = io();
  var $joinNetwork = $('.joinNetwork'); 
  $joinNetwork.click(function () {
      joinnetwork();
  
    })
  
  
    function joinnetwork(){
      socket.emit('add-user','harneetfdgdfgdf');
    };
  
    socket.on('useradded', function (data) {
      alert(data.username+'joined with'+data.members);
      //alert("Game Created! ID is: "+ JSON.stringify(data));
    });