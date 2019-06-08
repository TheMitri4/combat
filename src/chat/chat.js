let testToken = getToken('token');

class GetMessagesObject{
	constructor(token, timestamp){
		this.body = {
			token: token,
			timestamp: timestamp
		};
	}
	method = 'GET';
	url = 'chat';
	handler = function(result){
		addMessages(result.chat, chatMessagesContainer);
	}
	errorHandler = function(result){
		console.log(result.responseText);
	}
}

function createMessage(time, author, text){
	let message = document.createElement('div');
	let messageTime = document.createElement('p');
	let messageAuthor = document.createElement('p');
	let messageText = document.createElement('p');

	message.classList.add('chat__message', 'message');
	messageTime.classList.add('message__time');
	messageAuthor.classList.add('message__author');
	messageText.classList.add('message__text');

	messageTime.innerText = time;
	messageAuthor.innerText = author;
	messageText.innerText = text;

	message.appendChild(messageTime);
	message.appendChild(messageAuthor);
	message.appendChild(messageText);

	return message;
}

let chatMessagesContainer = document.querySelector('.chat__messages');

function addMessages(arr, container){
	let wrapper = document.createDocumentFragment();
	
	arr.forEach(item => {
		let timestamp = new Date(item.timestamp).toTimeString().substring(0,8);
		wrapper.appendChild(createMessage(timestamp, item.user.username, item.message));
	});

	container.appendChild(wrapper);
}

function getMessagesQuery(){
	let timestamp = (+ new Date()) - 1000;
    let getMessagesObj = new GetMessagesObject(testToken, timestamp);
    AJAX(getMessagesObj)();
}

setInterval(() => {
    getMessagesQuery();
}, 1000);

class SendMessageObject{
	constructor(token, message, timestamp){
		this.body = {
			token: token,
			message: message,
			timestamp: timestamp
		};
	}
	method = 'POST';
	url = 'chat';
	header = POST_HEADER;
	handler = function(result){
		sendTextArea.value = '';
	}
	errorHandler = function(result){
		console.log(result.responseText);
	}
}

let sendForm = document.querySelector('.chat__send-block')
let sendButton = document.querySelector('.chat__send-button');
let sendTextArea = document.querySelector('.chat__send-text');

sendForm.addEventListener('submit', () => {
	event.preventDefault();
	sendMessage(sendTextArea);
});

sendButton.addEventListener('click', (event) => {
	event.preventDefault();
	sendMessage(sendTextArea);
});

function sendMessage(textarea){
	let text = textarea.value;

	if(!text){
		return;
	}

	let timestamp = + new Date();
	let sendObj = new SendMessageObject(testToken, text, timestamp);

	AJAX(sendObj)();
}

let onlineUsersList = document.querySelector('.online-users');

let getOnlineUsersObject = {
	method: 'GET',
	url: 'online',
	handler: function(result){
		showOnlineUsers(result.users, onlineUsersList);
	}
}

function createOnlineUser(nickname){
	let user = document.createElement('p');
	user.classList.add('online-users__user');
	user.innerText = nickname;
	return user;
}

function showOnlineUsers(arr, container){
	let wrapper = document.createDocumentFragment();
	
	arr.forEach(item => {
		wrapper.appendChild(createOnlineUser(item.username));
	});

	container.innerHTML = '';
	container.appendChild(wrapper);
}

function getOnlineUsersQuery(){
	AJAX(getOnlineUsersObject)();
}


getOnlineUsersQuery();
setInterval(() => {
    getOnlineUsersQuery();
}, 5000);









// class ChatMessages{
// 	constructor(container){
// 		this.container = container;
// 	}

// 	GetMessagesObject = class GetMessagesObject{
// 		constructor(token, timestamp){
// 			this.body = {
// 				token: token,
// 				timestamp: timestamp
// 			};
// 			this.handler = (result) => {
// 				ChatMessages.prototype.addMessages(result.chat);
// 			}
// 		}
// 		method = 'GET';
// 		url = 'chat';
// 		errorHandler = function(result){
// 			console.log(result.responseText);  
// 		}
// 	}

// 	createMessage = function(time, author, text){
// 		let message = document.createElement('div');
// 		let messageTime = document.createElement('p');
// 		let messageAuthor = document.createElement('p');
// 		let messageText = document.createElement('p');
	
// 		message.classList.add('chat__message', 'message');
// 		messageTime.classList.add('message__time');
// 		messageAuthor.classList.add('message__author');
// 		messageText.classList.add('message__text');
	
// 		messageTime.innerText = time;
// 		messageAuthor.innerText = author;
// 		messageText.innerText = text;
	
// 		message.appendChild(messageTime);
// 		message.appendChild(messageAuthor);
// 		message.appendChild(messageText);
	
// 		return message;
// 	}

// 	addMessages = function(arr){
// 		let wrapper = document.createDocumentFragment();
		
// 		arr.forEach(item => {
// 			let timestamp = new Date(item.timestamp).toTimeString().substring(0,8);
// 			wrapper.appendChild(this.createMessage(timestamp, item.user.username, item.message));
// 		});
	
// 		this.container.appendChild(wrapper);
// 	}

// 	getMessagesQuery = function(){
// 		let timestamp = (+ new Date()) - 500;
// 		let getMessagesObj = new this.GetMessagesObject(testToken, timestamp);
// 		AJAX(getMessagesObj)();
// 	}

// 	init = function(){

// 	}
// }