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
  }, 2000)

  return (
    <div className="App">
      {data.map(([x, y], index) => (<div key={index}>{`${index}) x: ${x} y: ${y}`}</div>)) }
    </div>
  );
}

export default App;
