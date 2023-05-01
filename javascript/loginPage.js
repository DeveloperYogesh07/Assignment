// let password = document.getElementById('password');
// let loginBtn = document.getElementById('loginBtn');
// let nameField = document.getElementById('nameField');
// let title = document.getElementById('title');
// let login = document.getElementsByClassName('login'); 
// let cpassword = document.getElementById('cpassword');

 let submit = document.querySelector('.submit-btn');
 submit.onclick = () =>{
    // alert('clicked');
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var cpassword = document.getElementById('cpassword').value;
    localStorage.setItem("Firstname",fname);
    localStorage.setItem("Lastname",lname);
    localStorage.setItem("email",email);
    localStorage.setItem("password",password);
    localStorage.setItem("Cpassword",cpassword);
    // var value = localStorage.getItem("name");
    // var value1 = localStorage.getItem("email");
    // var value2 = localStorage.getItem("password");
    // console.log(value);
    // console.log(value1);
    // console.log(value2);
    if(fname == "" && lname == "" && email == "" && password == "" && cpassword == ""){
        swal("opps..!", "Input has no value , MUST BE FILL!", "error");
    }
    else{
        if(password != cpassword){
            swal("opps..!", "Password are not matching", "error");
        }
        else{
            swal("Registration Sucsessfull", "sucsess");
            
        }
    }
    // location.reload();
}

function seepass(){
    // alert('clicked');
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}
function seeconfrimpass(){
    var x = document.getElementById("cpassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}


let login = document.querySelector('.button');
 login.onclick = (e) =>{
  e.preventDefault();
//  alert('click');
 
  var emailAddress  = document.getElementById('email').value;
  var passWord = document.getElementById('password').value;

  const Email = localStorage.getItem('email');
  const password = localStorage.getItem('password');
  
  if(emailAddress == '' && passWord == ''){
    swal("opps..!", "Input field is reqiured", "error");
  }
  else{
     if(emailAddress == Email && passWord == password){
      swal("Login sucsessfull", "sucsess");
      // windows.location.href = "http://127.0.0.1:3000/assignment_3.html";
     }
     else{
      swal("opps..!", "Something is wrong", "error");
      
     }
  }
}