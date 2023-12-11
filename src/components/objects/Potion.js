import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { potionData } from "../../data/object"
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Panel } from "primereact/panel";


export default function GeneratePotion(props) {
    const TITLE         = 0;
    const EFFECT        = 1;
    const STRENGTH      = 2;
    const SIDEEFFECT    = 3;
    const CONTAINER     = 4;
    const APPEARANCE1   = 5;
    const APPEARANCE2   = 6;
    const TEXTURE       = 7;
    const SMELL         = 8;
    const TASTE         = 9;
    const LABEL         = 10;

    const parent = props.props.parent;
    const key = `${props.props.parent}_${props.props.key}`;
    // NPC Variables the user will see
    const [title, setTitle] = useState('');
    const [effect, setEffect] = useState('');
    const [strength, setStrength] = useState('');
    const [sideEffect, setSideEffect] = useState('');
    const [container, setContainer] = useState('');
    const [appearance1, setAppearance1] = useState('');
    const [appearance2, setAppearance2] = useState('');
    const [texture, setTexture] = useState('');
    const [smell, setSmell] = useState('');
    const [taste, setTaste] = useState('');
    const [label, setLabel] = useState('');
    const [notes, setNotes] = useState('');

    
    useEffect(() => {
        handlePotion();
    }, []);

    useEffect(() => {
        handleMakeJSON();
    }, [title, effect, strength, sideEffect, container, appearance1, appearance2,
        texture, smell, taste, label, notes])

    function randomNumber(options) {
      // Get the number between 0 (inclusive) and max (exclusive) for an array
      return (Math.floor(Math.random() * (options)));
    }

    const handleMakeJSON = () => {
        const json = {
            parent:         parent,
            type:           'potion',
            title:          title,
            effect:         effect,
            strength:       strength,
            sideEffect:     sideEffect,
            container:      container,
            appearance1:    appearance1,
            appearance2:    appearance2,
            texture:        texture,
            smell:          smell,
            taste:          taste,
            label:          label,
            notes:          notes
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

    const handleTitle = () => {
        setTitle(potionData[TITLE].roll[randomNumber(potionData[TITLE].roll.length)]);
      }
    const handleEffect = () => {
        setEffect(potionData[EFFECT].roll[randomNumber(potionData[EFFECT].roll.length)]);
      }
    const handleStrength = () => {
        setStrength(potionData[STRENGTH].roll[randomNumber(potionData[STRENGTH].roll.length)]);
      }
    const handleSideEffect = () => {
        setSideEffect(potionData[SIDEEFFECT].roll[randomNumber(potionData[SIDEEFFECT].roll.length)]);
      }
    const handleContainer = () => {
        setContainer(potionData[CONTAINER].roll[randomNumber(potionData[CONTAINER].roll.length)]);
      }
    const handleAppearance1 = () => {
        setAppearance1(potionData[APPEARANCE1].roll[randomNumber(potionData[APPEARANCE1].roll.length)]);
      }
    const handleAppearance2 = () => {
        setAppearance2(potionData[APPEARANCE2].roll[randomNumber(potionData[APPEARANCE2].roll.length)]);
      }
    const handleTexture = () => {
        setTexture(potionData[APPEARANCE2].roll[randomNumber(potionData[APPEARANCE2].roll.length)]);
      }
    const handleSmell = () => {
        setSmell(potionData[SMELL].roll[randomNumber(potionData[SMELL].roll.length)]);
      }
    const handleTaste = () => {
        setTaste(potionData[TASTE].roll[randomNumber(potionData[TASTE].roll.length)]);
      }
    const handleLabel = () => {
        setLabel(potionData[LABEL].roll[randomNumber(potionData[LABEL].roll.length)]);
      }

    // Runs all Potion Generators
    const handlePotion = () => {
        handleTitle();
        handleEffect();
        handleStrength();
        handleSideEffect();
        handleContainer();
        handleAppearance1();
        handleAppearance2();
        handleTexture();
        handleSmell();
        handleTaste();
        handleLabel();
    };
  
    return (
    <Panel header={title + " of " + effect.split(".")[0] + " (Potion Generator)"} >
        <div className="flex flex-wrap gap-3 p-fluid">
        <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="warning" onClick={handleTitle}/>
                    <span className="p-float-label">
                        <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <label htmlFor="title">Title</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="warning" onClick={handleEffect}/>
                    <span className="p-float-label">
                        <InputText id="effect" value={effect} onChange={(e) => setEffect(e.target.value)} />
                        <label htmlFor="effect">Effect</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="warning" onClick={handleStrength}/>
                    <span className="p-float-label">
                        <InputText id="strength" value={strength} onChange={(e) => setStrength(e.target.value)} />
                        <label htmlFor="strength">Strength</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="warning" onClick={handleSideEffect}/>
                    <span className="p-float-label">
                        <InputText id="sideEffect" value={sideEffect} onChange={(e) => setSideEffect(e.target.value)} />
                        <label htmlFor="sideEffect">Side Effect</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="warning" onClick={handleContainer}/>
                    <span className="p-float-label">
                        <InputText id="container" value={container} onChange={(e) => setContainer(e.target.value)} />
                        <label htmlFor="container">Container</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="warning" onClick={handleAppearance1}/>
                    <span className="p-float-label">
                        <InputText id="appearance1" value={appearance1} onChange={(e) => setAppearance1(e.target.value)} />
                        <label htmlFor="appearance1">Appearance1</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="warning" onClick={handleAppearance2}/>
                    <span className="p-float-label">
                        <InputText id="appearance2" value={appearance2} onChange={(e) => setAppearance2(e.target.value)} />
                        <label htmlFor="appearance2">Appearance2</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="warning" onClick={handleTexture}/>
                    <span className="p-float-label">
                        <InputText id="texture" value={texture} onChange={(e) => setTexture(e.target.value)} />
                        <label htmlFor="texture">Texture</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="warning" onClick={handleSmell}/>
                    <span className="p-float-label">
                        <InputText id="smell" value={smell} onChange={(e) => setSmell(e.target.value)} />
                        <label htmlFor="smell">Smell</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="warning" onClick={handleTaste}/>
                    <span className="p-float-label">
                        <InputText id="taste" value={taste} onChange={(e) => setTaste(e.target.value)} />
                        <label htmlFor="taste">Taste</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" severity="warning" onClick={handleLabel}/>
                    <span className="p-float-label">
                        <InputText id="label" value={label} onChange={(e) => setLabel(e.target.value)} />
                        <label htmlFor="label">Label</label>
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
                <Button className="p-inputgroup-addon" label="Regenerate Potion" severity="warning" onClick={handlePotion} />
            </div>
            <div className="flex-auto">
              <Button className="p-inputgroup-addon" label="Remove Gen" severity="danger" onClick={handleRemoveThis} />
            </div>
        </div>
      </Panel>
    );
}