/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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

// custom hook to watch for browser window resize
const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

function App() {
  const [data, setData] = useState();
  const [isAnimated, setIsAnimated] = useState(false);
  const ref = useRef();
  const [width, height] = useWindowSize();

  useEffect(() => {
    setIsAnimated(!isAnimated);
  }, [data]);

  useInterval(() => {
    if (width && height) {
      const newData = generateData(width, height);
      setData(newData);
    }
  }, 2000)

  const style = useSpring({
    config: {
      duration: 2000,
    },
    r: isAnimated ? width/100 * 8 : 0,
    opacity: isAnimated ? 1 : 0,
  });

  return (
    <div className="App" ref={ref}>
      { width && height && data && (
        <svg 
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          overflow="auto"
        >
          {data.map(([x, y], index) => (
            <animated.circle {...style} 
              key={index}
              cx={x} 
              cy={y} 
              fill={isAnimated ? "#5900b3" : "#76eb00"} 
            />
          ))}
        </svg>
      )}
    </div>
  );
}

export default App;
