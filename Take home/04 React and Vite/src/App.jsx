import { useState } from 'react'
import './layout.css'


function App() {
  const [mancount, setManCount] = useState(0);
  const [womancount, setWomanCount] = useState(0);
  const [log, setLog] = useState([]);
  const [totalSum, setTotalSum] = useState(0);

  const reset = () => {
    setManCount(0);
    setWomanCount(0);
    setLog([]);
    setTotalSum(0);
  };

  const save = () => {
    const now = new Date().toLocaleString();
    const newEntry = `Man: ${mancount}, Woman: ${womancount} - Saved on: ${now}`;
    setLog([...log, newEntry]);
    setTotalSum(totalSum + mancount + womancount);
  };

  const sumAll = () => {
    alert(`Total Saved Count: ${totalSum}`);
  };

  return (
    <>
      <h1>Counter</h1>
      <div className="counter man">
        <h2 className='man-text'>Man</h2>
        <p className='count'>{mancount}</p>
        <button onClick={() => setManCount((mancount) => mancount + 1)}>UP</button>
        <button onClick={() => setManCount((mancount) => mancount - 1)}>DOWN</button>
      </div>

      <div className="counter woman">
        <h2 className='woman-text'>Woman</h2>
        <p className='count'>{womancount}</p>
        <button onClick={() => setWomanCount((womancount) => womancount + 1)}>UP</button>
        <button onClick={() => setWomanCount((womancount) => womancount - 1)}>DOWN</button>
      </div>

      <button onClick={save}>Save</button>
      <button onClick={reset}>Reset</button>
      <button onClick={sumAll}>Sum All</button>

      <h2>Visitor Log</h2>
      <ul>
        {log.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>

    </>
  );
}

export default App;
