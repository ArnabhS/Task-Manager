import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = ({ startTime, elapsedTime, onUpdate }) => {
  const [time, setTime] = useState(elapsedTime || 0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [running]);

  const handleStart = () => {
    setRunning(true);
    if (!startTime) {
      onUpdate({ startTime: Date.now(), elapsedTime: time });
    }
  };

  const handlePause = () => {
    setRunning(false);
    onUpdate({ elapsedTime: time });
  };

  return (
    <div className='bg-black'>
      <div>{new Date(time).toISOString().substr(11, 8)}</div>
      <button onClick={running ? handlePause : handleStart}>
        {running ? 'Pause' : 'Start'}
      </button>
    </div>
  );
};

export default Stopwatch;
