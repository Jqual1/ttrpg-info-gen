import React, { useEffect, useState } from "react";
import { saveAs } from 'file-saver';
import { Button } from "primereact/button";
import GenerateTavern from "../components/Tavern"
import GenerateNPC from "../components/NPC";
import format from "../utils/format";

export default function GenerateInfo() {
  
  const [gens, setGens] = useState([]);
  const [numCurr, setNumCurr] = useState(1);
  var data = [];
  
  // Export Functions
  function exportData() {
    const blob = new Blob(data, { type: "text/plain" });
    console.log(data);
    saveAs(blob, "test.md")
  }

  const formatExport = () => {
    data = [];
    console.log(sessionStorage.length);
    for (var i = 0; i < sessionStorage.length; i++){
      data.push(format(JSON.parse(sessionStorage.getItem(sessionStorage.key(i)))));
    }
    console.log(data);
    exportData();
  }

  // Generators
  function handleAddTavern(e) {
    setNumCurr(numCurr+1);
    var tavernKey = "tavern" + numCurr;
    console.log(tavernKey);
    var currGen = {parent: "null", key: tavernKey}
    setGens(prevGens => {
      return [...prevGens, [<div className="card">, <GenerateTavern props={currGen} />, </div>]]
    })
  }

  function handleAddNPC(e) {
    setNumCurr(numCurr+1);
    var npcKey = "npc" + numCurr;
    console.log(npcKey);
    var currGen = {parent: "null", key: npcKey}
    setGens(prevGens => {
      return [...prevGens, [<div className="card">, <GenerateNPC props={currGen} />, </div>]]
    })
  }
  
    return (
      <div>
        <div className="flex flex-wrap gap-3 p-fluid">
          <div className="flex-auto">{gens}</div>
          </div>
        <br></br>
        <div className="flex flex-wrap gap-3 p-fluid">
          <div className="flex-auto">
            <Button className="p-inputgroup-addon" label="Export" onClick={formatExport} />
          </div>
          <div className="flex-auto">
              <Button className="p-inputgroup-addon" label="Add Tavern" onClick={handleAddTavern} />
          </div>
          <div className="flex-auto">
              <Button className="p-inputgroup-addon" label="Add NPC" onClick={handleAddNPC} />
          </div>
        </div>  
      </div>
    );
}