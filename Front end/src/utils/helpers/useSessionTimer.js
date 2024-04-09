import { useEffect, useState } from "react";

export function useSessionTimer(sessionKey) {
  const [sessionData, setSessionData] = useState(() => {
    const storedData = sessionStorage.getItem(sessionKey);
    return storedData ? JSON.parse(storedData) : null;
  });

  const [sessionDuration, setSessionDuration] = useState(100000);

  useEffect(() => {
    if (sessionData !== null) {
      const timer = setTimeout(() => {
        endSession();
      }, sessionDuration);

      return () => clearTimeout(timer);
    }
  }, [sessionData, sessionDuration]);

  const startSession = (data) => {
    sessionStorage.setItem(sessionKey, JSON.stringify(data));
    setSessionData(data);
  };

  const endSession = () => {
    setSessionData(null);
    sessionStorage.removeItem(sessionKey);
    setSessionDuration(null);
  };

  return [sessionData, startSession];
}
