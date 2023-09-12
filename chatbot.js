const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatBody = document.querySelector(".chatBody");
const userInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const closeBtn = document.querySelector(".close-btn");
// console.log("chatboat laoded");
console.log("window name is: "+parent.window.name);
//dev environment
const GET_CHARACTERISTICS_LAMBDA_URL = "https://5pml3mrv3qofivvnmx62mf5tby0mseoo.lambda-url.us-west-2.on.aws/";

// const GET_RESPONSE_LAMBDA_URL = "https://efrmqhv7abhudbx3yiag5xkzri0qgxci.lambda-url.us-west-2.on.aws/";
const GET_RESPONSE_LAMBDA_URL = "https://dtaghhljd6uliblittl5jqm2ae0bcoma.lambda-url.us-west-2.on.aws/"; // new test one

//production environment
// const GET_CHARACTERISTICS_LAMBDA_URL = "https://5pml3mrv3qofivvnmx62mf5tby0mseoo.lambda-url.us-west-2.on.aws/";
//const GET_RESPONSE_LAMBDA_URL = "https://efrmqhv7abhudbx3yiag5xkzri0qgxci.lambda-url.us-west-2.on.aws/";

const getChatbotCharacteristicsFromS3 = () =>
{
	console.log("Name of window is: "+window.name);
	fetch(GET_CHARACTERISTICS_LAMBDA_URL + "?name=" + window.name).then(res => res.text()).then(responseData =>
	{
		
	    data = JSON.parse(responseData);
		setChatbotCharacteristics();
	}).catch(() =>{
	    console.log("Error while fetching chatbot charactertics from S3");
	})
}

const getChatbotCharacteristics = () =>
{
	data = {
				"information": "BigCat Wireless focuses on developing innovative solutions in the Wireless space. These innovative solutions are a result of the deep Research focus on advanced Wireless Technologies and pioneering in translating these innovations to solutions using well defined and predictable engineering methods.\n\nWireless Infrastructure Engineering\nBigCat provides Reliable Engineering solutions for Wireless Infrastructure. The solutions encompass Base Band modems, Radio Heads,  CRAN, Femto and Pico Cell solutions. and on Virtualization Techniques and Network Function Virtualization on Standard Server and Heterogeneous architectures for LTE .\n\n5G Wireless\nBigCat is pioneering technologies that will  enable 5th Generation Wireless Networks. 5th Generation Wireless Networks will provide not only higher throughput but also enable interconnection of large number of devices that enhance the quality of life. Key technologies that will drive 5G include using Multi Gigabit Ethernet links for transporting IQ Samples to the Radio Head, repartitioning of BaseBand functions across the Radio and Baseband, Massive Beamforming, usage of dense servers rather than custom hardware in the cloud for traditional Base station and signal processing functions and ofcourse Low Power and Low Bandwidth radios and analysis in the cloud for connected devices and Internet of Things (IoT).",
				"chatbotName": "bcw",
				"companyName": "BigCat Wireless",
				"domainName": "www.bigcatwireless.com",
				"title": "BCW BOT",
				"advancedOptions": {
					"welcomeMessage": "Welcome to BCW",
					"emailRequired": false,
					"errorResponse": "Oops Something went wrong",
					"disclaimer": "NONE",
					"theme": {
						"headerTextBackgroundColor": "#fc83ba",
						"headerTextFontColor": "#6b1c53",
						"headerTextFontSize": "14",
						"chatBodyBackgroundColor": "#ccf7f6",
						"chatbotTextBackgroundColor": "#9ef6c9",
						"chatbotTextFontColor": "#21704f",
						"chatbotTextFontSize": "12",
						"userTextBackgroundColor": "#ebef93",
						"userTextFontColor": "#6c7b26",
						"userTextFontSize": "12",
						"userInputBackgroundColor": "#e5bd7a",
						"userInputFontColor": "#5d5234",
						"userInputFontSize": "12",
						"buttonTextBackgroundColor": "#d72fe6",
						"buttonTextFontColor": "#FFFFFF",
						"buttonTextFontSize": "14",
						"widgetLocation": "bottom-right"
					}
				},
				"email": "nln@sequoiaat.com",
				"chatbotId": "53960cb9-f9c5-4dc9-b23a-5f968db2d9a5"
			}
	setChatbotCharacteristics();
}



const setChatbotCharacteristics = () =>
{
	// console.log("data-->" + data);
	console.log("window.name-->" + window.name);

	chatbotInfo = data; //data["chatbots"][window.name];

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
	email_required = chatbotInfo["advancedOptions"]["emailRequired"];
	if (email_required){
		document.getElementById("chatbot").style.maxHeight = "35%";
	}
	else{
		document.getElementById("email").hidden=true;
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
		// chatLi.querySelector("p").style.borderRadius = "10px 10px 10px 0px";
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

	user_email = localStorage.getItem("user_email");
	pdata = JSON.parse(user_data);

	user_location = pdata["countryName"]+" "+pdata["stateProv"]+" "+pdata["city"];
    // console.log("GET_RESPONSE_LAMBDA_URL-->" + GET_RESPONSE_LAMBDA_URL + "?name=" + chatbot_name + "&uinput=" + userInputText+"&email="+user_email+"&userData="+user_data);

    fetch(GET_RESPONSE_LAMBDA_URL + "?name=" + chatbot_name + "&uinput=" + userInputText+"&email="+user_email+"&location="+user_location,{
		mode:"cors",
	}).then(res => res.text()).then(responseData =>
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
var chatbotInfo;
setEventListeners();
// getChatbotCharacteristicsFromS3();
getChatbotCharacteristics();

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
	// console.log("email is", emailIn, "and valid is ",valid);
	// check if email is right
	if (valid){
		// console.log("email good");
		document.getElementById("chatbot").style.maxHeight = "1000px";
		// console.log("did thing");
		document.getElementById("email").hidden = true; // maybe add a thing that says email acccepted or seomthing like the face id check
		localStorage.setItem("user_email",emailIn);
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
			console.log("ERROR NO DATA")
		});
}
getUserData();

