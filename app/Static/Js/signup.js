function validation() {
   var user =  document.getElementById('user').value;
   var regno =  document.getElementById('regno').value;
   var email =  document.getElementById('email').value;
   var contact =  document.getElementById('contact').value;
   var branch =  document.getElementById('branch').value;
   var year =  document.getElementById('year').value;
   
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
   /*if (password == "") {
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
  } */
  if (regno == "") {
   document.getElementById('registration number').innerHTML  = "Required Field!";
    return false;
}
if((regno.length <= 2) || (regno.length > 10)) {
   document.getElementById('registration number').innerHTML  = "Length must be between 2 to 10";
    return false; 
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
   if (contact == "") {
      document.getElementById('Contact').innerHTML  = "Required Field!";
       return false;
   }
   if(isNaN(contact)) {
      document.getElementById('contact').innerHTML  = "Only Numbers allowed";
      return false;
   }
   if(contact.length !=10) {
      document.getElementById('Contact').innerHTML  = "10 digit number is allowed ";
      return false;
   }
   if (branch == "") {
      document.getElementById('Branch').innerHTML  = "Required Field!";
       return false;
   } 
   if (year == "") {
      document.getElementById('Year').innerHTML  = "Required Field!";
       return false;
   }
   if(isNaN(year)) {
      document.getElementById('Year').innerHTML  = "Only Numbers allowed";
      return false;
   }
   if(year.length !=4) {
      document.getElementById('Year').innerHTML  = "4 digit number is allowed ";
      return false;
   }
}

