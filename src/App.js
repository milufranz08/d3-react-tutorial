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
      {data.map(([x, y], index) => (<div key={index}>{`${index + 1}) x: ${x} y: ${y}`}</div>)) }
    </div>
  );
}

export default App;
