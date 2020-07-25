import React, { useState, useEffect } from 'react';
import { generateData } from './helper';
import './App.css';

function App() {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateData();
      setData(newData);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
