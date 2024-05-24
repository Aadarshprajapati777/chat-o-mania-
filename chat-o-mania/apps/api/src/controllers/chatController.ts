import express from 'express';
import { handleChat } from '../services/chatService';

const router = express.Router();



 router.post('/', async (req, res) => {
  const { projectId, userQuery } = req.body;

  try {
    const chatResponse = await handleChat(projectId, userQuery);
    res.status(200).json({ response: chatResponse });
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Failed to process chat' });
  }
});

export default router;
