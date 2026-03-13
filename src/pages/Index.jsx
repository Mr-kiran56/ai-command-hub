import BackgroundAnimation from "@/components/BackgroundAnimation.jsx";
import CommandSidebar from "@/components/CommandSidebar.jsx";
import AIChat from "@/components/AIChat.jsx";
import SystemMonitor from "@/components/SystemMonitor.jsx";
import LiveFeed from "@/components/LiveFeed.jsx";

const Index = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex bg-background relative">
      <BackgroundAnimation />
      <CommandSidebar />
      <div className="flex-1 flex min-w-0 relative z-10">
        <div className="w-[40%] min-w-[280px] h-full">
          <AIChat />
        </div>
        <div className="w-[30%] min-w-[220px] h-full border-r border-border/50">
          <SystemMonitor />
        </div>
        <div className="w-[30%] min-w-[200px] h-full">
          <LiveFeed />
        </div>
      </div>
    </div>
  );
};

export default Index;
