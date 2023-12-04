import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { settlementData } from "../data/settlement"
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Panel } from "primereact/panel";
import GenerateContinent from "../components/Continent";
import GenerateNation from "../components/Nation";
import GenerateSettlement from "../components/Settlement";
import GenerateShop from "./Shop";
import GenerateTavern from "./Tavern";
import GenerateNPC from "./NPC";

export default function GenerateWorld(props) {
    const NAME1       = 0;
    const NAME2       = 1;
    const SIZE        = 32;
    const CLIMATE     = 33;
    const LAND_MASSES = 34;
    const MAGIC       = 35;
    const TECHNOLOGY  = 36;
    const UNIQUE      = 37;
    const DOMINATED   = 38;
    const NAT_RACES   = 39;
    const CATACLYSM   = 40;
    const CREATION    = 41;
    const MINERAL     = 43;
    const SUN_COLOR   = 46;
    const SPECIES     = 47;
    const PLANE       = 48;
    const EXPERIMENT  = 49;

    const parent = props.props.parent;
    const key = `${props.props.parent}_${props.props.key}`;
    // Settlement Variables the user will see
    const [name, setName] = useState('');
    const [size, setSize] = useState('');
    const [climate, setClimate] = useState('');
    const [landMasses, setLandMasses] = useState('');
    const [magic, setMagic] = useState('');
    const [technology, setTechnology] = useState('');
    const [unique, setUnique] = useState('');
    const [dominated, setDominated] = useState('');
    const [natRaces, setNatRaces] = useState('');
    const [cataclysm, setCataclysm] = useState('');
    const [creation, setCreation] = useState('');
    const [notes, setNotes] = useState('')
    // Settlement "Children" Stuff (NPCs)
    const [numCurr, setNumCurr] = useState(1);
    const [gens, setGens] = useState([]);
    const [children, setChildren] = useState([]);

    useEffect(() => {
        handleSettlement();
    }, []);

    useEffect(() => {
      handleMakeJSON();
    }, [name, size, climate, landMasses, magic, technology, unique, dominated, natRaces, cataclysm, creation, notes, children])

    // Makes and Adds JSON to sessionStorage
    const handleMakeJSON = () => {
      var json = {
        parent:         parent,
        children:       children,
        type:           'world',
        name:           name,
        size:           size,
        climate:        climate,
        landMasses:     landMasses,
        magic:          magic,
        technology:     technology,
        unique:         unique,
        dominated:      dominated,
        natRaces:       natRaces,
        cataclysm:      cataclysm,
        creation:       creation,
        notes:          notes
      }
      sessionStorage.setItem(key, JSON.stringify(json))
  }

  function handleAddContinent(e) {
    var genKey = "continent" + numCurr;
    var currGen = {parent: key, key: genKey, handleRemove: handleRemoveChild}
    setNumCurr(numCurr+1);
    setChildren(prevChildren => {
      return [...prevChildren, `${key}_${genKey}`]
    })
    setGens(prevGens => {
      return [...prevGens, <GenerateContinent key={`${key}_${genKey}`} props={currGen} />]
    })
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

    // Runs the World Name Generator
    const handleName = () => {
      setName(settlementData[NAME1].roll[randomNumber(settlementData[NAME1].roll.length)] +
              settlementData[NAME2].roll[randomNumber(settlementData[NAME2].roll.length)]);
    }

    const handleSize = () => {
      setSize(settlementData[SIZE].roll[randomNumber(settlementData[SIZE].roll.length)]);
    }
    
    const handleClimate = () => {
      setClimate(settlementData[CLIMATE].roll[randomNumber(settlementData[CLIMATE].roll.length)]);
    }
    
    const handleLandMasses = () => {
      setLandMasses(settlementData[LAND_MASSES].roll[randomNumber(settlementData[LAND_MASSES].roll.length)]);
    }
    
    const handleMagic = () => {
      setMagic(settlementData[MAGIC].roll[randomNumber(settlementData[MAGIC].roll.length)]);
    }
    
    const handleTechnology = () => {
      setTechnology(settlementData[TECHNOLOGY].roll[randomNumber(settlementData[TECHNOLOGY].roll.length)]);
    }
    
    const handleUnique = () => {
      var num = randomNumber(settlementData[UNIQUE].roll.length);
      if (num === 0) {
        setUnique("The sun is " + settlementData[SUN_COLOR].roll[randomNumber(settlementData[SUN_COLOR].roll.length)]);
      } else if (num === 1) {
        setUnique("There is an over-abundance of " + settlementData[MINERAL].roll[randomNumber(settlementData[MINERAL].roll.length)]);
      } else if (num === 2) {
        setUnique("There is an scarcity of " + settlementData[MINERAL].roll[randomNumber(settlementData[MINERAL].roll.length)]);
      } else {
        setUnique(settlementData[UNIQUE].roll[num]);
      }
    }
    
    const handleDominated = () => {
      setDominated(settlementData[DOMINATED].roll[randomNumber(settlementData[DOMINATED].roll.length)]);
    }
    
    const handleNatRaces = () => {
      setNatRaces(settlementData[NAT_RACES].roll[randomNumber(settlementData[NAT_RACES].roll.length)]);
    }
    
    const handleCataclysm = () => {
      var num = randomNumber(settlementData[CATACLYSM].roll.length);
      if (num === 0) {
        setCataclysm(settlementData[SPECIES].roll[randomNumber(settlementData[SPECIES].roll.length)] + " tried to take over the world.");
      } else if (num === 1) {
        setCataclysm("The material plane crossed with " + settlementData[PLANE].roll[randomNumber(settlementData[PLANE].roll.length)] +
        " causing the planes to bleed into each other.");
      } else {
        setCataclysm(settlementData[CATACLYSM].roll[num]);
      }
    }
    
    const handleCreation = () => {
      var num = randomNumber(settlementData[CREATION].roll.length)
      if (num === 0) {
        setCreation("It was created as one of many experiments by a council of gods trying to discover " +
        settlementData[EXPERIMENT].roll[randomNumber(settlementData[EXPERIMENT].roll.length)]);
      } else {
        setCreation(settlementData[CREATION].roll[num]);
      }
    }

    // Runs all Settlement Generators
    const handleSettlement = () => {
      handleName();
      handleSize();
      handleClimate();
      handleLandMasses();
      handleMagic();
      handleTechnology();
      handleUnique();
      handleDominated();
      handleNatRaces();
      handleCataclysm();
      handleCreation();
    };
  
    return (
      <Panel header={name + " (World Generator)"} >
        <div className="flex flex-wrap gap-3 p-fluid">
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="info" onClick={handleName} />
                    <span className="p-float-label">
                        <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="name">World Name</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="info" onClick={handleSize} />
                    <span className="p-float-label">
                        <InputTextarea id="size" value={size} onChange={(e) => setSize(e.target.value)} />
                        <label htmlFor="size">Size</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="info" onClick={handleClimate} />
                    <span className="p-float-label">
                        <InputTextarea id="climate" value={climate} onChange={(e) => setClimate(e.target.value)} />
                        <label htmlFor="climate">Climate</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="info" onClick={handleLandMasses} />
                    <span className="p-float-label">
                        <InputTextarea id="landMasses" value={landMasses} onChange={(e) => setLandMasses(e.target.value)} />
                        <label htmlFor="landMasses">Land Masses</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="info" onClick={handleMagic} />
                    <span className="p-float-label">
                        <InputTextarea id="magic" value={magic} onChange={(e) => setMagic(e.target.value)} />
                        <label htmlFor="magic">Magic</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="info" onClick={handleTechnology} />
                    <span className="p-float-label">
                        <InputTextarea id="technology" value={technology} onChange={(e) => setTechnology(e.target.value)} />
                        <label htmlFor="technology">Technology</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="info" onClick={handleUnique} />
                    <span className="p-float-label">
                        <InputTextarea id="unique" value={unique} onChange={(e) => setUnique(e.target.value)} />
                        <label htmlFor="unique">Unique Characteristic</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="info" onClick={handleDominated} />
                    <span className="p-float-label">
                        <InputTextarea id="dominated" value={dominated} onChange={(e) => setDominated(e.target.value)} />
                        <label htmlFor="dominated">Dominated</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="info" onClick={handleNatRaces} />
                    <span className="p-float-label">
                        <InputTextarea id="natRaces" value={natRaces} onChange={(e) => setNatRaces(e.target.value)} />
                        <label htmlFor="natRaces">Natural Races</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="info" onClick={handleCataclysm} />
                    <span className="p-float-label">
                        <InputTextarea id="cataclysm" value={cataclysm} onChange={(e) => setCataclysm(e.target.value)} />
                        <label htmlFor="cataclysm">Cataclysm</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="info" onClick={handleCreation} />
                    <span className="p-float-label">
                        <InputTextarea id="creation" value={creation} onChange={(e) => setCreation(e.target.value)} />
                        <label htmlFor="creation">Creation</label>
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
            <div className="flex-auto">{gens}</div>
        </div>
        <br></br>
        <div className="flex flex-wrap gap-3 p-fluid">
          <div className="flex-auto">
                <Button className="p-inputgroup-addon" label="Add Continent" onClick={handleAddContinent} />
            </div>
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
                <Button className="p-inputgroup-addon" label="Regenerate World" severity="info" onClick={handleSettlement} />
            </div>
            <div className="flex-auto">
              <Button className="p-inputgroup-addon" label="Remove Gen" severity="danger" onClick={handleRemoveThis} />
            </div>
        </div>
    </Panel>
    );
  }