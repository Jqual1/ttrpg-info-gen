import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { tavernData } from "../data/tavern"
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import GenerateNPC from "./NPC";

export default function GenerateTavern() {
    const VERB  = 0;
    const ADJ   = 1;
    const NOUN1 = 2;
    const NOUN2 = 3;
    const COMFT = 4;

    const [tavernName, setTavernName] = useState('');
    const [comfort, setComfort] = useState('');
    const [npcs, setNPCs] = useState([]);

    useEffect(() => {
        handleTavern();
    }, []);

    useEffect(() => {
      var tavern = {tavernName: tavernName, tavernComfort: comfort}
      localStorage.setItem("tavern", JSON.stringify(tavern))
    }, [tavernName, comfort])

    function handleAddNPC(e) {
        setNPCs(prevNPCs => {
          return [...prevNPCs, <GenerateNPC />]
        })
      }

    function randomNumber(options) {
      // Get the number between 0 (inclusive) and max (exclusive) for an array
      return (Math.floor(Math.random() * (options)));
    }

    function tavernNameGen(num) {
        var variation = randomNumber(2);
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

    // Runs the Tavern Name Generator
    const handleTavernName = () => {
      setTavernName(tavernNameGen(randomNumber(4)));
    };

    // Runs the Comfort Level Generator
    const handleTavernComfort = () => {
      setComfort(tavernData[COMFT].roll[randomNumber(4)]);
    }

    // Runs all Tavern Generators
    const handleTavern = () => {
      handleTavernName();
      handleTavernComfort();
    };
  
    return (
      <div className="card">
        <h1>Tavern/Inn Generator</h1> 
        <div className="flex flex-wrap gap-3 p-fluid">
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleTavernName} />
                    <span className="p-float-label">
                        <InputText id="tavernName" value={tavernName} onChange={(e) => setTavernName(e.target.value)} />
                        <label htmlFor="tavernName">Tavern Name</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleTavernComfort}/>
                    <span className="p-float-label">
                        <InputText id="comfortLevel" value={comfort} onChange={(e) => setComfort(e.target.value)}/>
                        <label htmlFor="comfortLevel">Comfort Level</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh"/>
                    <span className="p-float-label">
                        <InputText id="x" value={""} />
                        <label htmlFor="x">x</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">{npcs}</div>
        </div>
        <br></br>
        <div className="flex flex-wrap gap-3 p-fluid">
            <div className="flex-auto">
                <Button className="p-inputgroup-addon" label="Add NPC" severity="help" onClick={handleAddNPC} />
            </div>
            <div className="flex-auto">
                <Button className="p-inputgroup-addon" label="Regenerate All" onClick={handleTavern} />
            </div>
        </div>
    </div>
    );
}