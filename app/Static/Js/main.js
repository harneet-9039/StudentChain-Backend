
  var socket = io();
  var $joinNetwork = $('.joinNetwork'); 
  $joinNetwork.click(function () {
      joinnetwork();
  
    })
  
  
    function joinnetwork(){
      socket.emit('join-network');
    };
  
    socket.on('useradded', function (data) {
      alert(data.username);
      //alert("Game Created! ID is: "+ JSON.stringify(data));
    });