document.addEventListener('DOMContentLoaded', function() {
    // Image navigation
    const images = JSON.parse(document.getElementById('images-data').textContent);
    let currentIndex = 0;

    function updateImage() {
        const imgElement = document.getElementById('current-image');
        const videoId = document.getElementById('video-id')?.textContent || '';
        imgElement.src = `/serve_image/${images[currentIndex]}`;
        document.getElementById('image-counter').textContent = `Image ${currentIndex + 1} of ${images.length}`;

        // Update button states
        document.getElementById('prev-btn').disabled = currentIndex === 0;
        document.getElementById('next-btn').disabled = currentIndex === images.length - 1;
    }

    function nextImage() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateImage();
        }
    }

    function prevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            updateImage();
        }
    }

    if (images && images.length > 0) {
        updateImage(); // Initialize image display
    }

    // Add event listeners for image navigation
    document.getElementById('next-btn').addEventListener('click', nextImage);
    document.getElementById('prev-btn').addEventListener('click', prevImage);

    // Add toggle functionality
    const chatToggle = document.getElementById('chatToggle');
    const chatSection = document.getElementById('chatSection');

    // Function to toggle chat visibility
    function toggleChat() {
        if (chatToggle.checked) {
            chatSection.classList.remove('hidden');
        } else {
            chatSection.classList.add('hidden');
            // Clear chat when hiding
            document.getElementById('chat-messages').innerHTML = '';
            document.getElementById('question-input').value = '';
        }
    }

    // Initialize chat visibility (hidden by default)
    chatSection.classList.add('hidden');

    // Listen for toggle changes
    chatToggle.addEventListener('change', toggleChat);

    // Add event listener for ask question button
    document.getElementById('ask-button').addEventListener('click', function() {
        window.askQuestion({
            summary: document.getElementById('summary-data').textContent,
            transcript: document.getElementById('transcript-data').textContent,
            fullText: document.getElementById('transcript-data').textContent
        });
    });

    // Handle Enter key to send message
    document.getElementById('question-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            window.askQuestion({
                summary: document.getElementById('summary-data').textContent,
                transcript: document.getElementById('transcript-data').textContent,
                fullText: document.getElementById('transcript-data').textContent
            });
        }
    });
});