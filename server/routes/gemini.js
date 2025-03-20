
const express = require('express');
const router = express.Router();
const { saveMessage } = require('../database');
const { sendMessageToGemini } = require('../services/geminiService');

// Route to send a message to Gemini AI
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Save user message to database
    saveMessage('user', message);
    
    // Send message to Gemini
    const response = await sendMessageToGemini(message);
    
    // Save AI response to database
    saveMessage('ai', response);
    
    // Return the response
    res.status(200).json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      details: error.message
    });
  }
});

// Get chat history
router.get('/history', (req, res) => {
  const { getMessages } = require('../database');
  const messages = getMessages();
  res.status(200).json({ messages });
});

module.exports = router;
