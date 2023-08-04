// We have our change.js which will act like the background.js 

if(chrome.storage)
{
    chrome.storage.local.get(["currentNumer"]).then((result) => {
    console.log("Value currently is " + result.currentNumer);
    if(result.currentNumer){
         currentNum = result.currentNumer;
      }
   })
  .then(function() {
     // other logic
    });
}
