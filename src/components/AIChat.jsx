import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Github, Database, Zap } from "lucide-react";

const initialMessages = [
  {
    id: 1, type: "ai", timestamp: "09:41",
    content: "🔍 PR #47 analyzed\n⚠️ 2 vulnerabilities detected\n🔧 Generating secure patch...\n✅ Fix branch created: fix/sql-injection-47",
  },
  {
    id: 2, type: "user", timestamp: "09:42",
    content: "Analyze repository payment-service",
  },
  {
    id: 3, type: "ai", timestamp: "09:42",
    content: "📂 Scanning payment-service...\n\n🔎 Found 3 issues:\n• SQL Injection in /api/checkout\n• Hardcoded API key in config.js\n• Outdated dependency: lodash@4.17.15\n\n🛡️ Generating patches...",
  },
  {
    id: 4, type: "user", timestamp: "09:43",
    content: "Show vulnerability details for SQL injection",
  },
  {
    id: 5, type: "ai", timestamp: "09:43",
    content: "🔴 Critical: SQL Injection\n📍 File: src/api/checkout.ts:42\n💉 Vector: User input concatenated in query\n🔧 Fix: Parameterized query applied\n✅ Test: 14/14 passing\n📝 PR #48 created with fix",
  },
];

const suggestions = [
  "scan repository",
  "analyze pull request",
  "show vulnerabilities",
  "generate fix PR",
  "show memory knowledge",
];

const AIChat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now(),
      type: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          type: "ai",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          content: "🔍 Processing request...\n✅ Analysis complete.\n📊 No new vulnerabilities found.\n🛡️ System secure.",
        },
      ]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-card/40 backdrop-blur-sm border-r border-border/50 relative z-10">
      <div className="p-3 border-b border-border/50 glass-card rounded-none">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 neon-text-blue" />
              AI Security Auditor
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Github className="w-3 h-3" /> Connected to GitHub
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Database className="w-3 h-3" /> Memory Retrieval Enabled
              </span>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-glow" />
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-cyber">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                  msg.type === "ai"
                    ? "glass-card glow-border-blue font-mono"
                    : "bg-primary/20 border border-primary/30 text-foreground"
                }`}
              >
                <pre className="whitespace-pre-wrap font-mono text-xs">{msg.content}</pre>
                <span className="text-[9px] text-muted-foreground mt-1 block">{msg.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1 px-3 py-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </motion.div>
        )}
      </div>

      <div className="px-3 py-1.5 flex gap-1.5 flex-wrap">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setInput(s)}
            className="text-[10px] px-2 py-1 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors font-mono"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="p-3 border-t border-border/50">
        <div className="flex items-center gap-2 glass-card rounded-lg px-3 py-2 glow-border-blue">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask the AI Security Agent..."
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none font-mono"
          />
          <button
            onClick={handleSend}
            className="p-1.5 rounded-md bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
