import React, { useState, useRef, useEffect } from 'react';
import { Bot, MessageSquare, X, Send, Phone, ShieldCheck, UserCheck, CheckCircle2 } from 'lucide-react';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Ayubowan! I am Archie, your Furnicraft AI Architect Assistant. How can I assist you with custom teak furniture, pantry design, or 40-day villa construction today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ name: '', phone: '' });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend = null) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text }];
    setMessages(newMsgs);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();

      if (data.success) {
        setMessages([...newMsgs, { sender: 'bot', text: data.reply }]);
        if (data.suggestLead) setShowLeadForm(true);
      } else {
        setMessages([...newMsgs, { sender: 'bot', text: 'I am currently updating my architectural data. Please feel free to call our hotline at +94 77 123 4567!' }]);
      }
    } catch (err) {
      setMessages([...newMsgs, { sender: 'bot', text: 'Connecting to Furnicraft AI... Call hotline +94 77 123 4567 for instant architectural assistance.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLead = async (e) => {
    e.preventDefault();
    if (!leadInfo.phone) return;

    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Lead registration form submitted',
          userDetails: leadInfo
        })
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
        setShowLeadForm(false);
        setLeadInfo({ name: '', phone: '' });
      }
    } catch (err) {
      alert('Failed to register lead');
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'Tell me about 40 Days / 40 Lakhs package',
    'What is 110% Bank Guarantee?',
    'Custom Teak Pantry Cupboard quote',
    'Showroom locations & hotline'
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      
      {/* Floating Chatbot Launch Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-3 sm:p-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-black shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center space-x-2 border border-amber-300/40"
        >
          <div className="relative">
            <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black animate-pulse"></span>
          </div>
          <span className="hidden sm:inline-block font-extrabold text-xs tracking-wide uppercase pr-1 text-black">
            Furnicraft AI
          </span>
        </button>
      )}

      {/* Chat Drawer Popup Window */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[380px] h-[520px] bg-neutral-950/95 backdrop-blur-2xl border border-amber-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          
          {/* Chat Window Header */}
          <div className="p-4 bg-gradient-to-r from-amber-950 via-neutral-900 to-neutral-950 border-b border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-black font-black text-sm shadow-md">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm flex items-center space-x-1.5">
                  <span>Archie • Furnicraft AI</span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px]">Architect</span>
                </h4>
                <span className="text-[10px] text-emerald-400 font-medium flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-ping"></span>
                  Online • Sri Lanka
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-neutral-900 text-slate-400 hover:text-white border border-neutral-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-br-none shadow-md'
                      : 'bg-neutral-900 text-slate-200 border border-neutral-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-neutral-900 text-slate-400 p-3 rounded-2xl border border-neutral-800 text-xs flex items-center space-x-2">
                  <span>Archie is thinking...</span>
                </div>
              </div>
            )}

            {/* Quick Prompts */}
            {messages.length < 4 && (
              <div className="pt-2 space-y-1.5">
                <span className="text-[10px] text-slate-500 font-semibold block">Suggested Questions:</span>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((qp, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(qp)}
                      className="px-2.5 py-1 rounded-full bg-neutral-900 hover:bg-amber-500/10 text-amber-300 hover:text-amber-400 border border-neutral-800 text-[10px] font-medium transition-all text-left"
                    >
                      {qp}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Inline Lead Capture Form */}
            {showLeadForm && (
              <form onSubmit={handleSubmitLead} className="p-3 rounded-2xl bg-neutral-900 border border-amber-500/30 space-y-2 text-xs">
                <span className="font-bold text-amber-400 block text-[11px]">Request Call Back from Architect:</span>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={leadInfo.name}
                  onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-slate-600 focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Your Phone Number *"
                  value={leadInfo.phone}
                  onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-slate-600 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-1.5 rounded-lg bg-amber-500 text-black font-extrabold text-[11px] shadow-sm"
                >
                  Submit Phone for Free Call
                </button>
              </form>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Field */}
          <div className="p-3 bg-neutral-900/90 border-t border-neutral-800 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask Archie about wood, pantries, 40 days package..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputMessage.trim()}
              className="p-2 rounded-xl bg-amber-500 text-black hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
