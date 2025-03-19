
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Download, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const handleDownload = () => {
    // Define the URL to the PDF file
    const pdfUrl = "https://www.alloschool.com/assets/documents/course-399/examen-national-svt-sciences-physiques-2023-normale-corrige.pdf";
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', 'examen-national-svt-sciences-physiques-2023.pdf');
    link.setAttribute('target', '_blank');
    
    // Append to the document and trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header */}
          <header className="glass-panel rounded-2xl flex items-center justify-between p-4 mb-8">
            <div className="flex items-center">
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-foreground flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse-slow mr-2"></span>
                  Aurora AI
                </h1>
                <p className="text-xs text-muted-foreground">Your intelligent assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                onClick={handleDownload} 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download Document</span>
              </Button>
              <Link to="/chat">
                <Button size="sm" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>Start Chatting</span>
                </Button>
              </Link>
            </div>
          </header>

          {/* Hero Content */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-12 text-center mb-8 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-bounce-subtle">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Welcome to Aurora AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your intelligent AI assistant, ready to help with conversations and information.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/chat">
                <Button size="lg" className="w-full sm:w-auto group">
                  Start Chatting
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={handleDownload}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Study Document
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <MessageSquare className="h-8 w-8 text-primary" />,
                title: "Natural Conversations",
                description: "Engage in fluid, natural conversations with Aurora AI's advanced language capabilities."
              },
              {
                icon: <Bot className="h-8 w-8 text-primary" />,
                title: "Intelligent Assistant",
                description: "Get help with information, answers to questions, and guidance on various topics."
              },
              {
                icon: <Sparkles className="h-8 w-8 text-primary" />,
                title: "Smart Responses",
                description: "Experience contextually aware responses that understand the flow of conversation."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass-panel rounded-2xl p-6 flex flex-col items-center text-center hover:border-accent/20 transition-all hover:-translate-y-1 duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="glass-panel rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to chat with Aurora AI?</h2>
            <p className="text-muted-foreground mb-6">Start a conversation and experience the power of AI assistance.</p>
            <Link to="/chat">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-muted-foreground">
        <p>Aurora AI Assistant • &copy; {new Date().getFullYear()} • Intelligent AI Technology</p>
      </footer>
    </div>
  );
};

export default Home;
