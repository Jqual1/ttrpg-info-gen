import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputNumber } from 'primereact/inputnumber';

export default function GenerateNum() {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(20);
    const [num, setNum] = useState(0);

    useEffect(() => {
        setNum(randomNumberInRange(min, max));
    }, [min, max]);

    function randomNumberInRange(min, max) {
      // 👇️ get number between min (inclusive) and max (inclusive)
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    const handleClick = () => {
      setNum(randomNumberInRange(min, max));
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
            </div>
      </div>
    );
}