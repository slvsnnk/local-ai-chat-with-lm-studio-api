export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatCompletionResponse {
  choices: {
    message: {
      content: string;
      role: string;
    };
  }[];
}

export interface Model {
  id: string;
  object: string;
  created: number;
  owned_by: string;
}