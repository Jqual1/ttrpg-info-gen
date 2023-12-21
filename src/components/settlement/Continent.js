import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { settlementData } from "../../data/settlement"
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Panel } from "primereact/panel";
import GenerateNation from "./Nation";
import GenerateSettlement from "./Settlement";
import GenerateShop from "../Shop";
import GenerateTavern from "../Tavern";
import GenerateNPC from "../NPC";

export default function GenerateContinent(props) {
    const NAME1         = 0;
    const NAME2         = 1;
    const SIZE          = 22;
    const LOCATION      = 23;
    const CLIMATES      = 24;
    const UNIQUE        = 25;
    const DISCOVERY     = 26;
    const DISCOVERER    = 27;
    const D_CREATURES   = 28;
    const I_CREATURES   = 29;
    const D_PLANTS      = 30;
    const I_PLANTS      = 31;
    const MINERAL       = 42;
    const CATACLYSM     = 44;
    const LAND_TYPE     = 45;

    const parent = props.props.parent;
    const key = `${props.props.parent}_${props.props.key}`;
    // Settlement Variables the user will see
    const [name, setName] = useState('');
    const [size, setSize] = useState('');
    const [location, setLocation] = useState('');
    const [climates, setClimates] = useState('');
    const [unique, setUnique] = useState('');
    const [discovery, setDiscovery] = useState('');
    const [discoverer, setDiscoverer] = useState('');
    const [dCreatures, setDCreatures] = useState('');
    const [iCreatures, setICreatures] = useState('');
    const [dPlants, setDPlants] = useState('');
    const [iPlants, setIPlants] = useState('');
    const [notes, setNotes] = useState('');
    // Settlement "Children" Stuff (NPCs)
    const [numCurr, setNumCurr] = useState(1);
    const [gens, setGens] = useState([]);
    const [children, setChildren] = useState([]);

    useEffect(() => {
        handleContinent();
    }, []);

    useEffect(() => {
      handleMakeJSON();
    }, [name, size, location, climates, unique, discovery, discoverer, dCreatures, iCreatures, dPlants, iPlants, notes, children])

    // Makes and Adds JSON to sessionStorage
    const handleMakeJSON = () => {
      var json = {
        parent:         parent,
        children:       children,
        type:           'continent',
        name:           name,
        size:           size,
        location:       location,
        climates:       climates,
        unique:         unique,
        discovery:      discovery,
        discoverer:     discoverer,
        dCreatures:     dCreatures,
        iCreatures:     iCreatures,
        dPlants:        dPlants,
        iPlants:        iPlants,
        notes:          notes,
      }
      sessionStorage.setItem(key, JSON.stringify(json))
  }

  function handleAddNation(e) {
    var genKey = "nation" + numCurr;
    var currGen = {parent: key, key: genKey, handleRemove: handleRemoveChild}
    setNumCurr(numCurr+1);
    setChildren(prevChildren => {
      return [...prevChildren, `${key}_${genKey}`]
    })
    setGens(prevGens => {
      return [...prevGens, <GenerateNation key={`${key}_${genKey}`} props={currGen} />]
    })
    }

  function handleAddSettlement(e) {
    var genKey = "settlement" + numCurr;
    var currGen = {parent: key, key: genKey, handleRemove: handleRemoveChild}
    setNumCurr(numCurr+1);
    setChildren(prevChildren => {
      return [...prevChildren, `${key}_${genKey}`]
    })
    setGens(prevGens => {
      return [...prevGens, <GenerateSettlement key={`${key}_${genKey}`} props={currGen} />]
    })
    }

  function handleAddShop(e) {
    var genKey = "shop" + numCurr;
    var currGen = {parent: key, key: genKey, handleRemove: handleRemoveChild}
    setNumCurr(numCurr+1);
    setChildren(prevChildren => {
      return [...prevChildren, `${key}_${genKey}`]
    })
    setGens(prevGens => {
      return [...prevGens, <GenerateShop key={`${key}_${genKey}`} props={currGen} />]
    })
    }

    function handleAddTavern(e) {
        var genKey = "tavern" + numCurr;
        var currGen = {parent: key, key: genKey, handleRemove: handleRemoveChild}
        setNumCurr(numCurr+1);
        setChildren(prevChildren => {
          return [...prevChildren, `${key}_${genKey}`]
        })
        setGens(prevGens => {
          return [...prevGens, <GenerateTavern key={`${key}_${genKey}`} props={currGen} />]
        })
        }

    function handleAddNPC(e) {
      var genKey = "npc" + numCurr;
      var currGen = {parent: key, key: genKey, handleRemove: handleRemoveChild}
      setNumCurr(numCurr+1);
      setChildren(prevChildren => {
        return [...prevChildren, `${key}_${genKey}`]
      })
      setGens(prevGens => {
        return [...prevGens, <GenerateNPC key={`${key}_${genKey}`} props={currGen} />]
      })
      }

    function randomNumber(options) {
      // Get the number between 0 (inclusive) and max (exclusive) for an array
      return (Math.floor(Math.random() * (options)));
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

    // Runs the Continent Name Generator
    const handleName = () => {
      setName(settlementData[NAME1].roll[randomNumber(settlementData[NAME1].roll.length)] +
              settlementData[NAME2].roll[randomNumber(settlementData[NAME2].roll.length)]);
    }

    const handleSize = () => {
        setSize(settlementData[SIZE].roll[randomNumber(settlementData[SIZE].roll.length)]);
      }

    const handleLocation = () => {
        setLocation(settlementData[LOCATION].roll[randomNumber(settlementData[LOCATION].roll.length)]);
      }
      
    const handleClimates = () => {
        setClimates(settlementData[CLIMATES].roll[randomNumber(settlementData[CLIMATES].roll.length)]);
      }
      
    const handleUnique = () => {
      var num = randomNumber(settlementData[UNIQUE].roll.length);
      if (num === 0) {
        setUnique("It is the only place to find the rare mineral " + settlementData[MINERAL].roll[randomNumber(settlementData[MINERAL].roll.length)]);
      } else if (num === 1) {
        setUnique(settlementData[CATACLYSM].roll[randomNumber(settlementData[CATACLYSM].roll.length)]);
      } else if (num === 2) {
        setUnique("It is dominated by " + settlementData[LAND_TYPE].roll[randomNumber(settlementData[LAND_TYPE].roll.length)]);
      } else {
        setUnique(settlementData[UNIQUE].roll[num]);
      }
      }
      
    const handleDiscovery = () => {
        setDiscovery(settlementData[DISCOVERY].roll[randomNumber(settlementData[DISCOVERY].roll.length)]);
      }
      
    const handleDiscoverer = () => {
        setDiscoverer(settlementData[DISCOVERER].roll[randomNumber(settlementData[DISCOVERER].roll.length)]);
      }
      
    const handleDCreatures = () => {
        setDCreatures(settlementData[D_CREATURES].roll[randomNumber(settlementData[D_CREATURES].roll.length)]);
      }
      
    const handleICreatures = () => {
        setICreatures(settlementData[I_CREATURES].roll[randomNumber(settlementData[I_CREATURES].roll.length)]);
      }
      
    const handleDPlants = () => {
        setDPlants(settlementData[D_PLANTS].roll[randomNumber(settlementData[D_PLANTS].roll.length)]);
      }
      
    const handleIPlants = () => {
        setIPlants(settlementData[I_PLANTS].roll[randomNumber(settlementData[I_PLANTS].roll.length)]);
      }

    // Runs all Continent Generators
    const handleContinent = () => {
      handleName();
      handleSize();
      handleLocation();
      handleClimates();
      handleUnique();
      handleDiscovery();
      handleDiscoverer();
      handleDCreatures();
      handleICreatures();
      handleDPlants();
      handleIPlants();
    };
  
    return (
      <Panel header={name + " (Continent Generator)"} >
        <div className="flex flex-wrap gap-3 p-fluid">
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleName} />
                    <span className="p-float-label">
                        <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="name">Continent Name</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleLocation} />
                    <span className="p-float-label">
                        <InputText id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                        <label htmlFor="location">Location</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleClimates} />
                    <span className="p-float-label">
                        <InputText id="climates" value={climates} onChange={(e) => setClimates(e.target.value)} />
                        <label htmlFor="climates">Climates</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleDCreatures} />
                    <span className="p-float-label">
                        <InputText id="dCreatures" value={dCreatures} onChange={(e) => setDCreatures(e.target.value)} />
                        <label htmlFor="dCreatures">Domestic Creatures</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleICreatures} />
                    <span className="p-float-label">
                        <InputText id="iCreatures" value={iCreatures} onChange={(e) => setICreatures(e.target.value)} />
                        <label htmlFor="iCreatures">Imported Creatures</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleDPlants} />
                    <span className="p-float-label">
                        <InputText id="dPlants" value={dPlants} onChange={(e) => setDPlants(e.target.value)} />
                        <label htmlFor="dPlants">Domestic Plants</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleIPlants} />
                    <span className="p-float-label">
                        <InputText id="iPlants" value={iPlants} onChange={(e) => setIPlants(e.target.value)} />
                        <label htmlFor="iPlants">Imported Plants</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleSize} />
                    <span className="p-float-label">
                        <InputTextarea id="size" value={size} onChange={(e) => setSize(e.target.value)} />
                        <label htmlFor="size">Size</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleUnique} />
                    <span className="p-float-label">
                        <InputTextarea id="unique" value={unique} onChange={(e) => setUnique(e.target.value)} />
                        <label htmlFor="unique">Unique</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleDiscovery} />
                    <span className="p-float-label">
                        <InputTextarea id="discovery" value={discovery} onChange={(e) => setDiscovery(e.target.value)} />
                        <label htmlFor="discovery">Discovery</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleDiscoverer} />
                    <span className="p-float-label">
                        <InputTextarea id="discoverer" value={discoverer} onChange={(e) => setDiscoverer(e.target.value)} />
                        <label htmlFor="discoverer">Discoverer</label>
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
                <Button className="p-inputgroup-addon" label="Add Nation" severity="help" onClick={handleAddNation} />
            </div>
            <div className="flex-auto">
                <Button className="p-inputgroup-addon" label="Add Settlement" severity="info" onClick={handleAddSettlement} />
            </div>
            <div className="flex-auto">
                <Button className="p-inputgroup-addon" label="Add Shop" onClick={handleAddShop} />
            </div>
            <div className="flex-auto">
                <Button className="p-inputgroup-addon" label="Add Tavern" onClick={handleAddTavern} />
            </div>
            <div className="flex-auto">
                <Button className="p-inputgroup-addon" label="Add NPC" severity="help" onClick={handleAddNPC} />
            </div>
            <div className="flex-auto">
                <Button className="p-inputgroup-addon" label="Regenerate Continent" onClick={handleContinent} />
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