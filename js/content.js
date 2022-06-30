chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  let re = new RegExp(request, 'gi');
  const matches = document.querySelector(".RUGMB").innerHTML.match(re);
  if (matches == null) {
    return;
  }
  sendResponse({
    count: matches.length
  });
});
