import React, { useEffect, useState } from "react";
import { saveAs } from 'file-saver';
import { Button } from "primereact/button";
import GenerateTavern from "../components/Tavern"
import { tavernData } from "../data/tavern";

export default function GenerateTest() {

  const data = {};
  
  function exportData() {
    const fileData = JSON.stringify(data);
    const blob = new Blob([fileData], { type: "text/plain" });
    saveAs(fileData, "test.md")
  }

  const test = () => {
    console.log({ ...localStorage });
  }
  
    return (
      <div>
      <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={test} />
      <GenerateTavern />
      </div>
    );
}