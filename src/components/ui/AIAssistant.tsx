"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Mic, MicOff, Loader2, Volume2, VolumeX, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: "welcome",
    role: "model",
    text: "Hi! I'm your SVH Wellness AI. How can I help you today?"
  }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [lang, setLang] = useState<"en-US" | "te-IN" | "hi-IN">("en-US");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (typeof window !== "undefined" && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.lang = lang;
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert("Speech recognition is not supported in this browser.");
      }
    }
  };

  const speak = (text: string) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const toggleVoice = () => {
    if (isSpeaking) window.speechSynthesis.cancel();
    setVoiceEnabled(!voiceEnabled);
  };

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    const newUserMsg: ChatMessage = { id: Date.now().toString(), role: "user", text: userMessage };
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      // Build history for gemini
      const history = messages.filter(m => m.id !== "welcome").map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // Add a language instruction to the prompt if a non-English language is selected
      let finalMessage = userMessage;
      if (lang === "te-IN") finalMessage += " (Please reply in Telugu language)";
      if (lang === "hi-IN") finalMessage += " (Please reply in Hindi language)";

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: finalMessage, history })
      });

      if (!res.ok) throw new Error("Failed to send message");

      const data = await res.json();
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "model", text: data.response }]);
      speak(data.response);
      
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "model", text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/30"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl bg-background shadow-premium-lg border border-border sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-primary p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm">SVH AI Assistant</h3>
                  <p className="text-[10px] text-primary-foreground/80">Online | Smart Wellness</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="relative group">
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    <span className="text-[10px] uppercase font-bold">{lang.split("-")[0]}</span>
                  </button>
                  <div className="absolute right-0 top-full mt-1 hidden w-32 flex-col rounded-xl bg-card p-1 shadow-lg group-hover:flex border border-border">
                    <button onClick={() => setLang("en-US")} className="px-3 py-2 text-left text-xs font-medium text-foreground hover:bg-muted rounded-lg">English</button>
                    <button onClick={() => setLang("te-IN")} className="px-3 py-2 text-left text-xs font-medium text-foreground hover:bg-muted rounded-lg">Telugu</button>
                    <button onClick={() => setLang("hi-IN")} className="px-3 py-2 text-left text-xs font-medium text-foreground hover:bg-muted rounded-lg">Hindi</button>
                  </div>
                </div>
                <button onClick={toggleVoice} className="p-2 hover:bg-white/10 rounded-full transition-colors" title={voiceEnabled ? "Mute Voice" : "Enable Voice"}>
                  {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-white/50" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-sm" 
                      : "bg-card border border-border text-foreground rounded-tl-sm"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex w-full justify-start">
                  <div className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm bg-card border border-border text-foreground rounded-tl-sm flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border bg-background p-3">
              <form onSubmit={sendMessage} className="relative flex items-center">
                <button
                  type="button"
                  onClick={toggleListening}
                  className={cn(
                    "absolute left-2 flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                    isListening ? "bg-red-500/10 text-red-500 animate-pulse" : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Ask me anything..."}
                  className="h-12 w-full rounded-full border border-border bg-muted/30 pl-12 pr-12 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary"
                >
                  <Send className="h-4 w-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
