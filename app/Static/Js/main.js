var socket = io.connect('http://localhost:3001');

socket.on('Blockchain', (data)=>{
console.log(data);
});

socket.on('UserCount',(data)=>{
$('#count').text(data);
});

$(".Emit").click(function(){
   
    $.post("http://localhost:3001/mine",
    { 
    data:"hello world"
    },
    function(response,status){ // Required Callback Function
        alert("emit success");
    });
    });