import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { npcData } from "../data/npcs"
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

export default function GenerateNPC() {
    const FIRST         = 0;
    const LAST          = 1;
    const PERSONALITY   = 2;
    const RACE          = 3;
    const HAIRCOLOR     = 4;
    const EYECOLOR      = 5;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [personality, setPersonality] = useState('');
    const [race, setRace] = useState('');
    const [hairColor, setHairColor] = useState('');
    const [eyeColor, setEyeColor] = useState('');
    
    useEffect(() => {
        handleNPC();
    }, []);

    function randomNumber(options) {
      // Get the number between 0 (inclusive) and max (exclusive) for an array
      return (Math.floor(Math.random() * (options)));
    }

    const handleMakeJSON = () => {
        const json = {
            firstName:      firstName,
            lastName:       lastName,
            personality:    personality,
            race:           race,
            hairColor:      hairColor,
            eyeColor:       eyeColor
        }
        return json;
    }

    // Runs the First Name Gen
    const handleFirstName = () => {
        setFirstName(npcData[FIRST].roll[randomNumber(npcData[FIRST].roll.length)]);
      }

    // Runs the Last Name Gen
    const handleLastName = () => {
        setLastName(npcData[LAST].roll[randomNumber(npcData[LAST].roll.length)]);
      }

    // Runs the Personality Gen
    const handlePersonality = () => {
        setPersonality(npcData[PERSONALITY].roll[randomNumber(npcData[PERSONALITY].roll.length)]);
      }

    // Runs the First Name Gen
    const handleRace = () => {
        setRace(npcData[RACE].roll[randomNumber(npcData[RACE].roll.length)]);
    }

    // Runs the First Name Gen
    const handleHairColor = () => {
        setHairColor(npcData[HAIRCOLOR].roll[randomNumber(npcData[HAIRCOLOR].roll.length)]);
      }

    // Runs the First Name Gen
    const handleEyeColor = () => {
        setEyeColor(npcData[EYECOLOR].roll[randomNumber(npcData[EYECOLOR].roll.length)]);
      }

    // Runs all NPC Generators
    const handleNPC = () => {
        handleFirstName();
        handleLastName();
        handlePersonality();
        handleRace();
        handleHairColor();
        handleEyeColor();
    };
  
    return (
      <div>
        <h2>NPC Generator</h2>
        <div className="flex flex-wrap gap-3 p-fluid">
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleFirstName}/>
                    <span className="p-float-label">
                        <InputText id="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <label htmlFor="firstname">First Name</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleLastName}/>
                    <span className="p-float-label">
                        <InputText id="surname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <label htmlFor="surname">Surname</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handlePersonality}/>
                    <span className="p-float-label">
                        <InputText id="personality" value={personality} onChange={(e) => setPersonality(e.target.value)} />
                        <label htmlFor="personality">Personality</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleRace}/>
                    <span className="p-float-label">
                        <InputText id="race" value={race} onChange={(e) => setRace(e.target.value)} />
                        <label htmlFor="race">Race</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleHairColor}/>
                    <span className="p-float-label">
                        <InputText id="haircolor" value={hairColor} onChange={(e) => setHairColor(e.target.value)} />
                        <label htmlFor="haircolor">Hair Color</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleEyeColor}/>
                    <span className="p-float-label">
                        <InputText id="eyecolor" value={eyeColor} onChange={(e) => setEyeColor(e.target.value)} />
                        <label htmlFor="eyecolor">Eye Color</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <Button className="p-inputgroup-addon" label="Regenerate NPC" severity="help" onClick={handleNPC} />
            </div>
        </div>
      </div>
    );
}