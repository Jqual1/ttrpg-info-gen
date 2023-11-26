import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { npcData } from "../data/npcs"
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

export default function GenerateNPC(props) {
    const FIRST         = 0;
    const LAST          = 1;
    const PERSONALITY   = 2;
    const RACE          = 3;
    const HAIRCOLOR     = 4;
    const EYECOLOR      = 5;
    const EYETYPE       = 6;
    const EARTYPE       = 7;
    const MOUTHTYPE     = 8;
    const NOSETYPE      = 9;
    const JAWTYPE       = 10;
    const HAIRTYPE      = 11;
    const HEIGHT        = 13;
    const BODYTYPE      = 14;

    const parent = props.props.parent;
    const key = `${props.props.parent}_${props.props.key}`;
    // NPC Variables the user will see
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [personality, setPersonality] = useState('');
    const [race, setRace] = useState('');
    const [hairColor, setHairColor] = useState('');
    const [eyeColor, setEyeColor] = useState('');
    const [eyeType, setEyeType] = useState('');
    const [earType, setEarType] = useState('');
    const [mouthType, setMouthType] = useState('');
    const [noseType, setNoseType] = useState('');
    const [jawType, setJawType] = useState('');
    const [hairType, setHairType] = useState('');
    const [height, setHeight] = useState('');
    const [bodyType, setBodyType] = useState('');

    
    useEffect(() => {
        handleNPC();
    }, []);

    useEffect(() => {
        handleMakeJSON();
    }, [firstName, lastName, personality, race, hairColor, eyeColor,
        eyeType, earType, mouthType, noseType, jawType, hairType, height, bodyType])

    function randomNumber(options) {
      // Get the number between 0 (inclusive) and max (exclusive) for an array
      return (Math.floor(Math.random() * (options)));
    }

    const handleMakeJSON = () => {
        const json = {
            parent:         parent,
            type:           'npc',
            firstName:      firstName,
            lastName:       lastName,
            personality:    personality,
            race:           race,
            hairColor:      hairColor,
            eyeColor:       eyeColor,
            eyeType:        eyeType,
            earType:        earType,
            mouthType:      mouthType,
            noseType:       noseType,
            jawType:        jawType,
            hairType:       hairType,
            height:         height,
            bodyType:       bodyType,
        }
        sessionStorage.setItem(key, JSON.stringify(json));
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

    // Runs the Race Gen
    const handleRace = () => {
        setRace(npcData[RACE].roll[randomNumber(npcData[RACE].roll.length)]);
    }

    // Runs the Hair Color Gen
    const handleHairColor = () => {
        setHairColor(npcData[HAIRCOLOR].roll[randomNumber(npcData[HAIRCOLOR].roll.length)]);
      }

    // Runs the Eye Color Gen
    const handleEyeColor = () => {
        setEyeColor(npcData[EYECOLOR].roll[randomNumber(npcData[EYECOLOR].roll.length)]);
      }

    // Runs the Eye Type Gen
    const handleEyeType = () => {
        setEyeType(npcData[EYETYPE].roll[randomNumber(npcData[EYETYPE].roll.length)]);
      }

    // Runs the Ear Type Gen
    const handleEarType = () => {
        setEarType(npcData[EARTYPE].roll[randomNumber(npcData[EARTYPE].roll.length)]);
      }

    // Runs the Mouth Type Gen
    const handleMouthType = () => {
        setMouthType(npcData[MOUTHTYPE].roll[randomNumber(npcData[MOUTHTYPE].roll.length)]);
      }
    
    // Runs the Nose Type Gen
    const handleNoseType = () => {
        setNoseType(npcData[NOSETYPE].roll[randomNumber(npcData[NOSETYPE].roll.length)]);
      }
    
    // Runs the Jaw Type Gen 
    const handleJawType = () => {
        setJawType(npcData[JAWTYPE].roll[randomNumber(npcData[JAWTYPE].roll.length)]);
      }
      
    // Runs the Hair Type Gen
    const handleHairType = () => {
        setHairType(npcData[HAIRTYPE].roll[randomNumber(npcData[HAIRTYPE].roll.length)]);
      }
      
    // Runs the Height Gen
    const handleHeight = () => {
        setHeight(npcData[HEIGHT].roll[randomNumber(npcData[HEIGHT].roll.length)]);
      }
      
    // Runs the Body Type Gen 
    const handleBodyType = () => {
        setBodyType(npcData[BODYTYPE].roll[randomNumber(npcData[BODYTYPE].roll.length)]);
      }

    // Runs all NPC Generators
    const handleNPC = () => {
        handleFirstName();
        handleLastName();
        handlePersonality();
        handleRace();
        handleHairColor();
        handleHairType();
        handleEyeColor();
        handleEyeType();
        handleEarType();
        handleMouthType();
        handleNoseType();
        handleJawType();
        handleHeight();
        handleBodyType();
    };
  
    return (
    <div>
        <h3>NPC Generator</h3>
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
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleRace}/>
                    <span className="p-float-label">
                        <InputText id="race" value={race} onChange={(e) => setRace(e.target.value)} />
                        <label htmlFor="race">Race</label>
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
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleHairColor}/>
                    <span className="p-float-label">
                        <InputText id="haircolor" value={hairColor} onChange={(e) => setHairColor(e.target.value)} />
                        <label htmlFor="haircolor">Hair Color</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleHairType}/>
                    <span className="p-float-label">
                        <InputText id="hairtype" value={hairType} onChange={(e) => setHairType(e.target.value)} />
                        <label htmlFor="hairtype">Hair Type</label>
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
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleEyeType}/>
                    <span className="p-float-label">
                        <InputText id="eyetype" value={eyeType} onChange={(e) => setEyeType(e.target.value)} />
                        <label htmlFor="eyetype">Eye Type</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleEarType}/>
                    <span className="p-float-label">
                        <InputText id="eartype" value={earType} onChange={(e) => setEarType(e.target.value)} />
                        <label htmlFor="eartype">Ear Type</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleMouthType}/>
                    <span className="p-float-label">
                        <InputText id="mouthtype" value={mouthType} onChange={(e) => setMouthType(e.target.value)} />
                        <label htmlFor="mouthtype">Mouth Type</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleNoseType}/>
                    <span className="p-float-label">
                        <InputText id="nosetype" value={noseType} onChange={(e) => setNoseType(e.target.value)} />
                        <label htmlFor="nosetype">Nose Type</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleJawType}/>
                    <span className="p-float-label">
                        <InputText id="jawtype" value={jawType} onChange={(e) => setJawType(e.target.value)} />
                        <label htmlFor="jawtype">Jaw Type</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleHeight}/>
                    <span className="p-float-label">
                        <InputText id="height" value={height} onChange={(e) => setHeight(e.target.value)} />
                        <label htmlFor="height">Height</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleBodyType}/>
                    <span className="p-float-label">
                        <InputText id="bodytype" value={bodyType} onChange={(e) => setBodyType(e.target.value)} />
                        <label htmlFor="bodytype">Body Type</label>
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