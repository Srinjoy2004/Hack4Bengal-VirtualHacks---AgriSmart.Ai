// AIAssistant.tsx
import { useState, useEffect, useRef } from 'react';

// Define message types
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

// Define suggestion types
interface Suggestion {
  id: string;
  text: string;
}

// Agriculture-specific suggestions
const farmingSuggestions: Suggestion[] = [
  { id: '1', text: 'Weather forecast for my crops' },
  { id: '2', text: 'Best practices for organic farming' },
  { id: '3', text: 'How to identify plant diseases' },
  { id: '4', text: 'Soil testing recommendations' },
  { id: '5', text: 'Water conservation techniques' },
];

export default function AgriSmartAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello, I'm KrishiBot, your agriculture assistant. How can I help with your farming needs today?",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to check if query is agriculture-related
  const isAgricultureRelated = (input: string): boolean => {
    const keywords = [
      'crop',
      'farm',
      'agriculture',
      'soil',
      'pest',
      'disease',
      'irrigation',
      'weather',
      'organic',
      'livestock',
      'cultivation',
      'fertilizer',
      'equipment',
      'government scheme',
      'farming',
      'plant',
      'harvest',
      'drought',
      'compost',
      'tractor',
      'seeds',
      'sowing',
      'plowing',
      'manure',
      'cattle',
      'poultry',
    ];
    return keywords.some((keyword) => input.toLowerCase().includes(keyword));
  };

  // Function to generate response using Gemini API
  const generateResponse = async (input: string): Promise<string> => {
    if (!isAgricultureRelated(input)) {
      return "I'm here to assist only with agriculture-related questions. Please ask something related to farming or agriculture.";
    }

    const customPrompt = `You are KrishiBot, an intelligent and helpful chatbot designed specifically for assisting users with agricultural-related queries only. You can provide information, guidance, and suggestions on topics such as:
- Crop cultivation techniques
- Soil health and fertility
- Pest and disease control
- Farming equipment
- Weather advice for farming
- Government schemes related to agriculture
- Irrigation methods
- Organic and modern farming practices
- Livestock care
Stay professional, concise, and helpful. Use simple, farmer-friendly language.
User query: ${input}`;

    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDD8QW1BggDVVMLteDygHCHrD6Ff9Dy0e8',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: customPrompt }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const generatedText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Sorry, I could not process your request. Please try again.';
      return generatedText.trim();
    } catch (error) {
      console.error('API Error:', error);
      return 'Sorry, there was an issue connecting to the server. Please try again later.';
    }
  };

  // Function to handle sending messages
  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Generate AI response
    const response = await generateResponse(text);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'assistant',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  // Handle suggestion click
  const handleSuggestionClick = (text: string) => {
    handleSendMessage(text);
  };

  // Handle enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-green-50">
      {/* Header */}
      <header className="bg-green-500 text-white px-5 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
            <path d="M16.5 3.5c1.5 1.5 1.5 4.5 0 6S13 6.5 13 5s2-3 3.5-1.5z" />
          </svg>
          <span className="font-bold text-lg">KrishiBot AI Assistant</span>
        </div>
        <div className="flex items-center gap-2"></div>
      </header>

      {/* Main Content - Just the Chat Container without Sidebar */}
      <div className="flex-1 max-w-2xl mx-auto w-full p-4 overflow-hidden">
        {/* Chat Container */}
        <div className="flex-1 flex flex-col bg-white rounded-xl overflow-hidden shadow-sm h-full">
          <div className="px-5 py-3 border-b border-green-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 15c-1.85 0-3.35-1.5-3.35-3.35S10.15 8.3 12 8.3s3.35 1.5 3.35 3.35-1.5 3.35-3.35 3.35" />
                <path d="M15.5 9A7.5 7.5 0 108 16.5" />
                <path d="M16 8A8 8 0 108 16" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-green-800">KrishiBot AI</h3>
              <p className="text-xs text-gray-500">Farm-specific recommendations</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-green-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3/4 rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-green-500 text-white rounded-br-none'
                        : 'bg-white border border-green-100 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-green-100 rounded-lg rounded-bl-none px-4 py-2 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-300 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-green-300 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-green-300 rounded-full animate-bounce"
                        style={{ animationDelay: '0.4s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Suggestions */}
          <div className="px-4 py-3 bg-green-50 border-t border-green-100">
            <p className="text-xs text-green-700 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {farmingSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="bg-white text-green-700 text-xs py-1 px-3 rounded-full border border-green-200 hover:bg-green-100 transition-colors"
                >
                  {suggestion.text}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-green-100 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about crops, weather, or farming techniques..."
                className="flex-1 border border-green-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className={`p-2 rounded-lg ${
                  inputValue.trim()
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-100 text-gray-400'
                } transition-colors`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
              <button className="p-2 bg-white border border-green-200 rounded-lg hover:bg-green-50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}