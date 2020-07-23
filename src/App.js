/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { animated, useSpring } from "react-spring";
import { generateData } from './helper';
import './App.css';

// custom hook that runs some logic every certain time
const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

function App() {
  const [data, setData] = useState(generateData());
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(!isAnimated);
  }, [data]);

  useInterval(() => {
    const newData = generateData();
    setData(newData);
  }, 2000);

  const style = useSpring({
    config: {
      duration: 2000,
    },
    r: isAnimated ? 5 : 0,
    opacity: isAnimated ? 1 : 0,
  })

  return (
    <div className="App">
      <svg viewBox="0 0 100 100">
        {data.map(([x, y], index) => (
          <animated.circle {...style} 
            key={index}
            cx={x} 
            cy={y} 
            fill={isAnimated ? "#5900b3" : "#76eb00"} 
          />
        ))}
      </svg>
    </div>
  );
}

export default App;
