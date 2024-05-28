import { useEffect, useRef, useState } from "react";
import fs from "indexeddb-fs";
import { EEntryType, IEntry } from "indexeddb-fs/dist/types";
import { Button, ButtonGroup, Grid } from "@mui/material";
import { EntryBtn } from "src/components/Apps/FileManager/EntryBtn.tsx";
import "./FileManager.css"


export default function FileManager() {
  const [path, setPath] = useState("root");
  const [dirContent, setDirContent] = useState<IEntry<EEntryType>[]>([]);
  const [newEntryName, setNewEntryName] = useState("");

  useEffect(() => {
    console.log(path);
    readDirectory();
  }, [path]);

  function readDirectory() {
    fs.readDirectory(path)
      .then(data => {
        console.log([...data.files, ...data.directories]);
        setDirContent([...data.files, ...data.directories]);
      });
  }

  function createDirectory() {
    fs.createDirectory(path + "/" + newEntryName)
      .then(() => readDirectory());
    setNewEntryName("");
  }

  function createFile() {
    fs.writeFile(path + "/" + newEntryName, "")
      .then(() => readDirectory());
    setNewEntryName("");
  }

  return (
    <Grid container>
      <Grid item xs={4}></Grid>
      <Grid item xs={8}>
        <ButtonGroup variant={"outlined"}>
          {path.split("/").map((entry, id) => (
            <Button key={id} onClick={() => {
              setPath(path.split("/").slice(0, id + 1).join("/"));
            }}
                    disabled={entry == "root"}>
              {entry}
            </Button>
          ))}
          <Button disabled={true}>{">"}</Button>
        </ButtonGroup>
        <hr />
        <div>
          {dirContent.map((entry) => (
            <EntryBtn key={entry.fullPath} entry={entry} setPath={setPath}/>
          ))}
        </div>
        <hr />
        <div>
          <input type="text" value={newEntryName} onChange={e => setNewEntryName(e.target.value)} />
          <button onClick={createDirectory}>Create Dir</button>
          <button onClick={createFile}>Create File</button>
        </div>
      </Grid>
    </Grid>
  );
}