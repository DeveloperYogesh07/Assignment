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
var index=0;
// const forwardClick = 1;
// const backwardClick = -1;

//Onload first will calll fetch api to get the json data
fetch('./data.json')
  .then(async function (response) {
    users = await response.json();
    // console.log(users);
    currentUser = users[index];
    // calling userdetail function here
    showUserDetails(currentUser);
  });

function leftClick() {
  if(index == 0){
    index = index + users.length;
  }
  else if(index>0){
   index = index-1;
  showUserDetails(users[index]);
  // console.log(index);
}
}

function rightClick() {
  if(index == users.length){
     index = users.length-users.length;
  }else{
    index = index+1;
    }
  showUserDetails(users[index]);
}




















// body
// <div-left> <button onclick="leftClick()">
//<div-center> <users details >
//<div-rgiht><button onclik="rightClick()">