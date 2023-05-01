console.log("Hello Everyone");

function Contact(){
   var a = prompt("To contact us Please Enter your Email Address");
   alert(a+" We will contact you😃✌");
   console.log("The email Address of user is :"+a);
}


// DOM  --------------------------
let a = document.head;
console.log(a);

console.log(document.title);
// console.log(document.anchors);
console.log(document.links);
console.log(document.doctype);
console.log(document.URL);
// console.log(document.domain);


var element;
element = document.getElementsByTagName("li");
console.log(element);

var element;
element = document.getElementById("contact").innerText;
console.log(element);

var element;
document.getElementById("header").addEventListener("click",abc)
function abc(){
    this.style.border = "2px solid black ";
}
// DOM---------------------------



var h = document.getElementById("home");
h.addEventListener("click", function() {
     alert("you are already at home");
});


var text = document.getElementById("text");
text.addEventListener("click",function() {
     alert("hello");
});
