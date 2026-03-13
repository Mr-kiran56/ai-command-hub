import BackgroundAnimation from "@/components/BackgroundAnimation";
import CommandSidebar from "@/components/CommandSidebar";
import AIChat from "@/components/AIChat";
import SystemMonitor from "@/components/SystemMonitor";
import LiveFeed from "@/components/LiveFeed";

const Index = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex bg-background relative">
      <BackgroundAnimation />
      <CommandSidebar />
      <div className="flex-1 flex min-w-0 relative z-10">
        {/* AI Chat - 40% */}
        <div className="w-[40%] min-w-[280px] h-full">
          <AIChat />
        </div>
        {/* System Monitor - 30% */}
        <div className="w-[30%] min-w-[220px] h-full border-r border-border/50">
          <SystemMonitor />
        </div>
        {/* Live Feed - 30% */}
        <div className="w-[30%] min-w-[200px] h-full">
          <LiveFeed />
        </div>
      </div>
    </div>
  );
};

export default Index;
