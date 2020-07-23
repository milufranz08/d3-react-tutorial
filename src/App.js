import React, { useState, useEffect, useRef } from 'react';
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

  useInterval(() => {
    const newData = generateData()
    setData(newData)
  }, 2000);

  return (
    <div className="App">
      <svg viewBox="0 0 100 100">
        {data.map(([x, y], index) => (
          <circle key={index} cx={x} cy={y} r="1" fill="purple"/>
        ))}
      </svg>
    </div>
  );
}

export default App;
