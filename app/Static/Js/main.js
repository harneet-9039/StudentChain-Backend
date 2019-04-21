
var socket = io.connect('http://localhost:3001');





    $("#registerme").click(function(e) {
   e.preventDefault();
    var a = $('#user').val();
    var b = $('#regno').val();
    var c = $('#email').val();
    var d = $('#contact').val();
    var e = $('#branch').val();
    var f = $('#year').val();

    var obj = {
        name: a,
        regno: b,
        email: c,
        contact: d,
        branch: e,
        year: f
    };
    $.ajax({
        type:'POST',
        url:'http://localhost:3001/Registerme',
        data: obj,
        success:(data)=>{
            if(typeof data.redirect == 'string')
            window.location = data.redirect;
         },
        error: ()=>{
            alert('Internal server error');
        }
    });
});

$(".Loginuser").click(function(e) {
    e.preventDefault();
     var a = $('#user').val();
     
     var obj = {
         id: a,
     };
     $.ajax({
         type:'POST',
         url:'http://localhost:3001/LoginUser',
         data: obj,
         success:(data)=>{
            if(typeof data.redirect == 'string')
            window.location = data.redirect;
         },
         error: ()=>{
             alert('Internal server error');
         }
     });
 });

socket.on('Blockchain', (data)=>{
    console.log(data);
    });
    
    socket.on('UserCount',(data)=>{
        console.log(data);
    $('#count').text(data);
    });
    

