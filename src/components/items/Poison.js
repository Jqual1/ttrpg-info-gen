import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { poisonData } from "../../data/object"
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Panel } from "primereact/panel";


export default function GeneratePoison(props) {
  const EFFECT = 0;
  const TEXTURE = 1;
  const COLOR = 2;
  const INGREDIENT = 3;
  const PREPARED = 4;
  const EFFECTIVE = 5;

  const parent = props.props.parent;
  const key = `${props.props.parent}_${props.props.key}`;
  // NPC Variables the user will see
  const [effect, setEffect] = useState('');
  const [texture, setTexture] = useState('');
  const [color, setColor] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [prepared, setPrepared] = useState('');
  const [effective, setEffective] = useState('');
  const [notes, setNotes] = useState('');


  useEffect(() => {
    handlePoison();
  }, []);

  useEffect(() => {
    handleMakeJSON();
  }, [effect, texture, color, ingredient, prepared, effective, notes])

  function randomNumber(options) {
    // Get the number between 0 (inclusive) and max (exclusive) for an array
    return (Math.floor(Math.random() * (options)));
  }

  const handleMakeJSON = () => {
    const json = {
      parent: parent,
      type: 'item',
      subtype: 'poison',
      effect: effect,
      texture: texture,
      color: color,
      ingredient: ingredient,
      prepared: prepared,
      effective: effective,
      notes: notes
    }
    sessionStorage.setItem(key, JSON.stringify(json));
  }

  // Handle Remove of This Gen
  const handleRemoveThis = () => {
    props.props.handleRemove(key);
  }

  // Handle Removal of childGen
  //function handleRemoveChild(key) { 
  //  setGens(current => current.filter(gen => gen.key !== key));
  //  setChildren(current => current.filter(child => child !== key));
  //  sessionStorage.removeItem(key);
  // }

  const handleEffect = () => {
    setEffect(poisonData[EFFECT].roll[randomNumber(poisonData[EFFECT].roll.length)]);
  }
  const handleTexture = () => {
    setTexture(poisonData[TEXTURE].roll[randomNumber(poisonData[TEXTURE].roll.length)]);
  }
  const handleColor = () => {
    setColor(poisonData[COLOR].roll[randomNumber(poisonData[COLOR].roll.length)]);
  }
  const handleIngredient = () => {
    setIngredient(poisonData[INGREDIENT].roll[randomNumber(poisonData[INGREDIENT].roll.length)]);
  }
  const handlePrepared = () => {
    setPrepared(poisonData[PREPARED].roll[randomNumber(poisonData[PREPARED].roll.length)]);
  }
  const handleEffective = () => {
    setEffective(poisonData[EFFECTIVE].roll[randomNumber(poisonData[EFFECTIVE].roll.length)]);
  }

  // Runs all Poison Generators
  const handlePoison = () => {
    handleEffect();
    handleTexture();
    handleColor();
    handleIngredient();
    handlePrepared();
    handleEffective();
  };

  return (
    <Panel header={effect.split(".")[0] + " Poison (Poison Generator)"} >
      <div className="flex flex-wrap gap-3 p-fluid">
        <div className="flex-auto">
          <div className="p-inputgroup">
            <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="warning" onClick={handleEffect} />
            <span className="p-float-label">
              <InputText id="effect" value={effect} onChange={(e) => setEffect(e.target.value)} />
              <label htmlFor="effect">Effect</label>
            </span>
          </div>
        </div>
        <div className="flex-auto">
          <div className="p-inputgroup">
            <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="warning" onClick={handleTexture} />
            <span className="p-float-label">
              <InputText id="texture" value={texture} onChange={(e) => setTexture(e.target.value)} />
              <label htmlFor="texture">Texture</label>
            </span>
          </div>
        </div>
        <div className="flex-auto">
          <div className="p-inputgroup">
            <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="warning" onClick={handleColor} />
            <span className="p-float-label">
              <InputText id="color" value={color} onChange={(e) => setColor(e.target.value)} />
              <label htmlFor="color">Color</label>
            </span>
          </div>
        </div>
        <div className="flex-auto">
          <div className="p-inputgroup">
            <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="warning" onClick={handleIngredient} />
            <span className="p-float-label">
              <InputText id="ingredient" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
              <label htmlFor="ingredient">Main Ingredient</label>
            </span>
          </div>
        </div>
        <div className="flex-auto">
          <div className="p-inputgroup">
            <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="warning" onClick={handlePrepared} />
            <span className="p-float-label">
              <InputText id="prepared" value={prepared} onChange={(e) => setPrepared(e.target.value)} />
              <label htmlFor="prepared">Prepared By...</label>
            </span>
          </div>
        </div>
        <div className="flex-auto">
          <div className="p-inputgroup">
            <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="warning" onClick={handleEffective} />
            <span className="p-float-label">
              <InputText id="effective" value={effective} onChange={(e) => setEffective(e.target.value)} />
              <label htmlFor="effective">Most Effective When...</label>
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
        <div className="flex-auto">
          <Button className="p-inputgroup-addon" label="Regenerate Poison" severity="warning" onClick={handlePoison} />
        </div>
        <div className="flex-auto">
          <Button className="p-inputgroup-addon" label="Remove Gen" severity="danger" onClick={handleRemoveThis} />
        </div>
      </div>
    </Panel>
  );
}