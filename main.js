 {
 chrome.storage.local.get(["currentNumer"]).then((result) => {
  console.log("Value currently is " + result.currentNumer);
  document.getElementById("currentId").value = result.currentNumer;
  document.getElementById("currentIdLabel").textContent  = result.currentNumer;
}); 

const saveButton = document.getElementById("currentIdSave");

saveButton.addEventListener('click', async () => {
  var currentId = document.getElementById("currentId").value;
  chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
    chrome.scripting.executeScript(
      {
        target: {tabId: tab.id},
         function: async (selectedValue) => {
          try {
            console.log('selectedValue', selectedValue)    
            chrome.storage.local.set({ currentNumer: selectedValue }).then(() => {
              console.log("------- Value is set -------");
            });       
          }
          catch (e) {
              console.log(e)
          }
      },
      args: [currentId]
    });
}).then(function(){
  setTimeout(() => {
    console.log('selectedValue :- ', currentId);
    document.getElementById("currentIdLabel").textContent  = currentId;
    saveButton.style.background = "LightGreen";
  }, 100);
});
})
