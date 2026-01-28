import { useState, useEffect } from 'react';
import NotificationPanel from './NotificationPanel';
import { Notification } from '@/types/ci';
import { RefreshCw, Settings, Github, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  notifications: Notification[];
  onNotificationRead: (id: string) => void;
  onAllNotificationsRead: () => void;
  onNotificationDismiss: (id: string) => void;
}

const Header = ({
  notifications,
  onNotificationRead,
  onAllNotificationsRead,
  onNotificationDismiss,
}: HeaderProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-border bg-card sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-lg">U</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">urunc</h1>
            <p className="text-xs text-muted-foreground">CI Dashboard</p>
          </div>
        </div>
        
        <div className="h-8 w-px bg-border mx-2" />
        
        <a
          href="https://github.com/nubificus/urunc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
        >
          <Github className="w-4 h-4" />
          <span>nubificus/urunc</span>
        </a>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-muted-foreground hover:text-foreground"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          className="text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
        >
          <Settings className="w-5 h-5" />
        </Button>
        
        <NotificationPanel
          notifications={notifications}
          onMarkAsRead={onNotificationRead}
          onMarkAllAsRead={onAllNotificationsRead}
          onDismiss={onNotificationDismiss}
        />
      </div>
    </header>
  );
};

export default Header;
