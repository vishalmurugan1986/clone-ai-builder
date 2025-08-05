import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Plus, 
  Settings, 
  Share, 
  Play, 
  MoreHorizontal,
  Maximize,
  Smartphone,
  Monitor,
  Tablet,
  Code,
  Eye,
  User,
  Zap
} from "lucide-react";
import jiraLogo from "@/assets/jira-logo.png";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AppPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Jira AI. I can help you build amazing web applications. What would you like to create today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand you want to create that. Let me help you build it! I'll start by creating the basic structure and then we can iterate on the design and functionality together.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const previewSizes = {
    desktop: "w-full h-full",
    tablet: "w-[768px] h-[1024px]",
    mobile: "w-[375px] h-[667px]"
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img src={jiraLogo} alt="Jira" className="h-6 w-6" />
            <span className="font-semibold text-foreground">Jira</span>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <h1 className="font-medium text-foreground">New Project</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </Button>
          <Button variant="default" size="sm">
            <Play className="h-4 w-4 mr-1" />
            Publish
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        {/* Chat Panel */}
        <div className="w-96 border-r border-border flex flex-col bg-card">
          {/* Chat Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-foreground">Chat with AI</h2>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Badge variant="secondary" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              AI Assistant Active
            </Badge>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] ${msg.isUser ? "order-2" : "order-1"}`}>
                    {!msg.isUser && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <img src={jiraLogo} alt="AI" className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-muted-foreground">Jira AI</span>
                      </div>
                    )}
                    <Card className={`p-3 ${
                      msg.isUser 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted"
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                    </Card>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {msg.isUser && (
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center ml-2 order-3">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Chat Input */}
          <div className="p-4 border-t border-border">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Ask AI to build something..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!message.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">
              Try: "Create a modern landing page" or "Build a todo app"
            </p>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="flex-1 flex flex-col bg-muted/20">
          {/* Preview Header */}
          <div className="p-4 border-b border-border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="font-semibold text-foreground">Preview</h2>
                <div className="flex items-center gap-1">
                  <Button
                    variant={viewMode === "preview" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("preview")}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button
                    variant={viewMode === "code" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("code")}
                  >
                    <Code className="h-4 w-4 mr-1" />
                    Code
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 border border-border rounded-md p-1">
                  <Button
                    variant={previewMode === "desktop" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPreviewMode("desktop")}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={previewMode === "tablet" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPreviewMode("tablet")}
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={previewMode === "mobile" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPreviewMode("mobile")}
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button variant="ghost" size="sm">
                  <Maximize className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 p-4 overflow-auto">
            <div className="h-full flex items-center justify-center">
              {viewMode === "preview" ? (
                <Card className={`bg-background border-border shadow-lg ${previewSizes[previewMode]} transition-all duration-300`}>
                  <div className="h-full flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-hero rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <Zap className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Ready to Build
                      </h3>
                      <p className="text-muted-foreground max-w-md">
                        Start chatting with the AI to create your application. 
                        Your changes will appear here in real-time.
                      </p>
                      <Button variant="default" className="mt-4">
                        Get Started
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="w-full h-full bg-background border-border">
                  <div className="h-full p-4">
                    <div className="h-full bg-muted/50 rounded-md p-4 font-mono text-sm">
                      <div className="text-muted-foreground">
                        // Your generated code will appear here
                        <br />
                        // Start building to see the magic happen!
                        <br />
                        <br />
                        <span className="text-blue-500">import</span>{" "}
                        <span className="text-green-500">React</span>{" "}
                        <span className="text-blue-500">from</span>{" "}
                        <span className="text-yellow-500">'react'</span>;
                        <br />
                        <br />
                        <span className="text-blue-500">const</span>{" "}
                        <span className="text-green-500">App</span>{" "}
                        <span className="text-blue-500">=</span> () {" => "}
                        <span className="text-blue-500">{"{"}</span>
                        <br />
                        {"  "}<span className="text-blue-500">return</span> (
                        <br />
                        {"    "}<span className="text-red-500">{"<div>"}</span>
                        <br />
                        {"      "}<span className="text-gray-400">{"// Your AI-generated app"}</span>
                        <br />
                        {"    "}<span className="text-red-500">{"</div>"}</span>
                        <br />
                        {"  "});
                        <br />
                        <span className="text-blue-500">{"}"}</span>;
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPage;