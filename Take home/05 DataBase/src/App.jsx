import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [mancount, setManCount] = useState(0);
  const [womancount, setWomanCount] = useState(0);
  const [log, setLog] = useState([]); 
  const [dbLogs, setDbLogs] = useState([]); 
  const [totalSum, setTotalSum] = useState(0);

  const reset = () => {
    setManCount(0);
    setWomanCount(0);
    setLog([]);
    setTotalSum(0);
  };

  const save = async () => {
    const now = new Date().toLocaleString();
    const newEntry = { male_count: mancount, female_count: womancount, timestamp: now };

    // Save locally 
    setLog([...log, `Man: ${mancount}, Woman: ${womancount} - Saved on: ${now}`]);
    setTotalSum(totalSum + mancount + womancount);

    // Save to database
    try {
      const response = await fetch("http://localhost:3001/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });

      if (response.ok) {
        fetchRecords(); 
      } else {
        console.error("Failed to save data.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await fetch("http://localhost:3001/records");
      const data = await response.json();

      setDbLogs(
        data.map(
          (entry) =>
            `Man: ${entry.male_count}, Woman: ${entry.female_count} - Saved on: ${entry.timestamp}`
        )
      );
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const sumAll = () => {
    alert(`Total Saved Count: ${totalSum}`);
  };

  return (
    <>
      <h1>Counter</h1>
      <div className="counter man">
        <h2 className="man-text">Man</h2>
        <p className="count">{mancount}</p>
        <button onClick={() => setManCount(mancount + 1)}>UP</button>
        <button onClick={() => setManCount(mancount - 1)}>DOWN</button>
      </div>

      <div className="counter woman">
        <h2 className="woman-text">Woman</h2>
        <p className="count">{womancount}</p>
        <button onClick={() => setWomanCount(womancount + 1)}>UP</button>
        <button onClick={() => setWomanCount(womancount - 1)}>DOWN</button>
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
