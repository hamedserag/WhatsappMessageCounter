var table = document.getElementById("mmc_members-table");
var names = JSON.parse(localStorage.getItem("names"));
var x;
var namesArray = [];
var totalNumberOfMessages;
//fetchs names array from local storage
chrome.storage.local.get(['names'], function(names) {
  namesArray = names.names;
});
//the on click even listener for the count members btn
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#mmc_count').addEventListener('click', onclick, false)

  function onclick() {
    //intializes the table before adding new members -- removes old table and adds the header of new table
    table.innerHTML = '<tr><th>MEMBER</th><th>ACTIVITY SCORE</th></tr>';
    document.getElementById("mmc_count").innerHTML = "Refresh The Count";
    totalNumberOfMessages = 0;
    x = 0;
    //sends a request with the variable namesArray[i] to the page and the file content.js handles that request and returns a response
    chrome.tabs.query({
        currentWindow: true,
        active: true
      },
      function(tabs) {
        for (var i = 0; i < namesArray.length; i++) {
          //the response of content.js is passed onto the function setCount with the variabale name response within it a namespace called count
          chrome.tabs.sendMessage(tabs[0].id, namesArray[i], setCount);
        }
      })
  }

  function setCount(response) {
    //checks if the page actually responded or not
    if (response != null) {
      addMember(namesArray[x], response.count, x + 1);
    } else {
      addMember(namesArray[x], 0, x + 1);
    }
    x++;
  }

}, false)
//add member function takes 2 variables and adds them to the table
function addMember(memberName, memberActivityScore, memberNum) {
  table.innerHTML = table.innerHTML + "<tr><td>" + memberNum + "-" + memberName + "</td><td>" + memberActivityScore + "</td></tr>";
  totalNumberOfMessages = totalNumberOfMessages + memberActivityScore;
}
