import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle2, Clock, Shield } from "lucide-react";

interface FeedEvent {
  id: number;
  message: string;
  status: "success" | "processing" | "critical";
  time: string;
  repo?: string;
}

const initialEvents: FeedEvent[] = [
  { id: 1, message: "PR #47 analyzed", status: "success", time: "09:41", repo: "payment-service" },
  { id: 2, message: "SQL Injection detected", status: "critical", time: "09:41", repo: "payment-service" },
  { id: 3, message: "Patch generated successfully", status: "success", time: "09:41" },
  { id: 4, message: "Fix PR #48 opened", status: "success", time: "09:42" },
  { id: 5, message: "Repository billing-service scanned", status: "processing", time: "09:43", repo: "billing-service" },
  { id: 6, message: "Hardcoded API key detected", status: "critical", time: "09:43", repo: "billing-service" },
  { id: 7, message: "Patch generated", status: "success", time: "09:44" },
  { id: 8, message: "Dependency audit: lodash@4.17.15", status: "processing", time: "09:44" },
  { id: 9, message: "All tests passing", status: "success", time: "09:45" },
  { id: 10, message: "Container sandbox healthy", status: "success", time: "09:45" },
];

const cycleEvents: FeedEvent[] = [
  { id: 100, message: "PR #52 opened by @dev-team", status: "processing", time: "now", repo: "auth-service" },
  { id: 101, message: "XSS vulnerability patched", status: "success", time: "now" },
  { id: 102, message: "Memory anomaly check passed", status: "success", time: "now" },
  { id: 103, message: "Critical: exposed secrets in env", status: "critical", time: "now", repo: "infra-config" },
];

const statusConfig = {
  success: { icon: CheckCircle2, color: "status-online", dot: "bg-emerald-400" },
  processing: { icon: Clock, color: "status-processing", dot: "bg-yellow-400" },
  critical: { icon: AlertTriangle, color: "status-critical", dot: "bg-red-400" },
};

const LiveFeed = () => {
  const [events, setEvents] = useState<FeedEvent[]>(initialEvents);
  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent = {
        ...cycleEvents[cycleIndex % cycleEvents.length],
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setEvents((prev) => [newEvent, ...prev.slice(0, 14)]);
      setCycleIndex((i) => i + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [cycleIndex]);

  return (
    <div className="h-full flex flex-col relative z-10">
      <div className="p-3 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 neon-text-cyan" />
          <h2 className="text-xs font-semibold text-foreground">Live Security Feed</h2>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-glow" />
          <span className="text-[9px] font-mono text-muted-foreground">LIVE</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-cyber">
        <AnimatePresence initial={false}>
          {events.map((event) => {
            const config = statusConfig[event.status];
            const Icon = config.icon;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-md p-2 flex items-start gap-2"
              >
                <div className={`mt-0.5 ${config.dot} w-1.5 h-1.5 rounded-full pulse-glow shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <Icon className={`w-3 h-3 ${config.color} shrink-0`} />
                    <span className="text-[10px] text-foreground truncate">{event.message}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] text-muted-foreground font-mono">{event.time}</span>
                    {event.repo && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                        {event.repo}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveFeed;
