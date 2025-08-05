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

  const [generatedComponent, setGeneratedComponent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateComponent = (prompt: string) => {
    const templates = {
      "landing page": `
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white">
          <header className="p-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">MyApp</h1>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg">Sign Up</button>
          </header>
          <main className="flex flex-col items-center justify-center text-center px-6 py-20">
            <h1 className="text-6xl font-bold mb-6">Welcome to the Future</h1>
            <p className="text-xl mb-8 max-w-2xl">Build amazing applications with our powerful platform</p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold">Get Started</button>
          </main>
        </div>
      `,
      "todo app": `
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Todo App</h1>
          <div className="mb-4">
            <input type="text" placeholder="Add new task..." className="w-full p-3 border rounded-lg" />
            <button className="w-full mt-2 bg-blue-600 text-white p-3 rounded-lg">Add Task</button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span>Sample Task 1</span>
              <button className="text-red-500">Delete</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span>Sample Task 2</span>
              <button className="text-red-500">Delete</button>
            </div>
          </div>
        </div>
      `,
      "dashboard": `
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow p-4">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          </header>
          <main className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-blue-600">1,234</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Revenue</h3>
                <p className="text-3xl font-bold text-green-600">$12,345</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Orders</h3>
                <p className="text-3xl font-bold text-purple-600">567</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>New user registered</span>
                  <span className="text-sm text-gray-500">2 mins ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Order completed</span>
                  <span className="text-sm text-gray-500">5 mins ago</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      `
    };

    // Find matching template
    const lowerPrompt = prompt.toLowerCase();
    for (const [key, template] of Object.entries(templates)) {
      if (lowerPrompt.includes(key)) {
        return template;
      }
    }

    // Default template
    return `
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Your Custom App</h1>
        <p className="text-lg text-gray-600 mb-8">Built with Jira AI - completely free!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-2">Feature One</h3>
            <p>Amazing functionality that works perfectly</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-2">Feature Two</h3>
            <p>Another great feature for your app</p>
          </div>
        </div>
        <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Take Action
        </button>
      </div>
    `;
  };

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
    const currentMessage = message;
    setMessage("");
    setIsGenerating(true);

    // Generate AI response and component
    setTimeout(() => {
      const component = generateComponent(currentMessage);
      setGeneratedComponent(component);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Perfect! I've created your ${currentMessage} and it's now live in the preview. The app is fully functional and ready to use. You can continue to refine it by asking for specific changes or additions.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsGenerating(false);
    }, 2000);
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
                  {generatedComponent ? (
                    <div 
                      className="h-full w-full overflow-auto"
                      dangerouslySetInnerHTML={{ __html: generatedComponent }}
                    />
                  ) : isGenerating ? (
                    <div className="h-full flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-hero rounded-2xl mx-auto mb-4 flex items-center justify-center animate-pulse">
                          <Zap className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          Building Your App...
                        </h3>
                        <p className="text-muted-foreground max-w-md">
                          Jira AI is generating your application. This will take just a moment.
                        </p>
                      </div>
                    </div>
                  ) : (
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
                  )}
                </Card>
              ) : (
                <Card className="w-full h-full bg-background border-border">
                  <div className="h-full p-4">
                    <div className="h-full bg-muted/50 rounded-md p-4 font-mono text-sm overflow-auto">
                      {generatedComponent ? (
                        <pre className="text-muted-foreground whitespace-pre-wrap">
                          {generatedComponent}
                        </pre>
                      ) : (
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
                      )}
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