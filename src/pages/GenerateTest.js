import React, { useEffect, useState } from "react";
import { saveAs } from 'file-saver';
import { Button } from "primereact/button";
import GenerateTavern from "../components/Tavern"
import format from "../utils/format";

export default function GenerateTest() {

  var data = [];
  
  function exportData() {
    const blob = new Blob(data, { type: "text/plain" });
    console.log(data);
    saveAs(blob, "test.md")
  }

  const test = () => {
    data = [];
    console.log(sessionStorage.length);
    for (var i = 0; i < sessionStorage.length; i++){
      data.push(format(JSON.parse(sessionStorage.getItem(sessionStorage.key(i)))));
    }
    console.log(data);
    exportData();
  }

  var props = {parent: 'null', key: 'tavern1'}
  
    return (
      <div>
      <Button className="p-inputgroup-addon" icon="pi pi-refresh" onClick={test} />
      <GenerateTavern props={props} />
      </div>
    );
}