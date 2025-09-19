document.addEventListener("DOMContentLoaded", () => {
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-chatbot");
    const chatInput = document.querySelector(".chat-input input");
    const sendChatBtn = document.querySelector(".chat-input button");
    const chatLog = document.querySelector(".chat-log");
    const chatInputContainer = document.querySelector(".chat-input");

    const appendMessage = (message, sender) => {
        const messageLi = document.createElement("li");
        messageLi.classList.add("chat-message", sender);
        const messageP = document.createElement("p");
        messageP.innerHTML = message;
        messageLi.appendChild(messageP);
        chatLog.appendChild(messageLi);
        chatLog.scrollTo(0, chatLog.scrollHeight);
    };

    const createSuggestionButtons = () => {
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("suggestion-buttons");
        
        const suggestions = ["Book an Appointment", "Find a Doctor", "Contact Us"];
        suggestions.forEach(text => {
            const button = document.createElement("button");
            button.innerText = text;
            button.addEventListener("click", () => {
                handleUserQuery(text);
                buttonContainer.remove();
            });
            buttonContainer.appendChild(button);
        });
        chatLog.appendChild(buttonContainer);
        chatLog.scrollTo(0, chatLog.scrollHeight);
    };

    const getBotResponse = (userMessage) => {
        userMessage = userMessage.toLowerCase();
        let botMessage = "";

        if (userMessage.includes("hello") || userMessage.includes("hi")) {
            botMessage = "Hello! How can I assist you today?";
        } else if (userMessage.includes("appointment")) {
            botMessage = "You can book an appointment by using the form on our main page. <a href='#appointment-form-section'>Click here to go to the form.</a>";
        } else if (userMessage.includes("doctor")) {
            botMessage = "You can see all our specialists under the 'Meet Our Specialists' section. <a href='#doctors'>Click here to see them.</a>";
        } else if (userMessage.includes("contact")) {
            botMessage = "You can contact us at contact@adityacare.com or call us at +91 12345 67890.";
        } else if (userMessage.includes("thank")) {
            botMessage = "You're welcome! Is there anything else I can help with?";
        } else {
            botMessage = "I'm sorry, I didn't understand that. Please choose one of the options below:";
            setTimeout(createSuggestionButtons, 550);
        }

        setTimeout(() => {
            appendMessage(botMessage, "bot");
        }, 500);
    };

    const handleUserQuery = (message) => {
        const userMessage = message.trim();
        if (!userMessage) return;
        appendMessage(userMessage, "user");
        chatInput.value = "";
        
        chatInputContainer.style.display = 'none';

        getBotResponse(userMessage);

        setTimeout(() => {
            chatInputContainer.style.display = 'flex';
        }, 1000); 
    };

    sendChatBtn.addEventListener("click", () => handleUserQuery(chatInput.value));
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleUserQuery(chatInput.value);
    });

    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

    if(chatLog.children.length === 0){
        setTimeout(() => {
            appendMessage("Hello! How can I help you today?", "bot");
            createSuggestionButtons();
        }, 1000);
    }
});