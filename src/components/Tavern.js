import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { tavernData } from "../data/tavern"
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Panel } from "primereact/panel";
import GenerateNPC from "./NPC";

export default function GenerateTavern(props) {
    const VERB      = 0;
    const ADJ       = 1;
    const NOUN1     = 2;
    const NOUN2     = 3;
    const COMFT     = 4;
    const EVENT     = 5;
    const ENTERTAIN = 6;
    const PATRON    = 7;
    const COCKTAIL  = 8;
    const TROUBLE   = 9;
    const NOTABLE   = 10;

    const parent = props.props.parent;
    const key = `${props.props.parent}_${props.props.key}`;
    // Tavern Variables the user will see
    const [tavernName, setTavernName] = useState('');
    const [comfort, setComfort] = useState('');
    const [event, setEvent] = useState('');
    const [entertainment, setEntertainment] = useState('');
    const [patron, setPatron] = useState('');
    const [cocktail, setCocktail] = useState('');
    const [trouble, setTrouble] = useState('');
    const [notable, setNotable] = useState('');
    const [notes, setNotes] = useState('');
    // Tavern "Children" Stuff (NPCs)
    const [numCurr, setNumCurr] = useState(1);
    const [gens, setGens] = useState([]);
    const [children, setChildren] = useState([]);

    useEffect(() => {
        handleTavern();
    }, []);

    useEffect(() => {
      handleMakeJSON();
    }, [tavernName, comfort, event, entertainment, patron, cocktail, trouble, notable, notes, children])

    // Makes and Adds JSON to sessionStorage
    const handleMakeJSON = () => {
      var json = {
        parent:         parent,
        children:       children,
        type:           'tavern',
        tavernName:     tavernName, 
        tavernComfort:  comfort,
        event:          event,
        entertainment:  entertainment,
        patron:         patron,
        cocktail:       cocktail,
        trouble:        trouble,
        notable:        notable,
        notes:          notes
      }
      sessionStorage.setItem(key, JSON.stringify(json))
  }

  // Handle Remove of This Gen
  const handleRemoveThis = () => {
    props.props.handleRemove(key);
  }

  // Handle Removal of childGen
  function handleRemoveChild(key) { 
    setGens(current => current.filter(gen => gen.key !== key));
    setChildren(current => current.filter(child => child !== key));
    sessionStorage.removeItem(key);
   }

   function handleAddNPC(e) {
    setNumCurr(numCurr+1);
    var genKey = "npc" + numCurr;
    var currGen = {parent: key, key: genKey, handleRemove: handleRemoveChild}
    setChildren(prevChildren => {
      return [...prevChildren, `${key}_${genKey}`]
    })
    setGens(prevNPCs => {
      return [...prevNPCs, <GenerateNPC key={`${key}_${genKey}`} props={currGen} />]
    })
    }

    function randomNumber(options) {
      // Get the number between 0 (inclusive) and max (exclusive) for an array
      return (Math.floor(Math.random() * (options)));
    }

    function tavernNameGen(num) {
        var variation = randomNumber(2);
        if (num === 0) {
            return("The " + tavernData[ADJ].roll[randomNumber(tavernData[ADJ].roll.length)] + 
                  " " + tavernData[NOUN1].roll[randomNumber(tavernData[NOUN1].roll.length)])
          }
          if (num === 1) {
            if (variation === 0) {
                return("The " + tavernData[NOUN1].roll[randomNumber(tavernData[NOUN1].roll.length)] + 
                      " and " + tavernData[NOUN1].roll[randomNumber(tavernData[NOUN1].roll.length)]);
            }
            if (variation === 1) {
                return("The " + tavernData[NOUN1].roll[randomNumber(tavernData[NOUN1].roll.length)] + 
                      " and the " + tavernData[NOUN1].roll[randomNumber(tavernData[NOUN1].roll.length)]);
            }
          }
          if (num === 2) {
            if (variation === 0) {
                return("The " + tavernData[NOUN1].roll[randomNumber(tavernData[NOUN1].roll.length)] + 
                      "'s " + tavernData[NOUN2].roll[randomNumber(tavernData[NOUN2].roll.length)]);
            }
            if (variation === 1) {
                return("The " + tavernData[NOUN1].roll[randomNumber(tavernData[NOUN1].roll.length)] + 
                      " and the " + tavernData[NOUN2].roll[randomNumber(tavernData[NOUN2].roll.length)]);
            }
          }
          if (num === 3) {
            return("The " + tavernData[VERB].roll[randomNumber(tavernData[VERB].roll.length)] + 
                  " " + tavernData[NOUN1].roll[randomNumber(tavernData[NOUN1].roll.length)]);
          }
    }

    // Runs the Tavern Name Generator
    const handleTavernName = () => {
      // Sets the Tavern Name based on the return of the tavernNameGen function
      //   This requires a number input of 0-3 to decide which name format it will use
      setTavernName(tavernNameGen(randomNumber(4)));
    };

    // Runs the Comfort Level Generator
    const handleTavernComfort = () => {
      setComfort(tavernData[COMFT].roll[randomNumber(tavernData[COMFT].roll.length)]);
    }

    // Runs the Event Generator
    const handleEvent = () => {
      setEvent(tavernData[EVENT].roll[randomNumber(tavernData[EVENT].roll.length)]);
    }

    // Runs the Entertainment Generator
    const handleEntertainment = () => {
      setEntertainment(tavernData[ENTERTAIN].roll[randomNumber(tavernData[ENTERTAIN].roll.length)]);
    }

    // Runs the Patron Generator
    const handlePatron = () => {
      setPatron(tavernData[PATRON].roll[randomNumber(tavernData[PATRON].roll.length)]);
    }

    // Runs the Cocktail Generator
    const handleCocktail = () => {
      setCocktail(tavernData[COCKTAIL].roll[randomNumber(tavernData[COCKTAIL].roll.length)]);
    }

    // Runs the Trouble Generator
    const handleTrouble = () => {
      setTrouble(tavernData[TROUBLE].roll[randomNumber(tavernData[TROUBLE].roll.length)]);
    }

    // Runs the Notable Generator
    const handleNotable = () => {
      setNotable(tavernData[NOTABLE].roll[randomNumber(tavernData[NOTABLE].roll.length)]);
    }

    // Runs all Tavern Generators
    const handleTavern = () => {
      handleTavernName();
      handleTavernComfort();
      handleEvent();
      handleEntertainment();
      handlePatron();
      handleCocktail();
      handleTrouble();
      handleNotable();
    };
  
    return (
      <Panel header={tavernName + " (Tavern/Inn Generator)"} >
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
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleEvent}/>
                    <span className="p-float-label">
                        <InputTextarea id="event" value={event} onChange={(e) => setEvent(e.target.value)} />
                        <label htmlFor="event">Event</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleEntertainment}/>
                    <span className="p-float-label">
                        <InputTextarea id="entertainment" value={entertainment} onChange={(e) => setEntertainment(e.target.value)} />
                        <label htmlFor="entertainment">Entertainment</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handlePatron}/>
                    <span className="p-float-label">
                        <InputTextarea id="patron" value={patron} onChange={(e) => setPatron(e.target.value)} />
                        <label htmlFor="patron">Patron</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleCocktail}/>
                    <span className="p-float-label">
                        <InputTextarea id="cocktail" value={cocktail} onChange={(e) => setCocktail(e.target.value)} />
                        <label htmlFor="cocktail">Cocktail</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleTrouble}/>
                    <span className="p-float-label">
                        <InputTextarea id="trouble" value={trouble} onChange={(e) => setTrouble(e.target.value)} />
                        <label htmlFor="trouble">Trouble</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleNotable}/>
                    <span className="p-float-label">
                        <InputTextarea id="notable" value={notable} onChange={(e) => setNotable(e.target.value)} />
                        <label htmlFor="notable">Notable</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <span className="p-float-label">
                        <InputTextarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
                        <label htmlFor="notes">Notes</label>
                    </span>
                </div>
            </div>
        </div>
        <br></br>
        <div className="flex flex-wrap gap-3 p-fluid">
            <div className="flex-auto">
                <Button className="p-inputgroup-addon" label="Add NPC" severity="help" onClick={handleAddNPC} />
            </div>
            <div className="flex-auto">
                <Button className="p-inputgroup-addon" label="Regenerate Tavern" onClick={handleTavern} />
            </div>
            <div className="flex-auto">
              <Button className="p-inputgroup-addon" label="Remove Gen" severity="danger" onClick={handleRemoveThis} />
            </div>
        </div>
        <br></br>
            <div className="flex-auto">{gens}</div>
    </Panel>
    );
}