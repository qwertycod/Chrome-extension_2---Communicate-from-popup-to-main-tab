# 
**Chrome extension: Communicate from popup js to main tab**

**Our goal**
In this blog, we are trying to set a global value in via popup and get anywhere among the main tabs of a Chrome extension. In other words, we are passing values from popup to the main tabs.

We are doing this by setting the value of a variable named currentNumber from popup into a chrome local storage, will get by reading from the chrome local storage.

We need that value(currentNumber) for running a script via another JavaScript file of our same chrome extension.

We will be using manifest version 3 for it.

In the below gif, we can see that we are setting the value in popup.js and we are getting the value in Chrome tab (logging it in the console). We can also see that we are logging the value in the inspection window of the popup as well.

**Steps to setup**

1 -First lets setup our manifest file

2 - Creating the popup
On page load, the popup shows current value of our variable “currentNumer” 

It has a input box where we can change the value of that number and a Save button.

Handling of save button is done using the main.js which we are referencing in the popup.html. 

3 - The main.js or the popup js

First of all, we are getting a local variable which we are storing in chrome storage via chrome.storage.local.get([“currentNumer”])

Its an async call so we are using .then() method here.

After getting the value of the variable currentNumber from the chrome storage we are setting the value of the input box over our popup.html.

On click of the Save button, we are calling Chrome.tabs.query() method.

Here we are passing a function i.e. chrome.scripting.executeScript() this method takes 3 parameters,

a – target (the target tabId that we got via Chrome.tabs.query method.

b – function that will run inside the browser tabs.

c – an args variable where we can pass our arguments to the above function in form of array.

In the next then() chrome.tabs.query() we are setting the value of label and setting the background color of our button which runs inside our popup.

If you want to pass or save multiple value in the chrome.storage.local.set() method and get all those values.

It can be done by :

Notice how are passing the parameters in sequence;  [currentId, submitData, userName]

and using them in the function in same sequence async (selectedValue, submitData, userName)

Similarly, to retrieve all those values from chrome storage, we can use the method chrome.storage.local.get(). 

We can do like:

Notice how are we fetching the data in sequece – [“currentNumer”,”submitData”, “userName”]

**Reading the value inside Chrome tabs**

We have our change.js which will act like the background.js which will run inside the browser/Chrome tabs.

As we have set  “run_at”: “document_end”  in the manifest file, the scripts inside it will run at page load initially. 

It will fetch currentNumber from chrome storage via – chrome.storage.local.get([“currentNumer“]) 

Thats how we are able to pass value from popup to background js in a browser/chrome extension.


In our next project (https://github.com/qwertycod/Chrome_extension_1), we will see how to pass data from chrome browser tab to our extension pop up or in other words passing data from background js to an extension popup js file. Means the reverse of our current flow.

We will be using chrome methods for passing data.

We will use chrome.runtime.sendMessage() method for sending messages from chrome tab to popup js and chrome.runtime.onMessage.addListener(handleMessage) for receiving the messages.
