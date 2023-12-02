import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { shopData } from "../data/shop"
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Panel } from "primereact/panel";
import GenerateNPC from "./NPC";

export default function GenerateShop(props) {
    const PRODUCT   = 0;
    const TYPE      = 1;
    const OWNER     = 2;
    const SHOPCOND  = 3;
    const MERCHCOND = 4;
    const SUPPLIER  = 5;
    const PRICED    = 6;
    const SIZE      = 7;
    const BUSYORNA  = 8;
    const INTEREST  = 9;

    const parent = props.props.parent;
    const key = `${props.props.parent}_${props.props.key}`;
    // Shop Variables the user will see
    const [product, setProduct] = useState('');
    const [shopType, setShopType] = useState('');
    const [owner, setOwner] = useState('');
    const [shopCondition, setShopCondition] = useState('');
    const [merchCondition, setMerchCondition] = useState('');
    const [supplier, setSupplier] = useState('');
    const [priced, setPriced] = useState('');
    const [size, setSize] = useState('');
    const [busyOrNa, setBusyOrNa] = useState('');
    const [interest, setInterest] = useState('');
    // Shop "Children" Stuff (NPCs)
    const [numCurr, setNumCurr] = useState(1);
    const [gens, setGens] = useState([]);
    const [children, setChildren] = useState([]);

    useEffect(() => {
        handleShop();
    }, []);

    useEffect(() => {
      handleMakeJSON();
    }, [product, shopType, owner, shopCondition, merchCondition, supplier, priced, size, busyOrNa, interest, children])

    // Makes and Adds JSON to sessionStorage
    const handleMakeJSON = () => {
      var json = {
        parent:         parent,
        children:       children,
        type:           'shop',
        product:        product,
        shopType:       shopType,
        owner:          owner,
        shopCondition:  shopCondition,
        merchCondition: merchCondition,
        supplier:       supplier,
        priced:         priced,
        size:           size,
        busyOrNa:       busyOrNa,
        interest:       interest
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

    // Runs the Product Generator
    const handleProduct = () => {
      setProduct(shopData[PRODUCT].roll[randomNumber(shopData[PRODUCT].roll.length)]);
    }
    
    // Runs the Shop Type Generator
    const handleShopType = () => {
        setShopType(shopData[TYPE].roll[randomNumber(shopData[TYPE].roll.length)]);
      }

      // Runs the Owner Generator
    const handleOwner = () => {
        setOwner(shopData[OWNER].roll[randomNumber(shopData[OWNER].roll.length)]);
      }

      // Runs the Shop Condition Generator
    const handleShopCondition = () => {
        setShopCondition(shopData[SHOPCOND].roll[randomNumber(shopData[SHOPCOND].roll.length)]);
      }

      // Runs the Merch Condition Generator
    const handleMerchCondition = () => {
        setMerchCondition(shopData[MERCHCOND].roll[randomNumber(shopData[MERCHCOND].roll.length)]);
      }

      // Runs the Supplier Generator
    const handleSupplier = () => {
        setSupplier(shopData[SUPPLIER].roll[randomNumber(shopData[SUPPLIER].roll.length)]);
      }

      // Runs the Priced Generator
    const handlePriced = () => {
        setPriced(shopData[PRICED].roll[randomNumber(shopData[PRICED].roll.length)]);
      }

      // Runs the Size Generator
    const handleSize = () => {
        setSize(shopData[SIZE].roll[randomNumber(shopData[SIZE].roll.length)]);
      }

      // Runs the Busy or Not Generator
    const handleBusyOrNa = () => {
        setBusyOrNa(shopData[BUSYORNA].roll[randomNumber(shopData[BUSYORNA].roll.length)]);
      }

      // Runs the Interest Generator
    const handleInterest = () => {
        setInterest(shopData[INTEREST].roll[randomNumber(shopData[INTEREST].roll.length)]);
      }

    // Runs all Shop Generators
    const handleShop = () => {
        handleProduct();
        handleShopType();
        handleOwner();
        handleShopCondition();
        handleMerchCondition();
        handleSupplier();
        handlePriced();
        handleSize();
        handleBusyOrNa();
        handleInterest();
    };
  
    return (
    <Panel header={product + " (Shop Generator)"} toggleable>
        <div className="flex flex-wrap gap-3 p-fluid">
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleProduct} />
                    <span className="p-float-label">
                        <InputText id="product" value={product} onChange={(e) => setProduct(e.target.value)} />
                        <label htmlFor="product">Product</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleShopType} />
                    <span className="p-float-label">
                        <InputText id="shopType" value={shopType} onChange={(e) => setShopType(e.target.value)} />
                        <label htmlFor="shopType">Shop Type</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleSize} />
                    <span className="p-float-label">
                        <InputText id="size" value={size} onChange={(e) => setSize(e.target.value)} />
                        <label htmlFor="size">Size</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleOwner} />
                    <span className="p-float-label">
                        <InputText id="owner" value={owner} onChange={(e) => setOwner(e.target.value)} />
                        <label htmlFor="owner">Owner</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleShopCondition} />
                    <span className="p-float-label">
                        <InputText id="shopCondition" value={shopCondition} onChange={(e) => setShopCondition(e.target.value)} />
                        <label htmlFor="shopCondition">Shop Condition</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleMerchCondition} />
                    <span className="p-float-label">
                        <InputText id="merchCondition" value={merchCondition} onChange={(e) => setMerchCondition(e.target.value)} />
                        <label htmlFor="merchCondition">Merch Condition</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleSupplier} />
                    <span className="p-float-label">
                        <InputText id="supplier" value={supplier} onChange={(e) => setSupplier(e.target.value)} />
                        <label htmlFor="supplier">Supplier</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handlePriced} />
                    <span className="p-float-label">
                        <InputText id="priced" value={priced} onChange={(e) => setPriced(e.target.value)} />
                        <label htmlFor="priced">Priced</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleBusyOrNa} />
                    <span className="p-float-label">
                        <InputText id="busyOrNa" value={busyOrNa} onChange={(e) => setBusyOrNa(e.target.value)} />
                        <label htmlFor="busyOrNa">How Busy?</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">
                <div className="p-inputgroup">
                    <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={handleInterest} />
                    <span className="p-float-label">
                        <InputText id="interest" value={interest} onChange={(e) => setInterest(e.target.value)} />
                        <label htmlFor="interest">Point of Interest</label>
                    </span>
                </div>
            </div>
            <div className="flex-auto">{gens}</div>
        </div>
        <br></br>
        <div className="flex flex-wrap gap-3 p-fluid">
            <div className="flex-auto">
                <Button className="p-inputgroup-addon" label="Add NPC" severity="help" onClick={handleAddNPC} />
            </div>
            <div className="flex-auto">
                <Button className="p-inputgroup-addon" label="Regenerate Shop" severity="info" onClick={handleShop} />
            </div>
            <div className="flex-auto">
              <Button className="p-inputgroup-addon" label="Remove Gen" severity="danger" onClick={handleRemoveThis} />
            </div>
        </div>
    </Panel>
    );
}