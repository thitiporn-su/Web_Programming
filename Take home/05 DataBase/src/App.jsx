import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [male, setMale] = useState(0);
    const [female, setFemale] = useState(0);
    const [records, setRecords] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        fetchRecords();
    }, []);

    const saveData = async () => {
        await axios.post("http://localhost:3001/save", { male_count: male, female_count: female });
        setMale(0);
        setFemale(0);
        fetchRecords();
    };

    const fetchRecords = async () => {
        const res = await axios.get("http://localhost:3001/records", { 
            params: { startDate, endDate } 
        });
        setRecords(res.data);
    };

    return (
        <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
            <h1>Fun 04: MySQL Integration</h1>
            
            <div>
                <label>Male: </label>
                <input type="number" value={male} onChange={e => setMale(Number(e.target.value))} />
            </div>

            <div>
                <label>Female: </label>
                <input type="number" value={female} onChange={e => setFemale(Number(e.target.value))} />
            </div>

            <button onClick={saveData}>Save</button>

            <h2>Filter by Date</h2>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            <button onClick={fetchRecords}>Filter</button>

            <h2>Records</h2>
            <ul>
                {records.map((rec, index) => (
                    <li key={index}>
                        Male: {rec.male_count}, Female: {rec.female_count}, Date: {new Date(rec.timestamp).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
