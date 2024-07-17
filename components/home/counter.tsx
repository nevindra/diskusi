import { useEffect, useState } from "react";

interface CounterProps {
  targetCount: number;
  duration: number;
  delay: number;
  isVisible: boolean;
}

const Counter = ({ targetCount, duration, delay, isVisible }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const intervalDuration = 50; // Update interval in milliseconds (0.05 seconds)
    const increment = Math.ceil(targetCount / (duration / intervalDuration));

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount >= targetCount) {
            clearInterval(interval);
            return targetCount;
          }
          return Math.min(prevCount + increment, targetCount);
        });
      }, intervalDuration);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, targetCount, duration, delay]);

  return <span>{count}+</span>;
};

export default Counter;