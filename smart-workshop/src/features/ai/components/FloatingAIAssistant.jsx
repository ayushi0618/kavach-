import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import api from '../../../utils/api';

export default function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI Workshop Assistant. How can I help you today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  const handleSend = async () => {
    if (!query.trim()) return;
    const userMsg = query;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setQuery('');
    setIsTyping(true);

    try {
      const res = await api.post('/ai/chat', { query: userMsg });
      setMessages(prev => [...prev, { sender: 'ai', text: res.data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Error connecting to Gemini. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-border flex flex-col overflow-hidden h-[500px]"
          >
            {/* Header */}
            <div className="bg-olive p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-full"><Bot size={20} /></div>
                <div>
                  <h3 className="font-bold text-sm">Workshop AI</h3>
                  <p className="text-[10px] text-gray-300">Powered by Gemini</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition"><X size={20}/></button>
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                  {msg.sender === 'ai' && <div className="w-6 h-6 rounded-full bg-khaki flex items-center justify-center shrink-0 mt-1"><Sparkles size={12} className="text-olive" /></div>}
                  <div className={`p-3 rounded-lg text-sm shadow-sm ${msg.sender === 'user' ? 'bg-olive text-white rounded-br-none' : 'bg-white border border-border text-gray-700 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2 self-start max-w-[85%]">
                  <div className="w-6 h-6 rounded-full bg-khaki flex items-center justify-center shrink-0 mt-1"><Sparkles size={12} className="text-olive" /></div>
                  <div className="p-3 bg-white border border-border rounded-lg rounded-bl-none flex items-center gap-1 shadow-sm">
                    <motion.div animate={{y:[0,-5,0]}} transition={{repeat:Infinity, duration:0.6, delay:0}} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{y:[0,-5,0]}} transition={{repeat:Infinity, duration:0.6, delay:0.2}} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{y:[0,-5,0]}} transition={{repeat:Infinity, duration:0.6, delay:0.4}} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-border flex items-center gap-2">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about assets, parts, or jobs..." 
                className="flex-1 bg-gray-100 border-none focus:ring-1 focus:ring-primary rounded-full px-4 py-2 text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={!query.trim() || isTyping}
                className="w-9 h-9 rounded-full bg-olive text-white flex items-center justify-center disabled:opacity-50 hover:bg-opacity-90 transition"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-olive text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? <motion.div key="close" initial={{rotate:-90}} animate={{rotate:0}}><X size={24} /></motion.div> : <motion.div key="chat" initial={{rotate:90}} animate={{rotate:0}}><MessageSquare size={24} /></motion.div>}
        </AnimatePresence>
        {!isOpen && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-white"></span>}
      </motion.button>
    </div>
  );
}