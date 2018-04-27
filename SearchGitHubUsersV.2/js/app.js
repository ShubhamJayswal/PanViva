// declare global variables.
var searchCtrl = document.getElementById('searchText');
var searchMessage = document.getElementById('searchMessage');
var searchResult = document.getElementById('searchResult');
var repoSearchResult = document.getElementById('repoSearchResult');

//function to handle response and parse data on UI to print Repos
function printRepos(){

  //convert response into Json
  var res = JSON.parse(this.responseText);
  //if the user is not found, show no repos.
  if(res.message=="Not Found"){
    repoSearchResult.innerHTML="No Search Results for the user "+searchCtrl.value;
  }
  else{
    //Construct html
  var html = '';

  for (var i = 0; i < res.length; i++) {
          //get user
          var user = res[i];
          //construct html to be displayed
          html += '<div class="col-sm-2">';
          html += '<a href="' + user.html_url + '" target="_blank" > <h5>' + user.name + '</h5></a>';
          console.log(user.name)
          html += '</div>';
      }
      // put html repo information in the repoSearchResult div to display the repos a user has.
      repoSearchResult.innerHTML= 'User&#39s Repos:'+ '</br>'+html;
    }
}


function printRepoCount() {

    //convert response into Json
    var user = JSON.parse(this.responseText);

    //Construct html
    var html = '';


    //if user exists, put in the information in the html to display to the user, else show user not found.
    if (!user.message) {
        html += '<div class="col-sm-4"></div><div class="col-sm-4">';
        html += '        <img src="' + user.avatar_url + '"  class="logo-small"/>';
        html += '<a href="' + user.html_url + '" target="_blank" > <h4>' + user.login + '</h4></a>';
        html += 'Following: <span class="badge">' + user.following + '</span>Followers: <span class="badge">' + user.followers + '</span>Repos: <span class="badge">' + user.public_repos + '</span><br/><br/>';
        html += '</div><div class="col-sm-4"></div>';

      } else {
        searchResult.innerHTML = "";
        html = '<h1><b>User not found!</b></h1>'
    }
    //set html of result div to show all data on ui
    searchMessage.innerHTML = html;
}
//Function to query github api with username as input
function search(username) {
    //create request object
    var request = new XMLHttpRequest();

    //set function to be called upon response
    request.onload = printRepoCount;

    //Github api url

    var url = 'https://api.github.com/users/' + username;

    //create request and open it
    request.open('get', url, true);

    //call api
    request.send();

    var repoRequest =new XMLHttpRequest();
    repoRequest.onload = printRepos;

    var urlRepo ='https://api.github.com/users/' + username+'/repos';
    repoRequest.open('get', urlRepo, true);
    repoRequest.send();

}

//function to handle search click
function searchClick() {

    // if the user types in nothing, ask user to type a valid username and show no results.
    if(searchCtrl.value==""){
     searchResult.innerHTML = "No search Results";
     searchMessage.innerHTML = '<h1><b>Please type in a Username!</b></h1>';
     repoSearchResult.innerHTML = "";
     }
     else{
     //call search function
    search(searchCtrl.value);
  }
}
 // handling the Enter key.
 searchCtrl.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
          document.getElementById("buttonId").click();
      }
  });
