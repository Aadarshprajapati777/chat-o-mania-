import axios from 'axios';
import { extractPdfContent } from './pdfService';

async function talkToLLM(userQuery: string, pdfContent: string | undefined): Promise<string> {
  const llmApiUrl = 'https://llm-api.com/chat'; 
  const apiKey = 'your_llm_api_key';

try {
    const requestData = {
        query: userQuery,
        apiKey: apiKey,
    } as { query: string; apiKey: string; pdfContent?: string };

    if (pdfContent) {
        requestData['pdfContent'] = pdfContent;
    }

    const response = await axios.post(llmApiUrl, requestData);

    return response.data.response;
} catch (error) {
    console.error('Error talking to LLM API:', error);
    throw new Error('Failed to get response from LLM API');
  }
}

async function handleChat(projectId: string, userQuery: string): Promise<string> {
  if (userQuery.includes('PDF') || userQuery.includes('document')) {
    const pdfUrl = 'https://your-bucket-url.com/your-pdf-file.pdf'; 
    const pdfContent = await extractPdfContent(pdfUrl);

    const llmResponse = await talkToLLM(userQuery, pdfContent);
    return llmResponse;
  } else {
    return 'Sorry, I can only chat about PDFs at the moment.';
  }
}

export { handleChat };
