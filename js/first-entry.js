var membersInput = document.getElementById("mmc_members");
var i = 2;
var names = [];
var values = [];
var namesArray = [];
//add new member██████████████████████████████████████████████████████
//plus btn event listener
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#mmc_plus').addEventListener('click', onclick, false)

  function onclick() {
    //creates the member input element then appends it using jquery
    var membersInputElement = `<p>Member ${i}</p><input id="mmc_input${i}">`;
    $("#mmc_members").append(membersInputElement);
    i++;
  }
}, false)
//save button event listener
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#mmc_save').addEventListener('click', onclick, false)

  function onclick() {
    //loops through all inputs and stores the value into names[]
    for (var x = 1; x < i; x++) {
      if (document.getElementById("mmc_input" + x) != null) {
        names[x - 1] = document.getElementById("mmc_input" + x).value;
      }
    }
    //removes inputs and prepare the page to have the members names in it
    hideAllExcept("mmc_members")
    membersInput.innerHTML = "<p class='mmc_memberSavedHeader'>Members Saved</p>";
    membersInput.style.width = "250px";
    membersInput.style.border = "2px solid #f2c311";
    //loops through the array creates an element with each name and appends it on the parent
    for (var z = 0; z < names.length; z++) {
      var membersInputElement = "<p class='mmc_memberSaved'>" + (z + 1) + " - " + names[z] + "</p>";
      $("#mmc_members").append(membersInputElement);
    }
    //localStorage.setItem("names", JSON.stringify(names));
    //saves the array into local storage
    chrome.storage.local.set({
      "names": names
    }, function() {
      console.log('names are set to ' + names);
    });
  }
}, false)


//Edit █████████████████████████████████████████████████████████████████████████
//fetches the names from local storage
chrome.storage.local.get(['names'], function(names) {
  namesArray = names.names;
});

//button event listener
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#mmc_editBtn').addEventListener('click', onclick, false)

  function onclick() {
    hideAllExcept("mmc_edit")
    var editedMemberNo = document.querySelector("#mmc_inputNo").value;
    var editedMemberName = document.querySelector("#mmc_inputName").value;
    var oldMemberName = namesArray[editedMemberNo - 1];
    document.querySelector("#mmc_edit").innerHTML = "<p class='mmc_memberSavedHeader'>Member Edited </p><p> From: " + oldMemberName + "</p><p>To: " + editedMemberName + "</p>";
    namesArray[editedMemberNo - 1] = editedMemberName;
    chrome.storage.local.set({
      "names": namesArray
    }, function() {
      console.log('names are set to ' + namesArray);
    });
    //reset


  }
}, false)

//scroll event style purposes ██████████████████████████████████████████████████
document.addEventListener("scroll", function() {
  var st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > 10) {
    //downscroll code
    document.querySelector(".mmc_entryBtns").classList.add("mmc_entryBtnsScrolled");
  } else if (st < 50) {
    // upscroll code
    document.querySelector(".mmc_entryBtns").classList.remove("mmc_entryBtnsScrolled");
  }
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);
//add members by text file██████████████████████████████████████████████████

let input = document.querySelector('#mmc_fileInput');

input.addEventListener('change', () => {
  let files = input.files;
  if (files.length == 0) return;
  const file = files[0];
  let reader = new FileReader();
  reader.onload = (e) => {
    const file = e.target.result;
    const lines = file.split(/\r\n|\n/);
    //displays saved members
    hideAllExcept("mmc_txtAdd");
    document.querySelector("#mmc_txtAdd").innerHTML = "<p class='mmc_memberSavedHeader'>Members Saved</p>";
    for (var z = 0; z < lines.length; z++) {
      if (lines[z] != "") {
        var membersInputElement = "<p class='mmc_memberSaved'>" + (z + 1) + " - " + lines[z] + "</p>";
        $("#mmc_txtAdd").append(membersInputElement);
      }
    }
  };
  reader.onerror = (e) => alert(e.target.error.name);
  reader.readAsText(file);
});


//display none to other parts of the page
function hideAllExcept(elementId) {
  var mmc_members = document.querySelector("#mmc_members");
  var mmc_txtAdd = document.querySelector("#mmc_txtAdd");
  var mmc_edit = document.querySelector("#mmc_edit");
  switch (elementId) {
    case "mmc_members":
      mmc_txtAdd.style.display = "none";
      mmc_edit.style.display = "none";
      break;
    case "mmc_txtAdd":
      mmc_members.style.display = "none";
      mmc_edit.style.display = "none";
      break;
    case "mmc_edit":
      mmc_txtAdd.style.display = "none";
      mmc_members.style.display = "none";
      break;
    default:

  }
}
