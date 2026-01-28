import { useState } from 'react';
import { Notification } from '@/types/ci';
import { Bell, CheckCircle2, XCircle, AlertTriangle, Info, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDismiss: (id: string) => void;
}

const NotificationPanel = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
}: NotificationPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'failure':
        return <XCircle className="w-5 h-5 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'info':
        return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getNotificationBorder = (type: Notification['type'], read: boolean) => {
    if (read) return 'border-border/50';
    switch (type) {
      case 'success':
        return 'border-success/30';
      case 'failure':
        return 'border-destructive/30';
      case 'warning':
        return 'border-warning/30';
      case 'info':
        return 'border-primary/30';
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="relative p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors duration-200 group">
          <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          {unreadCount > 0 && (
            <span className="notification-dot flex items-center justify-center text-[10px] font-bold text-destructive-foreground">
              {unreadCount > 9 ? '9+' : ''}
            </span>
          )}
        </button>
      </SheetTrigger>
      
      <SheetContent className="w-[400px] sm:w-[450px] bg-card border-border">
        <SheetHeader className="pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-foreground">Notifications</SheetTitle>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAllAsRead}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                <Check className="w-3.5 h-3.5 mr-1" />
                Mark all as read
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'All caught up!'}
          </p>
        </SheetHeader>

        <div className="mt-4 space-y-3 max-h-[calc(100vh-150px)] overflow-y-auto pr-2">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Bell className="w-12 h-12 mb-4 opacity-50" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={cn(
                  'p-4 rounded-xl border transition-all duration-200 animate-fade-in',
                  getNotificationBorder(notification.type, notification.read),
                  notification.read ? 'bg-muted/30' : 'bg-muted/50'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className={cn(
                          'font-medium text-sm',
                          notification.read ? 'text-muted-foreground' : 'text-foreground'
                        )}
                      >
                        {notification.title}
                      </h4>
                      <button
                        onClick={() => onDismiss(notification.id)}
                        className="flex-shrink-0 p-1 rounded hover:bg-accent transition-colors"
                      >
                        <X className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                      </span>
                      
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMarkAsRead(notification.id)}
                          className="text-xs h-7 px-2"
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationPanel;
