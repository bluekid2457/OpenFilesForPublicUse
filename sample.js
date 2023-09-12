console.log("HI THERE thiis smple")
DOCS1 = "https://companyinfotest.s3.us-west-2.amazonaws.com/testinfo.json";
let url = DOCS1;

fetch(url)
.then(res => res.json())
.then(out =>
  console.log('Checkout this JSON! ', out))
.catch(err => { throw err });
// getJSONP(DOCS1, function(data){
//   console.log(data);
// }); 
// function getJSONP(url, success) {

//   var ud = '_' + +new Date,
//       script = document.createElement('script'),
//       head = document.getElementsByTagName('head')[0] 
//              || document.documentElement;

//   window[ud] = function(data) {
//       head.removeChild(script);
//       success && success(data);
//   };

//   script.src = url.replace('callback=?', 'callback=' + ud);
//   head.appendChild(script);

// }

 
// const apiUrl = "https://api.example.com/chatbot";

// function getChatbotResponse(message) {
//     console.log("trying to get the data")
//   const data = {
//     message: message,
//   };
//   const response = fetch(apiUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   return response.json();
// }

// function renderChatbotResponse(response) {
//   const chatBox = document.getElementById("chat-box");
//   const message = document.createElement("p");
//   message.textContent = response["response"];
//   chatBox.appendChild(message);
// }

// function handleChatMessage(event) {
//   const message = event.target.value;
//   const response = getChatbotResponse(message);
//   renderChatbotResponse(response);
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const chatInput = document.getElementById("chat-input");
//   chatInput.addEventListener("keyup", handleChatMessage);
// });
