const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatBody = document.querySelector(".chatBody");
const userInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const closeBtn = document.querySelector(".close-btn");

//dev environment
const GET_CHARACTERISTICS_LAMBDA_URL = "https://5pml3mrv3qofivvnmx62mf5tby0mseoo.lambda-url.us-west-2.on.aws/";

// const GET_RESPONSE_LAMBDA_URL = "https://efrmqhv7abhudbx3yiag5xkzri0qgxci.lambda-url.us-west-2.on.aws/";
const GET_RESPONSE_LAMBDA_URL = "https://dtaghhljd6uliblittl5jqm2ae0bcoma.lambda-url.us-west-2.on.aws/"; // new test one

//production environment
// const GET_CHARACTERISTICS_LAMBDA_URL = "https://5pml3mrv3qofivvnmx62mf5tby0mseoo.lambda-url.us-west-2.on.aws/";
//const GET_RESPONSE_LAMBDA_URL = "https://efrmqhv7abhudbx3yiag5xkzri0qgxci.lambda-url.us-west-2.on.aws/";

const getChatbotCharacteristicsFromS3 = () =>
{

	fetch(GET_CHARACTERISTICS_LAMBDA_URL + "?name=" + window.name).then(res => res.text()).then(responseData =>
	{
		console.log("ABCD")
		
	    data = JSON.parse(responseData);
		console.log(responseData);
		console.log(data);
		setChatbotCharacteristics();
	}).catch(() =>{
	    console.log("Error while fetching chatbot charactertics from S3");
	})
}

const getChatbotCharacteristics = () =>
{
	data = {
		"users":
		{
			"ta1": { "pwd": "hashed password", "chatbots": ["testbot1a", "testbot2a"]  },
			"tb2": { "pwd": "hashed password", "chatbots": ["test1b", "test2b"]  }
		},
		"chatbots":
		{
			"testbot1a":
			{
				"chatbotName": "testbot1a",
				"domainName": "",
				"name": "Albert",
				"title": "title",
				"companyName" : "companyname",
				"information": "this is test site 1 ver a",
				"advancedOptions": {
					"theme": {
						"headerTextBackgroundColor": "",
						"headerTextFontColor": "",
						"headerTextFontSize": "",
						"chatbodyBackgroundColor": "rgb(20,70,0)",
						"chatbotTextBackgroundColor": "rgb(100,100,100)",
						"chatbotTextFontColor": "rgb(255,0,0)",
						"chatbotTextFontSize": "1.5em",
						"userTextBackgroundColor":  "rgb(200,100,100)",
						"userTextFontColor": "rgb(235,205,205)",
						"userTextFontSize": "1em",
						"userInputBackgroundColor": "#000000",
						"userInputFontColor": "#00FF00",
						"userInputFontSize": "1em",
						"buttonTextBackgroundColor": "rgb(100,100,0)",
						"buttonTextFontColor": "rgb(0,0,0)",
						"buttonTextFontSize": "3em",
						"widgetLocation": ""
					},
					"welcomeMessage": "Hi this is albert",
					"errorResponse": "IDK ask albert 2",
					"disclaimer": "",
					"emailRequired": ""
				}
			},
			"":
			{
				"chatbotName": "chatbot-12345",
				"domainName": "www.sequoiaat.com",
				"name": "Chatbot",
				"title": "Sequoia chatbot",
				"companyName" : "Sequoia Applied Technologies",
				"advancedOptions":
				{
					"theme":
					{
						"headerTextBackgroundColor": "",
						"headerTextFontColor": "",
						"headerTextFontSize": "",
						"chatbodyBackgroundColor": "#00FFFF",
						"chatbotTextBackgroundColor": "",
						"chatbotTextFontColor": "",
						"chatbotTextFontSize": "1em",
						"userTextBackgroundColor": "rgb(255,0,0)",
						"userTextFontColor": "",
						"userTextFontSize": "1em",
						"userInputBackgroundColor": "#000000",
						"userInputFontColor": "#00FF00",
						"userInputFontSize": "1em",
						"buttonTextBackgroundColor": "",
						"buttonTextFontColor": "",
						"buttonTextFontSize": "1em",
						"widgetLocation": ""
					},
					"welcomeMessage": "Hi, this is a genie",
					"errorResponse": "I dont have an answer to this point.  Please contact abc@abc.com for more details",
					"disclaimer": "The answers given here need not be accurate",
					"emailRequired": "no"
				}
			}
		}
	}
	setChatbotCharacteristics();
}

const setChatbotCharacteristics = () =>
{
	console.log("data-->" + data);
	console.log("window.name-->" + window.name);

	chatbotInfo = data; //data["chatbots"][window.name];
	console.log(chatbotInfo["advancedOptions"]);

	document.getElementById("welcomeMessage").innerHTML = chatbotInfo["advancedOptions"]["welcomeMessage"];
	document.getElementById("welcomeMessage").style.background = chatbotInfo["advancedOptions"]["theme"]["chatbotTextBackgroundColor"];
	document.getElementById("welcomeMessage").style.color = chatbotInfo["advancedOptions"]["theme"]["chatbotTextFontColor"];
	document.getElementById("welcomeMessage").style.fontSize = chatbotInfo["advancedOptions"]["theme"]["chatbotTextFontSize"];

	document.getElementById("headerSection").style.background = chatbotInfo["advancedOptions"]["theme"]["headerTextBackgroundColor"];
	document.getElementById("headerSection").querySelector("h2").style.color = chatbotInfo["advancedOptions"]["theme"]["headerTextFontColor"];
	document.getElementById("headerSection").querySelector("h2").style.fontSize = chatbotInfo["advancedOptions"]["theme"]["headerTextFontSize"];

	document.getElementById("headerTitle").innerText = chatbotInfo["title"];

	document.getElementById("chatBody").style.background = chatbotInfo["advancedOptions"]["theme"]["chatBodyBackgroundColor"];

	document.getElementById("userInputSection").style.background = chatbotInfo["advancedOptions"]["theme"]["userInputBackgroundColor"];
	document.getElementById("userInput").style.color = chatbotInfo["advancedOptions"]["theme"]["userInputFontColor"];
	document.getElementById("userInput").style.fontSize = chatbotInfo["advancedOptions"]["theme"]["userInputFontSize"];

	disclaimer = chatbotInfo["advancedOptions"]["disclaimer"];
	if (disclaimer == "NONE"){
		document.getElementById("disclaimer").hidden=true;
	}
	else{
		document.getElementById("disclaimer").querySelector("p").innerText =chatbotInfo["advancedOptions"]["disclaimer"];
	}
	
	// document.getElementById("icon").style.backgroundColor = chatbotInfo["advancedOptions"]["theme"]["iconColor"];
}

const createChatLi = (message, className) =>
{
	chatbotInfo = data;
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);

    let chatContent = className === MSG_FROM_USER ? `<p name="userMessage"></p>` : `<span class="material-symbols-outlined">smart_toy</span><p style="border-radius: 10px 10px 0 10px;" name="chatbotMessage"></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    if (className == MSG_FROM_BOT)
    {
        chatLi.querySelector("p").style.background = chatbotInfo["advancedOptions"]["theme"]["chatbotTextBackgroundColor"];
        chatLi.querySelector("p").style.color = chatbotInfo["advancedOptions"]["theme"]["chatbotTextFontColor"];
        chatLi.querySelector("p").style.fontSize = chatbotInfo["advancedOptions"]["theme"]["chatbotTextFontSize"];
        // chatLi.querySelector("span").style.backgroundColor =  chatbotInfo["advancedOptions"]["theme"]["iconColor"];
    } else if (className == MSG_FROM_USER)
    {
        chatLi.querySelector("p").style.background = chatbotInfo["advancedOptions"]["theme"]["userTextBackgroundColor"];
        chatLi.querySelector("p").style.color = chatbotInfo["advancedOptions"]["theme"]["userTextFontColor"];
        chatLi.querySelector("p").style.fontSize = chatbotInfo["advancedOptions"]["theme"]["userTextFontSize"];
    }
    return chatLi;
}

const getResponse = (chatElement) =>
{
    const messageElement = chatElement.querySelector("p");

    chatbot_name = window.name;

    console.log("GET_RESPONSE_LAMBDA_URL-->" + GET_RESPONSE_LAMBDA_URL + "?name=" + chatbot_name + "&uinput=" + userInputText);

    fetch(GET_RESPONSE_LAMBDA_URL + "?name=" + chatbot_name + "&uinput=" + userInputText).then(res => res.text()).then(responseData =>
    {
		console.log(responseData);
        messageElement.textContent = responseData
    }).catch(() =>
    {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() =>
    	chatBody.scrollTo(0, chatBody.scrollHeight)
    );
}

const handleChat = () =>
{
    userInputText = userInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userInputText)
    	return;

    // Clear the input textarea and set its height to default
    userInput.value = "";
    userInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatBody
    chatBody.appendChild(createChatLi(userInputText, MSG_FROM_USER));
    chatBody.scrollTo(0, chatBody.scrollHeight);

    setTimeout(() =>
    {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("...", MSG_FROM_BOT);
        chatBody.appendChild(incomingChatLi);

        chatBody.scrollTo(0, chatBody.scrollHeight);
        getResponse(incomingChatLi);

    }, 600);
};

userInput.addEventListener("input", () =>
{
    // Adjust the height of the input textarea based on its content
    userInput.style.height = `${inputInitHeight}px`;
    userInput.style.height = `${userInput.scrollHeight}px`;
});

userInput.addEventListener("keydown", (e) =>
{
    // If Enter key is pressed without Shift key and the window
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey)
    {
        e.preventDefault();
        handleChat();
    }
});

setEventListeners = () =>
{
	sendChatBtn.addEventListener("click", handleChat);
	closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
	chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
};

const MSG_FROM_USER = "msgFromUser";
const MSG_FROM_BOT = "msgFromBot";

let userInputText = null; // Variable to store user's message input
const inputInitHeight = userInput.scrollHeight;

var data = {"key": "value"};
var user_data;
// console.log(data);
var chatbotInfo;
setEventListeners();
getChatbotCharacteristicsFromS3();

//getChatbotCharacteristics();
function isEmailValid(email) {
	const emailRegexp = new RegExp(
	  /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
	)
  
	return emailRegexp.test(email)
  }
verifyEmail = () =>
{
	emailIn = document.getElementById("emailInput").value;
	valid = isEmailValid(emailIn);
	console.log("email is", emailIn, "and valid is ",valid);
	// check if email is right
	if (valid){
		document.getElementById("email").hidden = true; // maybe add a thing that says email acccepted or seomthing like the face id check

	}
}

closeDisclaimer = () =>
{
	document.getElementById("disclaimer").hidden = true;	
};

getUserData = () => 
{
	fetch('https://api.db-ip.com/v2/free/self').then(res => res.text()).then(responseData =>
		{
			console.log(responseData);
			user_data = responseData;
			
		}).catch(() =>
		{
			console.log("ERROR NO IP")
		});
}
getUserData();

