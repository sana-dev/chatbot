document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");
    const chatbox = document.querySelector(".chatbox");

    let userMessage;

    const API_KEY = config.OPENAI_API_KEY;


    const createChatli = (message, className) => {
        const chatli = document.createElement("li");
        chatli.classList.add("chat", className);
        let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">🤖</span><p></p>`;
        chatli.innerHTML = chatContent;
        chatli.querySelector("p").textContent = message;
        return chatli;
    }

    const generateResponse = (incomingChatli) => {
        const API_URL = "https://api.openai.com/v1/chat/completions";

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            })
        };

        fetch(API_URL, requestOptions)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                const botMessage = data.choices[0].message.content;
                incomingChatli.querySelector("p").textContent = botMessage;
            })
            .catch((error) => {
                console.error(error);
                incomingChatli.querySelector("p").textContent = "Oops! Something went wrong. Please try again.";
            })
            .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    }

    const handleChat = () => {
        userMessage = chatInput.value.trim();
        if (!userMessage) return;
        chatInput.value = "";

        const outgoingChatli = createChatli(userMessage, "outgoing");
        chatbox.appendChild(outgoingChatli);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            const incomingChatli = createChatli("Thinking...", "incoming");
            chatbox.appendChild(incomingChatli);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatli);
        }, 600);
    }

    sendChatBtn.addEventListener("click", handleChat);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleChat();
        }
    });
});
