import React, { useEffect, useRef, useState } from "react";

const Timer = ({ time, interval = 1000, onEnd }) => {
  const [internalTime, setInternalTime] = useState(time);
  const timerRef = useRef(time);

  useEffect(() => {
    if (internalTime === 0 && onEnd) {
      onEnd();
    }
  }, [internalTime, onEnd]);

  useEffect(() => {
    timerRef.current = setInterval(
      () => setInternalTime((timerRef.current -= interval)),
      interval
    )
    return () => {
      clearInterval(timerRef.current)
    }
  }, [interval])
  return <div className="timer">{`Time:${Math.abs(Math.floor(internalTime/1000))}s`}</div>;
};

export default Timer;
