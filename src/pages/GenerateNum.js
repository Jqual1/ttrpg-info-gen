import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputNumber } from 'primereact/inputnumber';

export default function GenerateNum() {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(20);
    const [num, setNum] = useState(0);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        setNum(randomNumberInRange(min, max));
    }, [min, max]);

    function randomNumberInRange(min, max) {
      // 👇️ get number between min (inclusive) and max (inclusive)
      var number = Math.floor(Math.random() * (max - min + 1)) + min;
      setHistory([].concat(number, history));
      return number;
    }
  
    const handleClick = () => {
      setNum(randomNumberInRange(min, max));
    };

    const handlePreset4 = () => {
      setNum(randomNumberInRange(1, 4));
    };
    const handlePreset6 = () => {
      setNum(randomNumberInRange(1, 6));
    };
    const handlePreset8 = () => {
      setNum(randomNumberInRange(1, 8));
    };
    const handlePreset12 = () => {
      setNum(randomNumberInRange(1, 12));
    };
    const handlePreset20 = () => {
      setNum(randomNumberInRange(1, 20));
    };
    const handlePreset100 = () => {
      setNum(randomNumberInRange(1, 100));
    };
  
    return (
      <div>
        <h1>Number Generator</h1>
        <h2>Your number is: {num}</h2>
            <div className="card flex flex-wrap gap-3 p-fluid">
                <div className="flex-auto">
                    <label htmlFor="min" className="font-bold block mb-2">Minimum Number:</label>
                    <InputNumber inputId="min" value={min} onValueChange={(e) => setMin(e.value)} />
                </div>
                <div className="flex-auto">
                    <label htmlFor="max" className="font-bold block mb-2">Maximum Number:</label>
                    <InputNumber inputId="max" value={max} onValueChange={(e) => setMax(e.value)} />
                </div>
                <Button label="New Number" onClick={handleClick} />
                <div className="flex-auto">
                  <Button label="d4" size="small" severity="help" outlined raised onClick={handlePreset4} />
                </div>
                <div className="flex-auto">
                  <Button label="d6" size="small" severity="help" outlined raised onClick={handlePreset6} />
                </div>
                <div className="flex-auto">
                  <Button label="d8" size="small" severity="help" outlined raised onClick={handlePreset8} />
                </div>
                <div className="flex-auto">
                  <Button label="d12" size="small" severity="help" outlined raised onClick={handlePreset12} />
                </div>
                <div className="flex-auto">
                  <Button label="d20" size="small" severity="help" outlined raised onClick={handlePreset20} />
                </div>
                <div className="flex-auto">
                  <Button label="d100" size="small" severity="help" outlined raised onClick={handlePreset100} />
                </div>
            </div>

            {/* TODO Currently prints the numbers right after eachother with no space or formatting, need to format */}
            history = {history} 

      </div>
    );
}