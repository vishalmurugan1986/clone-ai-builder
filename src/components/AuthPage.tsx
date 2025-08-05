import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github, Mail, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import jiraLogo from "@/assets/jira-logo.png";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-orange-600/20 backdrop-blur-3xl"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={jiraLogo} alt="Jira" className="h-10 w-10" />
            <span className="text-white font-bold text-2xl">Jira</span>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-white/70">
            {isLogin ? "Sign in to continue building" : "Start building amazing apps today"}
          </p>
        </div>

        {/* Auth Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-white text-center">
              {isLogin ? "Sign in" : "Create account"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Social Buttons */}
            <div className="space-y-3">
              <Button 
                variant="hero" 
                className="w-full justify-start gap-3"
                onClick={() => navigate("/app")}
              >
                <Github className="h-5 w-5" />
                Continue with GitHub
              </Button>
              <Button 
                variant="hero" 
                className="w-full justify-start gap-3"
                onClick={() => navigate("/app")}
              >
                <Mail className="h-5 w-5" />
                Continue with Google
              </Button>
            </div>

            <div className="relative">
              <Separator className="bg-white/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-gradient-hero px-3 text-white/70 text-sm">
                  or continue with email
                </span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                  required
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                    required
                  />
                </div>
              )}

              <Button 
                type="submit" 
                variant="premium" 
                className="w-full"
              >
                {isLogin ? "Sign in" : "Create account"}
              </Button>
            </form>

            {/* Toggle Auth Mode */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <span className="text-white font-medium">Sign up</span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span className="text-white font-medium">Sign in</span>
                  </>
                )}
              </button>
            </div>

            {isLogin && (
              <div className="text-center">
                <a 
                  href="#" 
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Forgot your password?
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-white/60 text-sm">
          <p>
            By continuing, you agree to our{" "}
            <a href="#" className="text-white/80 hover:text-white">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-white/80 hover:text-white">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;