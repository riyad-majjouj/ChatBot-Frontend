import React, { useEffect, useState } from 'react';
import { AlertCircle, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface DownloadAlertProps {
  documentUrl: string;
  documentName: string;
  onClose: () => void;
}

const DownloadAlert: React.FC<DownloadAlertProps> = ({ 
  documentUrl, 
  documentName, 
  onClose 
}) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // عد تنازلي لإغلاق التنبيه
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // إغلاق تلقائي بعد 10 ثوانٍ
    const closeTimer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 z-50 animate-in slide-in-from-bottom-5">
      <Alert className="glass-panel border-accent/20">
        <AlertCircle className="h-5 w-5 text-accent" />
        <AlertTitle className="flex items-center justify-between">
          <span>Document available for download</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 -mr-2" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-3">
            Download the national exam document. This alert will close in {countdown}s.
          </p>
          {/* زر التحميل كرابط مباشرةً */}
          <Button asChild size="sm" className="w-full flex items-center justify-center">
            <a href={documentUrl} download={documentName}>
              <Download className="mr-2 h-4 w-4" />
              Download Now
            </a>
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default DownloadAlert;
