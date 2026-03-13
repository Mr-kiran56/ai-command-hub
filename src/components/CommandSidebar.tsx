import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, MessageSquare, GitPullRequest, ShieldAlert,
  BookOpen, FolderGit2, Container, Brain, ScrollText, Settings, Shield
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: MessageSquare, label: "AI Chat" },
  { icon: GitPullRequest, label: "Pull Requests" },
  { icon: ShieldAlert, label: "Vulnerabilities" },
  { icon: BookOpen, label: "Knowledge Base" },
  { icon: FolderGit2, label: "Repositories" },
  { icon: Container, label: "Docker Sandbox" },
  { icon: Brain, label: "ML Shield" },
  { icon: ScrollText, label: "Logs" },
  { icon: Settings, label: "Settings" },
];

const statusItems = [
  { label: "System Status", value: "ONLINE", className: "status-online" },
  { label: "Memory Engine", value: "ACTIVE", className: "status-active" },
  { label: "ML Shield", value: "RUNNING", className: "status-running" },
];

const CommandSidebar = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="w-56 h-screen flex flex-col bg-sidebar border-r border-border/50 relative z-10 shrink-0">
      {/* Logo */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 neon-text-blue" />
          <div>
            <h1 className="text-sm font-semibold text-foreground">AI Security Agent</h1>
            <p className="text-[10px] text-muted-foreground font-mono">DevSecOps Brain</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto scrollbar-cyber">
        {navItems.map((item, i) => (
          <motion.button
            key={item.label}
            onClick={() => setActive(i)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all relative group ${
              active === i
                ? "text-primary bg-muted"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
            whileHover={{ x: 2 }}
            transition={{ duration: 0.15 }}
          >
            {active === i && (
              <motion.div
                layoutId="activeNav"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <item.icon className="w-4 h-4 shrink-0" />
            <span>{item.label}</span>
            {active === i && (
              <div className="absolute inset-0 rounded-md glow-border-blue pointer-events-none" />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Status */}
      <div className="p-3 border-t border-border/50 space-y-2">
        {statusItems.map((s) => (
          <div key={s.label} className="flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">{s.label}</span>
            <span className={`font-mono font-semibold pulse-glow ${s.className}`}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommandSidebar;
