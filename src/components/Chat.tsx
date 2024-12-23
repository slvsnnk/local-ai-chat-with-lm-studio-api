import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send } from 'lucide-react';
import { Message } from '../types';
import MessageBubble from './Message';
import ConnectionStatus from './ConnectionStatus';
import { sendMessage } from '../api';
import { roles, defaultRole } from '../glossary';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [role, setRole] = useState<string>(defaultRole);
  const [systemMessageSent, setSystemMessageSent] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const updateSystemMessage = (newRole: string) => {
    if (systemMessageSent) {
      const systemMessage: Message = { role: 'system', content: `You are a helpful assistant. The user is a ${newRole}.` };
      setMessages(prevMessages => {
        const filteredMessages = prevMessages.filter(msg => msg.role !== 'system');
        return [systemMessage, ...filteredMessages];
      });
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setRole(newRole);
    updateSystemMessage(newRole);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    let updatedMessages = [...messages, userMessage];

    if (!systemMessageSent) {
      const systemMessage: Message = { role: 'system', content: `You are a helpful assistant specialized in assisting a ${role}.` };
      updatedMessages = [systemMessage, ...updatedMessages];
      setSystemMessageSent(true);
    }

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    abortControllerRef.current = new AbortController();

    try {
      const response = await sendMessage(updatedMessages, { signal: abortControllerRef.current.signal });
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.choices[0].message.content,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        setError('Request was aborted');
      } else {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleNewChat = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages([]);
    setError(null);
    setSystemMessageSent(false);
  };

  const handleAbort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
        <div className="flex items-center">
          <Bot className="w-6 h-6 text-blue-600 mr-2" />
          <h1 className="text-xl font-semibold text-gray-800">Local AI Chat by Slv Snnk</h1>
        </div>
        <div className="flex items-center space-x-4">
          <ConnectionStatus />
          <button
            onClick={handleNewChat}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >New Chat</button>
          {isLoading && (
            <button
              onClick={handleAbort}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >Abort</button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !error && (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg font-medium">Welcome to Local AI Chat!</p>
            <p className="text-sm mt-2">Make sure LM Studio is running with:</p>
            <ul className="text-sm mt-1 space-y-1">
              <li>1. A model loaded</li>
              <li>2. API server enabled in settings</li>
              <li>3. Enable CORS Navigate to the LM Studio local server and enable Cross-Origin <br />Resource Sharing (CORS) to allow requests from the chat application.</li>
              <li>4. Server running on port 1234</li>
            </ul>
          </div>
        )}
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Bot className="w-5 h-5 animate-pulse" />
            <span>Thinking...</span>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p className="font-medium">Error</p>
            <p className="text-sm whitespace-pre-line">{error}</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex space-x-4 max-w-4xl mx-auto">
          <select
            value={role}
            onChange={handleRoleChange}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {roles.map((roleOption) => (
              <option key={roleOption} value={roleOption}>{roleOption}</option>
            ))}
          </select>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}