/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { animated } from "react-spring";
import Axis from './Axis';
import { generateData } from './helper';
import './App.css';

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
  const ref = useRef();
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (width && height) {
      const newData = generateData(width -10, height - 40);
      setData(newData);
    }
  }, [width]);

  return (
    <div className="App" ref={ref}>
      { width && height && data && (
        <>
          <svg 
            viewBox={`0 0 ${width} ${height - 40}`}
            width={width}
            height={height - 40}
            overflow="auto"
          >
            {data.map(([x, y], index) => (
              <animated.circle 
                key={index}
                cx={x} 
                cy={y} 
                r={width/100 * 0.5}
                fill="#5900b3"
              />
            ))}
          </svg>
          <Axis domain={[0, 100]} range={[10, width - 10]} width={width}/>
        </>
      )}
    </div>
  );
}

export default App;
