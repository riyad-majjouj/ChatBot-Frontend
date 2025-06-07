
import React from 'react';
import { Settings, Menu, Moon, Info, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = "Aurora AI",
  subtitle = "Your intelligent assistant",
}) => {
  return (
    <header className="glass-panel rounded-2xl flex items-center justify-between p-4 mb-4">
      <div className="flex items-center">
        <button className="p-2 mr-2 text-muted-foreground hover:text-accent rounded-full transition-colors md:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-foreground flex items-center">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse-slow mr-2"></span>
            {title}
          </h1>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center space-x-1">
        <Link to="/" className="p-2 text-muted-foreground hover:text-accent rounded-full transition-colors">
          <Home className="h-4 w-4" />
        </Link>
      
        
      </div>
    </header>
  );
};

export default Header;
