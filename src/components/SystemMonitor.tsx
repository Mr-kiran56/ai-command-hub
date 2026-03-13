import { motion } from "framer-motion";
import { ShieldCheck, Database, Wrench, Cpu, Container, Brain } from "lucide-react";

interface StatItem {
  label: string;
  value: string | number;
  color?: string;
}

interface StatsCardProps {
  title: string;
  icon: React.ReactNode;
  stats: StatItem[];
  glowClass?: string;
  delay?: number;
}

const StatsCard = ({ title, icon, stats, glowClass = "glow-border-blue", delay = 0 }: StatsCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className={`glass-card ${glowClass} rounded-lg p-3`}
  >
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h3 className="text-xs font-semibold text-foreground">{title}</h3>
    </div>
    <div className="space-y-2">
      {stats.map((s) => (
        <div key={s.label} className="flex justify-between items-center">
          <span className="text-[10px] text-muted-foreground">{s.label}</span>
          <span className={`text-[11px] font-mono font-semibold ${s.color || "text-foreground"}`}>{s.value}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

const ProgressBar = ({ value, color }: { value: number; color: string }) => (
  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className={`h-full rounded-full ${color}`}
    />
  </div>
);

const SystemMonitor = () => {
  return (
    <div className="h-full overflow-y-auto p-3 space-y-3 scrollbar-cyber relative z-10">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">System Monitor</h2>

      <StatsCard
        title="Security Brain Stats"
        icon={<ShieldCheck className="w-4 h-4 neon-text-blue" />}
        stats={[
          { label: "Total Vulns Learned", value: 383, color: "neon-text-blue" },
          { label: "SQL Injection", value: 103 },
          { label: "Command Injection", value: 31 },
          { label: "Secrets Detected", value: 28, color: "status-critical" },
        ]}
        delay={0}
      />

      <StatsCard
        title="Vector Memory Engine"
        icon={<Database className="w-4 h-4 neon-text-purple" />}
        glowClass="glow-border-purple"
        stats={[
          { label: "Embedding Database", value: "910 vectors" },
          { label: "Memory Retrieval Hits", value: 220 },
          { label: "Semantic Match Rate", value: "87%", color: "neon-text-cyan" },
        ]}
        delay={0.1}
      />

      <StatsCard
        title="Patch Performance"
        icon={<Wrench className="w-4 h-4 neon-text-cyan" />}
        stats={[
          { label: "Fix Success Rate", value: "94%", color: "status-online" },
          { label: "Average Retries", value: 1.2 },
          { label: "Verified Fixes", value: 317 },
          { label: "Manual Reviews", value: 12 },
        ]}
        delay={0.2}
      />

      <StatsCard
        title="AI Agent Status"
        icon={<Cpu className="w-4 h-4 neon-text-blue" />}
        stats={[
          { label: "LLM Engine", value: "ACTIVE", color: "status-active" },
          { label: "LangGraph Agents", value: "RUNNING", color: "status-running" },
          { label: "RAG Memory", value: "ENABLED", color: "status-online" },
        ]}
        delay={0.3}
      />

      {/* Docker Sandbox */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card glow-border-blue rounded-lg p-3"
      >
        <div className="flex items-center gap-2 mb-3">
          <Container className="w-4 h-4 neon-text-blue" />
          <h3 className="text-xs font-semibold text-foreground">Docker Sandbox</h3>
          <span className="ml-auto text-[9px] font-mono status-online pulse-glow">RUNNING</span>
        </div>
        <div className="space-y-2.5">
          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-muted-foreground">CPU Usage</span>
              <span className="font-mono text-foreground">32%</span>
            </div>
            <ProgressBar value={32} color="bg-neon-blue" />
          </div>
          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-muted-foreground">Memory</span>
              <span className="font-mono text-foreground">410MB</span>
            </div>
            <ProgressBar value={51} color="bg-neon-purple" />
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">Network Activity</span>
            <span className="font-mono status-online">Normal</span>
          </div>
        </div>
      </motion.div>

      {/* ML Shield */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card gradient-border rounded-lg p-3"
      >
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-4 h-4 neon-text-purple" />
          <h3 className="text-xs font-semibold text-foreground">ML Shield</h3>
        </div>
        <div className="text-center py-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-purple/30 bg-neon-purple/5">
            <div className="w-2 h-2 rounded-full bg-neon-purple pulse-glow" />
            <span className="text-[10px] font-mono neon-text-purple">Isolation Forest Model Active</span>
          </div>
        </div>
        <div className="space-y-1.5 mt-2">
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">Runtime Behavior</span>
            <span className="font-mono status-online">Normal</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">Anomalies Detected</span>
            <span className="font-mono text-foreground">0</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SystemMonitor;
