//find elements using ids and define global variables.
var searchCtrl = document.getElementById('searchText');
var searchMessage = document.getElementById('searchMessage');
var searchResult = document.getElementById('searchResult');


﻿//function to handle response and parse data on UI
function printRepoCount() {
      //convert response into Json
      var responseObj = JSON.parse(this.responseText);
      //if no such user exists, the number of total count by his username is 0.
      //So if no such user exists, show no search results.
      if(responseObj.total_count==0){
        searchResult.innerHTML = "No search Results";
        searchMessage.innerHTML = '<h1><b>No User found!</b></h1>';
      }
      //Set top message to show numbers
      else{
      searchMessage.innerHTML = '<h1>Users </h1><h4>There are a total of <b>' + responseObj.total_count + '</b> GitHub users found who have their user names starting with <i>"' + searchCtrl.value + '"</i>. <br/>Top 30 are displayed below. </h4>';

      //Construct html
      var html = '';

      //all users are listed in items.
      for (var i = 0; i < responseObj.items.length; i++) {
          //get user
          var user = responseObj.items[i];

          //construct html to be displayed
          html += '<div class="col-sm-2">';
          html += '<img src="' + user.avatar_url + '"  class="logo-small"/>';
          html += '<a href="' + user.html_url + '" target="_blank" > <h4>' + user.login + '</h4></a>';
          html += '<span class="badge">' + user.score + '</span><br/><br/>';
          html += '</div>';


      }
    //set html of result div to show all data on ui
    searchResult.innerHTML = html;
   }
}
//Function to query github api with username as input
function search(username) {
    //create request object
    var request = new XMLHttpRequest();

    //set function to be called upon response
    request.onload = printRepoCount;

    //Github api url
    var url = 'https://api.github.com/search/users?q=' + username + '+in%3Alogin';
  //  var url2 = 'https://api.github.com/users/'+username+'/repos';
    //create request and open it
    request.open('get', url, true);
    //call api
    request.send();
}

//function to handle search click
function searchClick() {

    // if the user enters nothing, ask user to type some username, else call the search function
    if(searchCtrl.value==""){
       searchResult.innerHTML = "No search Results";
       searchMessage.innerHTML = '<h1><b>Please type in a Username!</b></h1>';
     }

    //call search function
    else{
      search(searchCtrl.value);
    }

}
 // handling Enter Key
 searchCtrl.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
          document.getElementById("buttonId").click();
      }
  });
