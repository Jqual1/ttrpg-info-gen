import React, { useEffect, useState } from "react";
import { saveAs } from 'file-saver';
import { Button } from "primereact/button";
import GenerateWorld from "../components/settlement/World";
import GenerateContinent from "../components/settlement/Continent";
import GenerateNation from "../components/settlement/Nation";
import GenerateSettlement from "../components/settlement/Settlement";
import GenerateShop from "../components/Shop";
import GenerateTavern from "../components/Tavern";
import GenerateNPC from "../components/NPC";
import GeneratePotion from "../components/objects/Potion";
import format from "../utils/format";

export default function GenerateInfo() {
  
  const [gens, setGens] = useState([]);
  const [numCurr, setNumCurr] = useState(1);
  var data = [];
  var usedKeys = [];

  useEffect(() => {
    sessionStorage.clear();
}, []);

  // Export Functions
  function exportData() {
    const blob = new Blob(data, { type: "text/plain" });
    saveAs(blob, "TTRPGInfoGenOutput.md")
  }

  const formatExport = async () => {
    data = [];
    usedKeys = [];
    for (var i = 0; i < sessionStorage.length; i++){
      var key = sessionStorage.key(i)
      if (JSON.parse(sessionStorage.getItem(key)).parent === 'null') {
      var wait = await formatExportHelper(key);
      }
    }
    exportData();
  }

  async function formatExportHelper(key) {
    if (usedKeys.includes(key)) {return false}
    usedKeys.push(key);
    var json = JSON.parse(sessionStorage.getItem(key))
    data.push(format(json));
    if (!(json.children === undefined)) {
      for (var i = 0; i < json.children.length; i++){
        await formatExportHelper(json.children[i]);
      }
    }
    return true;
  }

  // Remove Generator
  function handleRemoveChild(key) { 
    setGens(current => current.filter(gen => gen.key !== key));
    sessionStorage.removeItem(key);
   }

// Generators
  function handleAddWorld(e) {
    setNumCurr(numCurr+1);
    var genKey = "world" + numCurr;
    var currGen = {parent: "null", key: genKey, handleRemove: handleRemoveChild}
    setGens(prevGens => {
      return [...prevGens, <GenerateWorld key={`null_${genKey}`} props={currGen} />]
    })
  }

  function handleAddContinent(e) {
    setNumCurr(numCurr+1);
    var genKey = "continent" + numCurr;
    var currGen = {parent: "null", key: genKey, handleRemove: handleRemoveChild}
    setGens(prevGens => {
      return [...prevGens, <GenerateContinent key={`null_${genKey}`} props={currGen} />]
    })
  }

  function handleAddNation(e) {
    setNumCurr(numCurr+1);
    var genKey = "nation" + numCurr;
    var currGen = {parent: "null", key: genKey, handleRemove: handleRemoveChild}
    setGens(prevGens => {
      return [...prevGens, <GenerateNation key={`null_${genKey}`} props={currGen} />]
    })
  }

  function handleAddSettlement(e) {
    setNumCurr(numCurr+1);
    var genKey = "settlement" + numCurr;
    var currGen = {parent: "null", key: genKey, handleRemove: handleRemoveChild}
    setGens(prevGens => {
      return [...prevGens, <GenerateSettlement key={`null_${genKey}`} props={currGen} />]
    })
  }
  
  function handleAddShop(e) {
    setNumCurr(numCurr+1);
    var genKey = "shop" + numCurr;
    var currGen = {parent: "null", key: genKey, handleRemove: handleRemoveChild}
    setGens(prevGens => {
      return [...prevGens, <GenerateShop key={`null_${genKey}`} props={currGen} />]
    })
  }

  function handleAddTavern(e) {
    setNumCurr(numCurr+1);
    var genKey = "tavern" + numCurr;
    var currGen = {parent: "null", key: genKey, handleRemove: handleRemoveChild}
    setGens(prevGens => {
      return [...prevGens, <GenerateTavern key={`null_${genKey}`} props={currGen} />]
    })
  }
  
  function handleAddNPC(e) {
    setNumCurr(numCurr+1);
    var genKey = "npc" + numCurr;
    var currGen = {parent: "null", key: genKey, handleRemove: handleRemoveChild}
    setGens(prevGens => {
      return [...prevGens, <GenerateNPC key={`null_${genKey}`} props={currGen} />]
    })
  }

  function handleAddPotion(e) {
    setNumCurr(numCurr+1);
    var genKey = "potion" + numCurr;
    var currGen = {parent: "null", key: genKey, handleRemove: handleRemoveChild}
    setGens(prevGens => {
      return [...prevGens, <GeneratePotion key={`null_${genKey}`} props={currGen} />]
    })
  }
  
    return (
      <div className="card">
        <div className="flex flex-wrap gap-3 p-fluid">
          <div className="flex-auto">{gens}</div>
          </div>
        <br></br>
        <div className="flex flex-wrap gap-3 p-fluid">
          <div className="flex-auto">
            <Button className="p-inputgroup-addon" label="Export" onClick={formatExport} />
          </div>
          <div className="flex-auto">
              <Button className="p-inputgroup-addon" label="Add World" severity="info" onClick={handleAddWorld} />
          </div>
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
              <Button className="p-inputgroup-addon" label="Add Potion" severity="warning" onClick={handleAddPotion} />
          </div>
        </div>  
      </div>
    );
}