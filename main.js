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

//If you want to pass or save multiple value in the chrome.storage.local.set() method and get all those values.

//It can be done by :

//Notice how are passing the parameters in sequence;  [currentId, submitData, userName]

//and using them in the function in same sequence async (selectedValue, submitData, userName)
  
  // saveButton.addEventListener('click', async () => {
  //   var currentId = document.getElementById("currentId").value;
  //   var submitData = document.getElementById("setGCode").checked;
  //   var userName = document.getElementById("userName").value;
    
  //   chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
  //     chrome.scripting.executeScript(
  //       {
  //         target: {tabId: tab.id},
  //          function: async (selectedValue, submitData, userName) => {
  //           try {
  //             console.log('selectedValue', selectedValue + ' submitData ' + submitData +  ' userName ' + userName  );    
  
  //             chrome.storage.local.set({ "currentNumer": selectedValue, "submitData" : submitData, "userName" : userName  }).then(() => {
  //               console.log("------- All data is set -------");
  //             });       
  //           }
  //           catch (e) {
  //               console.log(e)
  //           }
  //       },
  //       args: [currentId, submitData, userName]
  //     });
  // }).then(function(){
  //   setTimeout(() => {
  //     console.log('selectedValue :- ', currentId);
  //     document.getElementById("currentIdLabel").textContent  = currentId;
  //     saveButton.style.background = "LightGreen";
  //   }, 100);
  // });
  // })
