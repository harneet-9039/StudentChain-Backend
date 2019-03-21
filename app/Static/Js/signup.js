function validation() {
   var user =  document.getElementById('user').value;
   var password =  document.getElementById('pass').value;
   var confirm_password =  document.getElementById('conpass').value;
   var email =  document.getElementById('email').value;
   var first_name =  document.getElementById('firstname').value;
   var last_name =  document.getElementById('lastname').value;
   var mobile_number =  document.getElementById('mobileNumber').value;
   
   if (user == "") {
      document.getElementById('username').innerHTML  = "Required Field!";
       return false;
   }
   if((user.length <= 2) || (user.length > 10)) {
      document.getElementById('username').innerHTML  = "Length must be between 2 to 10";
       return false; 
   }
   if(!isNaN(user)) {
      document.getElementById('username').innerHTML  = "Must contain character";
      return false; 
   }


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
   if(password!=confirm_password) {
      document.getElementById('confpass').innerHTML = "Passwords do not match";
  }

   if (email == "") {
      document.getElementById('Email').innerHTML  = "Required Field!";
       return false;
   }
   if(email.indexOf('@') <= 0){
      document.getElementById('Email').innerHTML  = "Invalid email";
      return false;
   }
   if((email.charAt(email.length-4)!='.') && (email.charAt(email.length-3)!='.')) {
      document.getElementById('Email').innerHTML  = "Invalid email";
      return false;
   }

   if (first_name == "") {
      document.getElementById('Firstname').innerHTML  = "Required Field!";
       return false;
   }
   if((first_name.length <= 2) || (first_name.length > 10)) {
      document.getElementById('Firstname').innerHTML  = "Length must be between 2 to 10";
       return false; 
   }

   if (last_name == "") {
      document.getElementById('Lastname').innerHTML  = "Required Field!";
       return false;
   }
   if((last_name.length <= 2) || (last_name.length > 10)) {
      document.getElementById('Lastname').innerHTML  = "Length must be between 2 to 10";
       return false; 
   }
   if (mobile_number == "") {
      document.getElementById('mobnumber').innerHTML  = "Required Field!";
       return false;
   }
   if(isNaN(mobile_number)) {
      document.getElementById('mobnumber').innerHTML  = "Only Numbers allowed";
      return false;
   }
   if(mobile_number.length !=10) {
      document.getElementById('mobnumber').innerHTML  = "10 digit number is allowed ";
      return false;
   }
}

