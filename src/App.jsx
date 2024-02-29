import { useState, useEffect } from "react";
import './App.css';

function StopWatch() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedTimer = localStorage.getItem('timer');
    const savedIsRunning = localStorage.getItem('isRunning');

    if (savedTimer && savedIsRunning) {
      setTimer(Number(savedTimer));
      setIsRunning(savedIsRunning === 'true');
      setLoaded(true); 
    } else {
      setLoaded(true); 
    }
  }, []);

  useEffect(() => {
    if (loaded) { 
      let intervalId;

      if (isRunning) {
        intervalId = setInterval(() => {
          setTimer(prevTimer => prevTimer + 10);
        }, 10);
      } else {
        clearInterval(intervalId);
      }

      return () => clearInterval(intervalId);
    }
  }, [isRunning, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('timer', timer);
      localStorage.setItem('isRunning', isRunning.toString());
    }
  }, [timer, isRunning, loaded]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTimer(0);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / (1000 * 60));
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="stopwatch-container">
      <h2>STOPWATCH</h2>
      <div className="timer">{formatTime(timer)}</div>
      <div className="buttons">
        {!isRunning ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handleStop}>Stop</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default StopWatch;
