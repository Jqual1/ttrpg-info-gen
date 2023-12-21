import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { settlementData } from "../../data/settlement"
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Panel } from "primereact/panel";
import GenerateSettlement from "./Settlement";
import GenerateShop from "../Shop";
import GenerateTavern from "../Tavern";
import GenerateNPC from "../NPC";

export default function GenerateNation(props) {
    const NAME1             = 0;
    const NAME2             = 1;
    const AGE               = 7;
    const POLITICS          = 8;
    const ECONOMICS         = 9;
    const RULER             = 10;
    const UNIQUE            = 11;
    const FOUNDER           = 12;
    const DIVISIONS         = 13;
    const CITIZEN_MOOD      = 14;
    const CITIZEN_WEALTH    = 15;
    const RELIGION          = 16;
    const NOTABLE_LAW       = 17;
    const LANGUAGE          = 18;
    const CLASS_SYSTEM      = 20;
    const OUTCASTS          = 21;

    const parent = props.props.parent;
    const key = `${props.props.parent}_${props.props.key}`;
    // Settlement Variables the user will see
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [politics, setPolitics] = useState('');
    const [economics, setEconomics] = useState('');
    const [ruler, setRuler] = useState('');
    const [unique, setUnique] = useState('');
    const [founder, setFounder] = useState('');
    const [divisions, setDivisions] = useState('');
    const [citizenMood, setCitizenMood] = useState('');
    const [citizenWealth, setCitizenWealth] = useState('');
    const [religion, setReligion] = useState('');
    const [notableLaw, setNotableLaw] = useState('');
    const [language, setLanguage] = useState('');
    const [classSystem, setClassSystem] = useState('');
    const [outcasts, setOutcasts] = useState('');
    const [notes, setNotes] = useState('');
    // Settlement "Children" Stuff (NPCs)
    const [numCurr, setNumCurr] = useState(1);
    const [gens, setGens] = useState([]);
    const [children, setChildren] = useState([]);

    useEffect(() => {
        handleNation();
    }, []);

    useEffect(() => {
      handleMakeJSON();
    }, [name, age, politics, economics, ruler, unique, founder, divisions,
        citizenMood, citizenWealth, religion, notableLaw, language,
        classSystem, outcasts, notes, children])

    // Makes and Adds JSON to sessionStorage
    const handleMakeJSON = () => {
      var json = {
        parent:         parent,
        children:       children,
        type:           'nation',
        name:           name,
        age:            age,
        politics:       politics,
        economics:      economics,
        ruler:          ruler,
        unique:         unique,
        founder:        founder,
        divisions:      divisions,
        citizenMood:    citizenMood,
        citizenWealth:  citizenWealth,
        religion:       religion,
        notableLaw:     notableLaw,
        language:       language,
        classSystem:    classSystem,
        outcasts:       outcasts,
        notes:          notes
      }
      sessionStorage.setItem(key, JSON.stringify(json))
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

    // Runs the Nation Name Generator
    const handleName = () => {
      setName(settlementData[NAME1].roll[randomNumber(settlementData[NAME1].roll.length)] +
              settlementData[NAME2].roll[randomNumber(settlementData[NAME2].roll.length)]);
    }

    // Runs the Age Generator
    const handleAge = () => {
        setAge(settlementData[AGE].roll[randomNumber(settlementData[AGE].roll.length)]);
      }

    // Runs the Politics Generator
    const handlePolitics = () => {
        setPolitics(settlementData[POLITICS].roll[randomNumber(settlementData[POLITICS].roll.length)]);
      }
      
    // Runs the Economics Generator
    const handleEconomics = () => {
        setEconomics(settlementData[ECONOMICS].roll[randomNumber(settlementData[ECONOMICS].roll.length)]);
      }
      
    // Runs the Ruler Generator
    const handleRuler = () => {
        setRuler(settlementData[RULER].roll[randomNumber(settlementData[RULER].roll.length)]);
      }
      
    // Runs the Unique Generator
    const handleUnique = () => {
        setUnique(settlementData[UNIQUE].roll[randomNumber(settlementData[UNIQUE].roll.length)]);
      }
      
    // Runs the Founder Generator
    const handleFounder = () => {
        setFounder(settlementData[FOUNDER].roll[randomNumber(settlementData[FOUNDER].roll.length)]);
      }
      
    // Runs the Divisions Generator
    const handleDivisions = () => {
        setDivisions(settlementData[DIVISIONS].roll[randomNumber(settlementData[DIVISIONS].roll.length)]);
      }
      
    // Runs the CitizenMood Generator
    const handleCitizenMood = () => {
        setCitizenMood(settlementData[CITIZEN_MOOD].roll[randomNumber(settlementData[CITIZEN_MOOD].roll.length)]);
      }
      
    // Runs the CitizenWealth Generator
    const handleCitizenWealth = () => {
        setCitizenWealth(settlementData[CITIZEN_WEALTH].roll[randomNumber(settlementData[CITIZEN_WEALTH].roll.length)]);
      }
      
    // Runs the Religion Generator
    const handleReligion = () => {
        setReligion(settlementData[RELIGION].roll[randomNumber(settlementData[RELIGION].roll.length)]);
      }
      
    // Runs the NotableLaw Generator
    const handleNotableLaw = () => {
        setNotableLaw(settlementData[NOTABLE_LAW].roll[randomNumber(settlementData[NOTABLE_LAW].roll.length)]);
      }
      
    // Runs the Language Generator
    const handleLanguage = () => {
        var num = randomNumber(settlementData[LANGUAGE].roll.length);
        if (num === 0) {
            setLanguage("Common and " + settlementData[LANGUAGE].roll[randomNumber(settlementData[LANGUAGE].roll.length-3)+3])
        } else if (num === 1) {
            var lang1 = randomNumber(settlementData[LANGUAGE].roll.length-2)+2;
            var lang2 = randomNumber(settlementData[LANGUAGE].roll.length-2)+2;
            while (lang1 === lang2) {
                lang2 = randomNumber(settlementData[LANGUAGE].roll.length-2)+2
            }
            setLanguage(settlementData[LANGUAGE].roll[lang1] + " and " + settlementData[LANGUAGE].roll[lang2])
        } else {
            setLanguage(settlementData[LANGUAGE].roll[num]);
        }
      }
      
    // Runs the ClassSystem Generator
    const handleClassSystem = () => {
        setClassSystem(settlementData[CLASS_SYSTEM].roll[randomNumber(settlementData[CLASS_SYSTEM].roll.length)]);
      }
      
    // Runs the Outcasts Generator
    const handleOutcasts = () => {
        setOutcasts(settlementData[OUTCASTS].roll[randomNumber(settlementData[OUTCASTS].roll.length)]);
      }

    // Runs all Nation Generators
    const handleNation = () => {
      handleName();
      handleAge();
      handlePolitics();
      handleEconomics();
      handleRuler();
      handleUnique();
      handleFounder();
      handleDivisions();
      handleCitizenMood();
      handleCitizenWealth();
      handleReligion();
      handleNotableLaw();
      handleLanguage();
      handleClassSystem();
      handleOutcasts();
    };
  
    return (
      <Panel header={name + " (Nation Generator)"} >
        <div className="flex flex-wrap gap-3 p-fluid">
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleName} />
                    <span className="p-float-label">
                        <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="name">Nation Name</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleLanguage} />
                    <span className="p-float-label">
                        <InputText id="language" value={language} onChange={(e) => setLanguage(e.target.value)} />
                        <label htmlFor="language">Language(s)</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleClassSystem} />
                    <span className="p-float-label">
                        <InputText id="classSystem" value={classSystem} onChange={(e) => setClassSystem(e.target.value)} />
                        <label htmlFor="classSystem">Class System</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleOutcasts} />
                    <span className="p-float-label">
                        <InputText id="outcasts" value={outcasts} onChange={(e) => setOutcasts(e.target.value)} />
                        <label htmlFor="outcasts">Outcasts</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleDivisions} />
                    <span className="p-float-label">
                        <InputText id="divisions" value={divisions} onChange={(e) => setDivisions(e.target.value)} />
                        <label htmlFor="divisions">Divisions</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleRuler} />
                    <span className="p-float-label">
                        <InputTextarea id="ruler" value={ruler} onChange={(e) => setRuler(e.target.value)} />
                        <label htmlFor="ruler">Ruler</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleFounder} />
                    <span className="p-float-label">
                        <InputTextarea id="founder" value={founder} onChange={(e) => setFounder(e.target.value)} />
                        <label htmlFor="founder">Founder</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleAge} />
                    <span className="p-float-label">
                        <InputTextarea id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                        <label htmlFor="age">Age</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handlePolitics} />
                    <span className="p-float-label">
                        <InputTextarea id="politics" value={politics} onChange={(e) => setPolitics(e.target.value)} />
                        <label htmlFor="politics">Politics</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleEconomics} />
                    <span className="p-float-label">
                        <InputTextarea id="economics" value={economics} onChange={(e) => setEconomics(e.target.value)} />
                        <label htmlFor="economics">Economics</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleUnique} />
                    <span className="p-float-label">
                        <InputTextarea id="unique" value={unique} onChange={(e) => setUnique(e.target.value)} />
                        <label htmlFor="unique">Unique Characteristic</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleCitizenMood} />
                    <span className="p-float-label">
                        <InputTextarea id="citizenMood" value={citizenMood} onChange={(e) => setCitizenMood(e.target.value)} />
                        <label htmlFor="citizenMood">Citizen Mood</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleCitizenWealth} />
                    <span className="p-float-label">
                        <InputTextarea id="citizenWealth" value={citizenWealth} onChange={(e) => setCitizenWealth(e.target.value)} />
                        <label htmlFor="citizenWealth">Citizen Wealth</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleReligion} />
                    <span className="p-float-label">
                        <InputTextarea id="religion" value={religion} onChange={(e) => setReligion(e.target.value)} />
                        <label htmlFor="religion">Religion</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="help" onClick={handleNotableLaw} />
                    <span className="p-float-label">
                        <InputTextarea id="notableLaw" value={notableLaw} onChange={(e) => setNotableLaw(e.target.value)} />
                        <label htmlFor="notableLaw">Notable Law</label>
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
                <Button className="p-inputgroup-addon" label="Regenerate Nation" severity="help" onClick={handleNation} />
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