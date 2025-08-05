import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, ArrowUp, Globe, Smartphone, Zap, Users, Code, Palette, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import jiraLogo from "@/assets/jira-logo.png";

const LandingPage = () => {
  const [prompt, setPrompt] = useState("");

  const projects = [
    {
      title: "pulse-robot-template",
      category: "Website",
      remixes: "22106",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
    },
    {
      title: "cryptocurrency-trading-dashboard", 
      category: "Website",
      remixes: "13557",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop"
    },
    {
      title: "ai-integration-platform",
      category: "B2B App", 
      remixes: "8307",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop"
    },
    {
      title: "social-media-dashboard",
      category: "Consumer App",
      remixes: "6543",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop"
    }
  ];

  const categories = ["Popular", "Discover", "Internal Tools", "Website", "Personal", "Consumer App", "B2B App", "Prototype"];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="flex items-center justify-between p-6 relative z-10">
        <div className="flex items-center gap-2">
          <img src={jiraLogo} alt="Jira" className="h-8 w-8" />
          <span className="text-white font-bold text-xl">Jira</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-white/80 hover:text-white transition-colors">Community</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">Pricing</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">Enterprise</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">Learn</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">Launched</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/auth">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Log in
            </Button>
          </Link>
          <Link to="/auth">
            <Button variant="hero">
              Get started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-4xl">
          Build something <img src={jiraLogo} alt="Jira" className="inline h-16 w-16 mx-2" /> Jira
        </h1>
        <p className="text-xl text-white/80 mb-12 max-w-2xl">
          Create apps and websites by chatting with AI - completely free forever
        </p>

        {/* Search Input */}
        <div className="w-full max-w-2xl mb-8">
          <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-4">
              <Plus className="text-white/60 h-5 w-5" />
              <Input
                placeholder="Ask Jira to create a landing page for my..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-transparent border-none text-white placeholder:text-white/60 text-lg flex-1 focus-visible:ring-0"
              />
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Globe className="h-3 w-3 mr-1" />
                  Public
                </Badge>
                <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white rounded-full h-8 w-8 p-0">
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white/10 backdrop-blur-sm mx-6 rounded-3xl p-8 mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">From the Community</h2>
          <Button variant="ghost" className="text-white hover:bg-white/10">
            View All
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button 
              key={category}
              variant="ghost" 
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10 rounded-full"
            >
              {category}
              {category === "Popular" && <ChevronDown className="ml-1 h-3 w-3" />}
            </Button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer group">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button size="sm" variant="hero" className="text-xs">
                    Remix
                  </Button>
                  <Button size="sm" variant="hero" className="text-xs">
                    Preview
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-sm mb-1">{project.title}</h3>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                    {project.category}
                  </Badge>
                  <span className="text-white/60 text-xs">{project.remixes} Remixes</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Everything you need to build amazing apps
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 inline-block">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-white/70">Build and deploy apps in minutes, not weeks</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 inline-block">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Full Code Control</h3>
              <p className="text-white/70">Export to GitHub or edit code directly</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 inline-block">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Beautiful Design</h3>
              <p className="text-white/70">AI-powered design that looks professional</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 inline-block">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Mobile Ready</h3>
              <p className="text-white/70">Responsive apps that work on all devices</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 inline-block">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Team Collaboration</h3>
              <p className="text-white/70">Work together with your team in real-time</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 inline-block">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">One-Click Deploy</h3>
              <p className="text-white/70">Deploy your apps instantly to the web</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to build something amazing?</h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Join thousands of developers who are already building the future with AI
        </p>
        <Link to="/auth">
          <Button variant="premium" size="lg" className="text-lg px-8 py-6">
            Start Building Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;