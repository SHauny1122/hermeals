import { useState, useEffect } from 'react';

const MAX_FREE_USES = 3;
const STORAGE_KEY = 'diaryai_usage';

interface UsageData {
  count: number;
  lastReset: string;
  deviceId: string;
}

export function useUsageLimit() {
  const [usageLeft, setUsageLeft] = useState<number>(MAX_FREE_USES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAndUpdateUsage = () => {
      const today = new Date().toDateString();
      const stored = localStorage.getItem(STORAGE_KEY);
      let usage: UsageData;

      if (stored) {
        usage = JSON.parse(stored);
        // Reset if it's a new day
        if (usage.lastReset !== today) {
          usage = {
            count: 0,
            lastReset: today,
            deviceId: usage.deviceId
          };
        }
      } else {
        // First time user
        usage = {
          count: 0,
          lastReset: today,
          deviceId: generateDeviceId()
        };
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
      setUsageLeft(MAX_FREE_USES - usage.count);
      setIsLoading(false);
    };

    checkAndUpdateUsage();
  }, []);

  const incrementUsage = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;

    const usage: UsageData = JSON.parse(stored);
    if (usage.count >= MAX_FREE_USES) return false;

    usage.count += 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
    setUsageLeft(MAX_FREE_USES - usage.count);
    return true;
  };

  return {
    usageLeft,
    isLoading,
    incrementUsage,
    maxUses: MAX_FREE_USES
  };
}

// Generate a simple device fingerprint
function generateDeviceId(): string {
  const nav = window.navigator;
  const screen = window.screen;
  const fingerprint = [
    nav.userAgent,
    screen.height,
    screen.width,
    nav.language,
    new Date().getTimezoneOffset()
  ].join('|');
  
  return btoa(fingerprint);
}
