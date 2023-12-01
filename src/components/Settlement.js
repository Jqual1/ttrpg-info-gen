import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { settlementData } from "../data/settlement"
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Panel } from "primereact/panel";
import GenerateShop from "./Shop";
import GenerateTavern from "./Tavern";
import GenerateNPC from "./NPC";

export default function GenerateSettlement(props) {
    const NAME1     = 0;
    const NAME2     = 1;
    const POPULA    = 2;
    const INHABI    = 3;
    const ATMOS     = 4;
    const FEATURE   = 5;

    const parent = props.props.parent;
    const key = `${props.props.parent}_${props.props.key}`;
    // Settlement Variables the user will see
    const [name, setName] = useState('');
    const [population, setPopulation] = useState('');
    const [inhabitants, setInhabitants] = useState('');
    const [atmosphere, setAtmosphere] = useState('');
    const [promFeature, setPromFeature] = useState('');
    // Settlement "Children" Stuff (NPCs)
    const [numCurr, setNumCurr] = useState(1);
    const [gens, setGens] = useState([]);
    const [children, setChildren] = useState([]);

    useEffect(() => {
        handleSettlement();
    }, []);

    useEffect(() => {
      handleMakeJSON();
    }, [name, population, inhabitants, atmosphere, promFeature, children])

    // Makes and Adds JSON to sessionStorage
    const handleMakeJSON = () => {
      var json = {
        parent:         parent,
        children:       children,
        type:           'settlement',
        name:           name,
        population:     population,
        inhabitants:    inhabitants,
        atmosphere:     atmosphere,
        promFeature:    promFeature
      }
      sessionStorage.setItem(key, JSON.stringify(json))
  }

  function handleAddShop(e) {
    var genKey = "shop" + numCurr;
    var currGen = {parent: key, key: genKey}
    setNumCurr(numCurr+1);
    setChildren(prevChildren => {
      return [...prevChildren, `${key}_${genKey}`]
    })
    setGens(prevGens => {
      return [...prevGens, <GenerateShop props={currGen} />]
    })
    }

    function handleAddTavern(e) {
        var genKey = "tavern" + numCurr;
        var currGen = {parent: key, key: genKey}
        setNumCurr(numCurr+1);
        setChildren(prevChildren => {
          return [...prevChildren, `${key}_${genKey}`]
        })
        setGens(prevGens => {
          return [...prevGens, <GenerateTavern props={currGen} />]
        })
        }

    function handleAddNPC(e) {
      var genKey = "npc" + numCurr;
      var currGen = {parent: key, key: genKey}
      setNumCurr(numCurr+1);
      setChildren(prevChildren => {
        return [...prevChildren, `${key}_${genKey}`]
      })
      setGens(prevGens => {
        return [...prevGens, <GenerateNPC props={currGen} />]
      })
      }

    function randomNumber(options) {
      // Get the number between 0 (inclusive) and max (exclusive) for an array
      return (Math.floor(Math.random() * (options)));
    }

    // Runs the Settlement Name Generator
    const handleName = () => {
      setName(settlementData[NAME1].roll[randomNumber(settlementData[NAME1].roll.length)] +
              settlementData[NAME2].roll[randomNumber(settlementData[NAME2].roll.length)]);
    }

    // Runs the Population Generator
    const handlePopulation = () => {
      setPopulation(settlementData[POPULA].roll[randomNumber(settlementData[POPULA].roll.length)]);
    }

    // Runs the Inhabitants Generator
    const handleInhabitants = () => {
      setInhabitants(settlementData[INHABI].roll[randomNumber(settlementData[INHABI].roll.length)]);
    }

    // Runs the Atmosphere Generator
    const handleAtmosphere = () => {
      setAtmosphere(settlementData[ATMOS].roll[randomNumber(settlementData[ATMOS].roll.length)]);
    }

    // Runs the Prominent Feature Generator
    const handlePromFeature = () => {
      setPromFeature(settlementData[FEATURE].roll[randomNumber(settlementData[FEATURE].roll.length)]);
    }


    // Runs all Settlement Generators
    const handleSettlement = () => {
      handleName();
      handlePopulation();
      handleInhabitants();
      handleAtmosphere();
      handlePromFeature();
    };
  
    return (
      <Panel header="Settlement Generator" toggleable>
        <div className="flex flex-wrap gap-3 p-fluid">
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="info" onClick={handleName} />
                    <span className="p-float-label">
                        <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="name">Settlement Name</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="info" onClick={handlePopulation} />
                    <span className="p-float-label">
                        <InputText id="population" value={population} onChange={(e) => setPopulation(e.target.value)} />
                        <label htmlFor="population">Population</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="info" onClick={handleInhabitants} />
                    <span className="p-float-label">
                        <InputText id="inhabitants" value={inhabitants} onChange={(e) => setInhabitants(e.target.value)} />
                        <label htmlFor="inhabitants">Inhabitants</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="info" onClick={handleAtmosphere} />
                    <span className="p-float-label">
                        <InputText id="atmosphere" value={atmosphere} onChange={(e) => setAtmosphere(e.target.value)} />
                        <label htmlFor="atmosphere">Atmosphere</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="info" onClick={handlePromFeature} />
                    <span className="p-float-label">
                        <InputText id="promFeature" value={promFeature} onChange={(e) => setPromFeature(e.target.value)} />
                        <label htmlFor="promFeature">Prominent Feature</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">{gens}</div>
        </div>
        <br></br>
        <div className="flex flex-wrap gap-3 p-fluid">
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
                <Button className="p-inputgroup-addon" label="Regenerate Town" severity="info" onClick={handleSettlement} />
            </div>
        </div>
    </Panel>
    );
}