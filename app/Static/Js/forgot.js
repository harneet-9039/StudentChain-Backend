
		function validation(){
		
            var password =  document.getElementById('pass').value;
            var confirm_password =  document.getElementById('conpass').value;
       
       
            if (password == "") {
               document.getElementById('password').innerHTML  = "Required Field!";
                return false;
            }
            if((password.length < 5) || (password.length > 20)) {
               document.getElementById('password').innerHTML  = "Length must be between 5 to 20";
                return false; 
            }
            
       
            if (confirm_password == "") {
               document.getElementById('confpass').innerHTML  = "Required Field!";
                return false;
            }
            if(password.value!=confirm_password.value) {
               document.getElementById('confpass').innerHTML = "Passwords do not match";
               
           }
       }