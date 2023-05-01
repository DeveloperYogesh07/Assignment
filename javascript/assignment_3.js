function showUserDetails(currentUser) {
  document.getElementById('id').innerText = currentUser.id;
  // document.getElementById('imagediv');
  var el = document.getElementById("imagediv");
  el.innerHTML = `<img src="${currentUser.image}">`;
  document.getElementById('name').innerText = currentUser.name;
  document.getElementById('age').innerText = currentUser.age;
  document.getElementById('Designation').innerText = currentUser.Designation;
  document.getElementById('project').innerText = currentUser.project;
  document.getElementById('YearOfExperience').innerText = currentUser.YearOfExperience;

}
let users = [];
var currentUser;
var cuser;
const forwardClick = 1;
const backwardClick = -1;

//Onload first will calll fetch api to get the json data
fetch('./data.json')
  .then(async function (response) {
    users = await response.json();
    // console.log(users);
    currentUser = users[0];
    // calling userdetail function here
    showUserDetails(currentUser);
  });

function leftClick() {
  if(currentUser == users[0]){
    cuser = 3;
  }
  else if(currentUser == users[2]){
    cuser = 2;
  }
  else{
    cuser = 1;
  }
  currentUser = users[cuser+backwardClick];
  showUserDetails(currentUser);
}
function rightClick() {
  if(currentUser == users[0]){
    cuser = 0;
  }
  else if(currentUser == users[1]){
    cuser = 1;
  }
  else{
    cuser = -1;
  }
  currentUser = users[cuser+forwardClick];
  // alert('clicked');
  cuser = cuser+1;
  showUserDetails(currentUser);
}




















// body
// <div-left> <button onclick="leftClick()">
//<div-center> <users details >
//<div-rgiht><button onclik="rightClick()">