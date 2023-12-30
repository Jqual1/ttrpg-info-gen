import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import GeneratePotion from "./Potion";
import GeneratePoison from "./Poison";


export default function GenerateItem(props) {

  const parent = props.props.parent;
  const key = `${props.props.parent}_${props.props.key}`;
  // "Children" Stuff
  const [numCurr, setNumCurr] = useState(1);
  const [gens, setGens] = useState([]);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    handleMakeJSON();
  }, [children])

  // Makes and Adds JSON to sessionStorage
  const handleMakeJSON = () => {
    var json = {
      parent: parent,
      children: children,
      type: 'items',
      notes: ''
    }
    sessionStorage.setItem(key, JSON.stringify(json))
  }

  // Handle Remove of This Gen
  const handleRemoveThis = () => {
    props.props.handleRemove(key);
  }

  //  Handle Removal of childGen
  function handleRemoveChild(key) {
    setGens(current => current.filter(gen => gen.key !== key));
    setChildren(current => current.filter(child => child !== key));
    sessionStorage.removeItem(key);
  }

  function handleAddPotion(e) {
    setNumCurr(numCurr + 1);
    var genKey = "potion" + numCurr;
    var currGen = { parent: key, key: genKey, handleRemove: handleRemoveChild }
    setChildren(prevChildren => {
      return [...prevChildren, `${key}_${genKey}`]
    })
    setGens(prevNPCs => {
      return [...prevNPCs, <GeneratePotion key={`${key}_${genKey}`} props={currGen} />]
    })
  }

  function handleAddPoison(e) {
    setNumCurr(numCurr + 1);
    var genKey = "potion" + numCurr;
    var currGen = { parent: key, key: genKey, handleRemove: handleRemoveChild }
    setChildren(prevChildren => {
      return [...prevChildren, `${key}_${genKey}`]
    })
    setGens(prevNPCs => {
      return [...prevNPCs, <GeneratePoison key={`${key}_${genKey}`} props={currGen} />]
    })
  }

  return (
    <Panel header={"Items"} >
      <div className="flex flex-wrap gap-3 p-fluid">
        <div className="flex-auto">
          <Button className="p-inputgroup-addon" label="Add Potion" severity="warning" onClick={handleAddPotion} />
        </div>
        <div className="flex-auto">
          <Button className="p-inputgroup-addon" label="Add Poison" severity="warning" onClick={handleAddPoison} />
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