const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const API_KEY = "PASTE-YOUR-API-KEY"; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

// document.getElementById("form").addEventListener("send-btn", (event) => {
//     event.preventDefault();
//     console.log("form submitted");
// });

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const API_URL = "https://d7quvtbtqi.execute-api.us-west-2.amazonaws.com/default/testFunc1";
    const messageElement = chatElement.querySelector("p");
    // company_name = (window.location != window.parent.location)
    //         ? document.referrer
    //         : document.location.href;
    // console.log(company_name);
    // console.log(window.parent.location.href);
    // company_name = window.location.href;
    company_name =  document.location.ancestorOrigins[0];
    console.log("Printing");
    // console.log(window.name); UNCOMMENT LATER

    // company_name = window.name;
    // Define the properties and message for the API request
    // const requestOptions = {
    //     method: "GET",
    //     body: JSON.stringify({
    //         company: "Offrd",
    //         uinput:"What is offrd?",
    //     })
    // }
    console.log("Problem Inc 2")
    // Send POST request to API, get response and set the reponse as paragraph text
    console.log(userMessage) 
    console.log(company_name.length);
    console.log(company_name);
    console.log((typeof (company_name) == 'undefined'));
    console.log(company_name.length == 0)
    console.log("Checking")
    // console.log(company_name);
    // console.log(typeof(company_name));
    // console.log(company_name == null);
    // console.log(company_name.length);
    // console.log((typeof (company_name) == 'undefined'));

    if (company_name.includes("127.0.0.1") ||company_name.includes("localhost") || company_name.length == 0 || (typeof (company_name) == 'undefined')){
        company_name = "localhost"
    }
    else{
        company_name= company_name.split("/")[2]
    }
    // COMMENT ABOVE LATER
    console.log(company_name.length);
    console.log(company_name);
    console.log((typeof (company_name) == 'undefined'));
    fetch("https://d7quvtbtqi.execute-api.us-west-2.amazonaws.com/default/testFunc1?company="+company_name +"&uinput="+userMessage).then(res => res.text()).then(data => {
        // console.log("Problem 0")    
        console.log(data)
        // console.log("Problem 1")
        // console.log(data.text)
        // console.log("Problem 2")
        // console.log(res)
        // console.log("done")
        // messageElement.textContent = data.choices[0].message.content.trim();
        messageElement.textContent = data
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));

}

const handleChat = () => {
    console.log("handling");
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    console.log("CHanging");
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    console.log("ENTER");
    if(e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));