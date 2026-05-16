/*
  chat.js

  This file adds simple interactive chat behaviour to the page. When the user submits a message, the script appends it to the chat window and generates a basic automated reply. Replies are randomly chosen from a small set of responses, making the conversation feel a bit more varied.

  Accessibility considerations:
    • Messages are appended to a container with aria-live="polite" to announce new content to screen readers.
    • Input fields include labels and appropriate aria attributes.

  Feel free to replace the generateReply function with more sophisticated logic or connect it to a real backend.
*/

(function () {
  const chatForm = document.getElementById('chat-form');
  const chatWindow = document.getElementById('chat-window');
  const userInput = document.getElementById('user-input');

  // Predefined bot responses for demonstration
  const botResponses = [
    "I'm just a demo chat bot.",
    'Tell me more about that.',
    'That sounds interesting!',
    'Can you expand on that?',
    'Thanks for sharing!'
  ];

  // Append a message to the chat window
  function appendMessage(sender, text) {
    const messageEl = document.createElement('div');
    messageEl.classList.add('message', sender);

    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.textContent = text;

    messageEl.appendChild(bubble);
    chatWindow.appendChild(messageEl);

    // Scroll to bottom so the latest message is visible
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // Generate a simple reply based on user input
  function generateReply(input) {
    // Basic heuristic: if the user asks a question, respond differently
    if (input.trim().endsWith('?')) {
      return 'That is a good question. I wish I had all the answers.';
    }
    // Otherwise pick a random reply
    return botResponses[Math.floor(Math.random() * botResponses.length)];
  }

  // Handle form submission
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = userInput.value.trim();
    if (!text) return;
    appendMessage('user', text);
    userInput.value = '';
    userInput.focus();

    // Simulate a short delay before bot replies
    setTimeout(() => {
      const reply = generateReply(text);
      appendMessage('bot', reply);
    }, 600);
  });
})();