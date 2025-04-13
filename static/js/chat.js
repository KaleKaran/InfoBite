window.askQuestion = function(content) {
    const questionInput = document.getElementById('question-input');
    const chatMessages = document.getElementById('chat-messages');
    const askButton = document.getElementById('ask-button');

    const question = questionInput.value.trim();
    if (!question) return;

    // Validate content object
    if (!content) {
        console.error("Content object is missing");
        chatMessages.innerHTML += `
            <div class="chat-message error-message">
                <div class="message-content">Error: Unable to process your question. Missing content data.</div>
            </div>
        `;
        return;
    }

    // Disable button and show loading
    askButton.disabled = true;
    askButton.textContent = 'Thinking... 🤔';

    // Add user question to chat
    chatMessages.innerHTML += `
        <div class="chat-message user-message">
            <div class="message-content">${question}</div>
        </div>
    `;

    // Clear input
    questionInput.value = '';

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Check for summary and context/transcript/fullText
    const summary = content.summary || '';
    const context = content.fullText || content.transcript || '';

    // Send question to backend
    fetch('/ask_question', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            question: question,
            context: context,
            summary: summary
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }
        // Add AI response to chat
        chatMessages.innerHTML += `
            <div class="chat-message ai-message">
                <div class="message-content">${data.answer}</div>
            </div>
        `;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);
        chatMessages.innerHTML += `
            <div class="chat-message error-message">
                <div class="message-content">Sorry, there was an error: ${error.message}</div>
            </div>
        `;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    })
    .finally(() => {
        // Re-enable button
        askButton.disabled = false;
        askButton.textContent = 'Ask Question 💬';
    });
};