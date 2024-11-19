import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { checkConnection } from '../api';

export default function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        await checkConnection();
        setIsConnected(true);
      } catch {
        setIsConnected(false);
      } finally {
        setChecking(false);
      }
    };

    const interval = setInterval(checkStatus, 30000);
    checkStatus();

    return () => clearInterval(interval);
  }, []);

  if (checking) return null;

  return (
    <div className={`flex items-center space-x-2 text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
      {isConnected ? (
        <>
          <CheckCircle2 className="w-4 h-4" />
          <span>Connected to LM Studio</span>
        </>
      ) : (
        <>
          <XCircle className="w-4 h-4" />
          <span>Not connected to LM Studio</span>
        </>
      )}
    </div>
  );
}