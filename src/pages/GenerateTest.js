import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { tavernData } from "../data/tavern"
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

export default function GenerateTest() {
    const VERB  = 0;
    const ADJ   = 1;
    const NOUN1 = 2;
    const NOUN2 = 3;

    const [tavernName, setTavernName] = useState('');

    function randomNumber(options) {
      // 👇️ get number between 0 (inclusive) and max (exclusive) for an array
      return (Math.floor(Math.random() * (options)));
    }

    function tavernNameGen(num) {
        var variation = randomNumber(2);
        console.log(tavernData);
        if (num === 0) {
            return("The " + tavernData[ADJ].roll[randomNumber(100)] + " " + tavernData[NOUN1].roll[randomNumber(100)])
          }
          if (num === 1) {
            if (variation === 0) {
                return("The " + tavernData[NOUN1].roll[randomNumber(100)] + " and " + tavernData[NOUN1].roll[randomNumber(100)]);
            }
            if (variation === 1) {
                return("The " + tavernData[NOUN1].roll[randomNumber(100)] + " and the " + tavernData[NOUN1].roll[randomNumber(100)]);
            }
          }
          if (num === 2) {
            if (variation === 0) {
                return("The " + tavernData[NOUN1].roll[randomNumber(100)] + "'s " + tavernData[NOUN2].roll[randomNumber(100)]);
            }
            if (variation === 1) {
                return("The " + tavernData[NOUN1].roll[randomNumber(100)] + " and the " + tavernData[NOUN2].roll[randomNumber(100)]);
            }
          }
          if (num === 3) {
            return("The " + tavernData[VERB].roll[randomNumber(100)] + " " + tavernData[NOUN1].roll[randomNumber(100)]);
          }
    }
  
    const handleClick = () => {
      setTavernName(tavernNameGen(randomNumber(4)));
    };
  
    return (
      <div>
        <h1>Tavern Generator</h1>
            <div className="card flex flex-wrap gap-3 p-fluid">
                <div className="flex-auto">
                    <div className="p-inputgroup">
                        <Button className="p-inputgroup-addon" icon="pi pi-refresh" ariel-label="New Name" onClick={handleClick} />
                        <InputText id="tavernName" placeholder="Tavern Name" value={tavernName} onChange={(e) => setTavernName(e.target.value)} />
                    </div>
                </div>
                <div className="flex-auto">
                    <div className="p-inputgroup">
                        <Button className="p-inputgroup-addon" icon="pi pi-refresh" ariel-label="New Name" />
                        <InputText placeholder="Tavern Placeholder" />
                    </div>
                </div>
                <Button className="p-inputgroup-addon" label="Regenerate All" onClick={handleClick} />
            </div>
      </div>
    );
}