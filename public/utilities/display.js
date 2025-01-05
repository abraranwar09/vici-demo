const chatMessages = document.querySelector('.chat-messages');
const messageInput = document.querySelector('.chat-input input');
const sendButton = document.querySelector('.chat-input button');

function displayMessage(content, messageType) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${messageType}-message`, 'animate__animated', 'animate__fadeIn');
    messageElement.innerHTML = `<p>${content}</p>`;
    chatMessages.appendChild(messageElement);

    // scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Example usage: Add event listener to send button
sendButton.addEventListener('click', () => {
    const userMessage = messageInput.value;
    if (userMessage.trim()) {
        displayMessage(userMessage, 'user');
        messageInput.value = ''; // Clear input after sending
    }
});

