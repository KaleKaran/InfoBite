document.getElementById('prompt_option').addEventListener('change', function() {
    const customPromptContainer = document.getElementById('custom-prompt-container'); // Correct ID
    if (this.value === 'custom') {
        customPromptContainer.style.display = 'block';
    } else {
        customPromptContainer.style.display = 'none';
    }
});