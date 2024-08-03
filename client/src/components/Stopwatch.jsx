import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = ({ startTime, elapsedTime, onUpdate }) => {
  const [time, setTime] = useState(elapsedTime || 0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [running]);

  useEffect(() => {
    setTime(elapsedTime || 0);
  }, [elapsedTime]);

  const handleStartPause = () => {
    setRunning(!running);
    if (!running) {
      // Save the start time when the stopwatch starts
      onUpdate({ startTime: new Date().toISOString() });
    } else {
      // Save the elapsed time when the stopwatch is paused
      onUpdate({ elapsedTime: time });
    }
  };

  const handleReset = () => {
    setRunning(false);
    setTime(0);
    // Save the state when the stopwatch is reset
    onUpdate({ elapsedTime: 0, startTime: null, pausedTime: null });
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='text-black'>
      <p>Elapsed Time: {formatTime(time)}</p>
      <button onClick={handleStartPause} className="py-1 px-2 bg-green-500 text-white rounded">
        {running ? 'Pause' : 'Start'}
      </button>
      <button onClick={handleReset} className="ml-2 py-1 px-2 bg-red-500 text-white rounded">
        Reset
      </button>
    </div>
  );
};

export default Stopwatch;
