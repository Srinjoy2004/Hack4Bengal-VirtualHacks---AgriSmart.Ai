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

// Sample agriculture-specific suggestions
const farmingSuggestions: Suggestion[] = [
  { id: '1', text: "Weather forecast for my crops" },
  { id: '2', text: "Best practices for organic farming" },
  { id: '3', text: "How to identify plant diseases" },
  { id: '4', text: "Soil testing recommendations" },
  { id: '5', text: "Water conservation techniques" },
];

// Sample predefined responses for agricultural queries
const agriResponses: Record<string, string> = {
  "weather": "Based on your farm's location, we're expecting moderate rainfall in the next 48 hours. Consider delaying any spraying operations and ensure proper drainage in low-lying areas.",
  "disease": "To identify common plant diseases, look for yellowing leaves, spots, wilting, or unusual growth. Upload a photo of your affected plant for more specific diagnosis.",
  "soil": "Regular soil testing every 2-3 years is recommended. The ideal pH for most crops is between 6.0 and 7.0. We can help arrange soil testing services through our AgriSmart partners.",
  "water": "Consider drip irrigation for row crops to reduce water usage by up to 60%. Morning watering (5-10am) maximizes absorption and minimizes evaporation.",
  "organic": "For organic farming, focus on crop rotation, companion planting, and natural predators. Our database shows compost and neem-based solutions work well in your agricultural zone."
};

export default function AgriSmartAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello, I'm your AgriSmart Assistant. How can I help with your farming needs today?",
      sender: 'assistant',
      timestamp: new Date()
    }
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

  // Function to handle sending messages
  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const response = generateResponse(text);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Generate responses based on user input
  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('weather') || lowerInput.includes('forecast') || lowerInput.includes('rain')) {
      return agriResponses.weather;
    } else if (lowerInput.includes('disease') || lowerInput.includes('pest') || lowerInput.includes('infection')) {
      return agriResponses.disease;
    } else if (lowerInput.includes('soil') || lowerInput.includes('ph') || lowerInput.includes('testing')) {
      return agriResponses.soil;
    } else if (lowerInput.includes('water') || lowerInput.includes('irrigation') || lowerInput.includes('drought')) {
      return agriResponses.water;
    } else if (lowerInput.includes('organic') || lowerInput.includes('natural') || lowerInput.includes('chemical free')) {
      return agriResponses.organic;
    }
    
    return "I understand you're asking about " + input + ". As your AgriSmart assistant, I can provide specific guidance on crop management, pest control, weather adaptation, and sustainable farming practices. Could you provide more details about your farm size, current crops, and specific challenges?";
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
            <path d="M16.5 3.5c1.5 1.5 1.5 4.5 0 6S13 6.5 13 5s2-3 3.5-1.5z" />
          </svg>
          <span className="font-bold text-lg">AgriSmart AI Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          
          
        </div>
      </header>

      {/* Main Content - Just the Chat Container without Sidebar */}
      <div className="flex-1 max-w-2xl mx-auto w-full p-4 overflow-hidden">
        {/* Chat Container */}
        <div className="flex-1 flex flex-col bg-white rounded-xl overflow-hidden shadow-sm h-full">
          <div className="px-5 py-3 border-b border-green-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15c-1.85 0-3.35-1.5-3.35-3.35S10.15 8.3 12 8.3s3.35 1.5 3.35 3.35-1.5 3.35-3.35 3.35" />
                <path d="M15.5 9A7.5 7.5 0 108 16.5" />
                <path d="M16 8A8 8 0 108 16" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-green-800">AgriSmart AI</h3>
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
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-green-100 rounded-lg rounded-bl-none px-4 py-2 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-300 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-green-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
              <button className="p-2 bg-white border border-green-200 rounded-lg hover:bg-green-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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