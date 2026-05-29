import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Folder, RefreshCw, Bot, User, CheckCircle2 } from 'lucide-react';

export default function AnalysisChat({ 
  messages, 
  onSendMessage, 
  isStreaming, 
  suggestedPrompts 
}) {
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  // Automatically scroll to the bottom of the chat when messages change or streaming status changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isStreaming) return;
    onSendMessage(inputText);
    setInputText('');
  };

  // Function to dynamically replace brackets like [Video A] and [Video B] with visual pill tags
  const renderMessageContent = (text) => {
    // We will parse the text and inject JSX elements for [Video A] and [Video B]
    const parts = text.split(/(\[Video A\]|\[Video B\])/g);
    return parts.map((part, idx) => {
      if (part === '[Video A]') {
        return (
          <span 
            key={idx} 
            className="inline-flex items-center px-1.5 py-0.5 mx-0.5 text-[11px] font-bold rounded bg-purple-950/40 text-purple-300 border border-purple-800/40 tracking-wide align-middle"
          >
            Video A
          </span>
        );
      } else if (part === '[Video B]') {
        return (
          <span 
            key={idx} 
            className="inline-flex items-center px-1.5 py-0.5 mx-0.5 text-[11px] font-bold rounded bg-teal-950/40 text-teal-300 border border-teal-800/40 tracking-wide align-middle"
          >
            Video B
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full lg:w-2/5 flex flex-col gap-6">
      {/* Title */}
      <h1 className="text-xl font-bold tracking-wider text-white uppercase flex items-center gap-2">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400 font-extrabold">💬</span>
        Analysis Chat Panel
      </h1>

      {/* Main Chat Box Container */}
      <div className="bg-[#121424] border border-[#1f223a] rounded-2xl flex flex-col justify-between shadow-2xl h-[calc(100vh-12rem)] min-h-[550px] overflow-hidden relative transition-all duration-300 hover:border-[#2b3052]">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-[#1f223a] bg-[#16192d]/50 backdrop-blur-md">
          <div className="flex justify-between items-center mb-1">
            <span className="px-2.5 py-0.5 text-[10px] font-bold rounded bg-amber-950/30 text-amber-400 border border-amber-800/40 uppercase tracking-widest">
              LangGraph • ChromaDB • GPT-4o
            </span>
            <span className="flex items-center gap-1.5 text-xs text-teal-400 font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_#2dd4bf]" />
              Session Active
            </span>
          </div>
          <h2 className="text-lg font-extrabold text-white tracking-tight leading-tight mt-2 flex items-center gap-2">
            AI Video Insights
            <Sparkles size={16} className="text-purple-400 animate-pulse" />
          </h2>
        </div>

        {/* Suggested Prompts & Chat Window Area */}
        <div className="flex-grow flex flex-col justify-between overflow-y-auto p-4 space-y-4">
          
          {/* Suggested Prompts Chips */}
          <div className="space-y-2 pb-2 border-b border-[#1f223a]/65">
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block">Suggested Prompts</span>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => !isStreaming && onSendMessage(prompt)}
                  disabled={isStreaming}
                  className="px-3 py-1.5 text-xs bg-[#171a30] hover:bg-[#202547] text-gray-300 hover:text-white rounded-lg border border-[#2b3052] active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all duration-150 font-medium"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Bubble Thread */}
          <div className="flex-grow space-y-4 overflow-y-auto pr-1">
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block mt-2">Chat Thread</span>
            {messages.map((message) => {
              const isUser = message.role === 'user';
              return (
                <div key={message.id} className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  {/* AI Avatar */}
                  {!isUser && (
                    <div className="p-2 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl text-white shadow-lg border border-purple-500/20 shrink-0">
                      <Bot size={16} />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className={`max-w-[85%] rounded-2xl p-4 shadow-xl border ${
                    isUser 
                      ? 'bg-[#7c3aed] text-white border-purple-500/30 rounded-tr-sm' 
                      : 'bg-[#171a2e] text-gray-200 border-[#1f223a] rounded-tl-sm'
                  }`}>
                    <div className="text-sm leading-relaxed tracking-wide space-y-2 whitespace-pre-line">
                      {renderMessageContent(message.content)}
                    </div>
                  </div>

                  {/* User Avatar */}
                  {isUser && (
                    <div className="w-8 h-8 rounded-xl bg-purple-950/50 border border-purple-800 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 select-none shadow-md">
                      U
                    </div>
                  )}
                </div>
              );
            })}

            {/* Streaming Indicator */}
            {isStreaming && (
              <div className="flex items-start gap-2.5 justify-start">
                <div className="p-2 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl text-white shadow-lg border border-purple-500/20 shrink-0">
                  <Bot size={16} className="animate-spin" style={{ animationDuration: '3s' }} />
                </div>
                <div className="bg-[#171a2e] text-teal-400 border border-[#1f223a] rounded-2xl rounded-tl-sm p-4 shadow-xl flex items-center gap-2 text-xs font-semibold">
                  <span className="flex gap-1">
                    <span className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-stream-dots" />
                    <span className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-stream-dots animation-delay-200" />
                    <span className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-stream-dots animation-delay-400" />
                  </span>
                  <span>Streaming response...</span>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Chat Input & Footer Section */}
        <div className="p-4 border-t border-[#1f223a] bg-[#16192d]/50 backdrop-blur-md space-y-3">
          <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block">Footer</span>
          
          <form onSubmit={handleSubmit} className="relative bg-[#171a2e] border border-[#2b3052] rounded-xl overflow-hidden focus-within:border-purple-500 transition-colors">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask me anything about these videos!"
              rows={2}
              disabled={isStreaming}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              className="w-full bg-transparent border-0 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none resize-none focus:ring-0 disabled:opacity-50"
            />
            
            {/* Action Buttons Row inside Textarea container */}
            <div className="flex justify-between items-center px-4 py-2 border-t border-[#1f223a]/65 bg-[#141628]/45">
              <span className="text-[10px] text-[#8e92b2] flex items-center gap-1">
                Type your message here...
              </span>
              <button
                type="submit"
                disabled={!inputText.trim() || isStreaming}
                className="px-4 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-40 disabled:hover:bg-[#7c3aed] active:scale-95 disabled:scale-100 text-white text-xs font-semibold rounded-lg shadow-md transition-all duration-150 flex items-center gap-1.5"
              >
                <span>Send</span>
                <Send size={12} />
              </button>
            </div>
          </form>

          {/* Active Memory Context Indicator */}
          <div className="flex items-center justify-between text-[10px] text-[#8e92b2] font-medium pt-1 px-1">
            <span className="flex items-center gap-1 bg-[#171a2e]/60 px-2 py-1 rounded border border-[#1f223a]/55">
              <Folder size={11} className="text-purple-400" />
              MEMORY STATE: <span className="text-green-400 font-bold uppercase">Active</span>
            </span>
            <span className="flex items-center gap-2">
              <span>Current context preserved</span>
              <span className="text-gray-600">|</span>
              <span className="font-semibold text-white">12 Turns</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
