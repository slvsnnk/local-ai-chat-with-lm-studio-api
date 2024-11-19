import { Message, ChatCompletionResponse } from './types';

const API_URL = 'http://localhost:1234';

export async function checkConnection() {
  try {
    const response = await fetch(`${API_URL}/v1/models`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('API not responding correctly');
    }
    
    return true;
  } catch (error) {
    throw new Error('Cannot connect to LM Studio');
  }
}

export async function sendMessage(messages: Message[]): Promise<ChatCompletionResponse> {
  try {
    const response = await fetch(`${API_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        messages,
        model: 'local-model',
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from API');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Cannot connect to LM Studio')) {
        throw new Error('Cannot connect to LM Studio. Please ensure:\n1. LM Studio is running\n2. A model is loaded\n3. API server is enabled in settings');
      }
      throw error;
    }
    throw new Error('An unexpected error occurred while sending the message.');
  }
}