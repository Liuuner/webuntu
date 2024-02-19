import { useEffect, useRef, useState } from "react";
import {
  createDirectoryEntry,
  createFileEntry,
  loadFilesystem,
  readDirectoryEntry,
  readFileEntry,
  writeFileEntry,
  getDirectoryEntry,
  writeFileString,
  getFileEntry,
  getEntryMetadata,
  copyEntryTo,
  getEntryURL,
  moveEntryTo,
  removeEntry,
  removeDirectoryRecursively
} from "../FileSystem/FileSystem.ts";

export default function FileExplorer() {
  const [path, setPath] = useState("/");
  const [dirContent, setDirContent] = useState<FileSystemEntry[]>([]);
  const [newEntryName, setNewEntryName] = useState("");
  const filesystemRef = useRef<FileSystem>();

  useEffect(() => {
    // @ts-ignore
    window.fs = {
      createDirectoryEntry,
      createFileEntry,
      loadFilesystem,
      readDirectoryEntry,
      readFileEntry,
      writeFileEntry,
      getDirectoryEntry,
      writeFileString,
      getFileEntry,
      getEntryMetadata,
      copyEntryTo,
      getEntryURL,
      moveEntryTo,
      removeEntry,
      removeDirectoryRecursively
    };
    loadFilesystem().then(filesystem => {
      filesystemRef.current = filesystem;
      // @ts-ignore
      window.fs.fs = filesystem;
      readDirectory();
    });
  }, []);

  useEffect(() => {
    console.log(path);
    readDirectory();
  }, [path]);

  function readDirectory() {
    if (filesystemRef.current) {
      readDirectoryEntry(path, filesystemRef.current)
        .then(setDirContent);
    }
  }

  function createDirectory() {
    if (filesystemRef.current) {
      createDirectoryEntry(path + "/" + newEntryName, filesystemRef.current)
        .then(() => readDirectory());
      setNewEntryName("");
    }
  }

  function createFile() {
    if (filesystemRef.current) {
      createFileEntry(path + "/" + newEntryName, filesystemRef.current)
        .then(() => readDirectory());
      setNewEntryName("");
    }
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <h2>File Explorer</h2>
      <label htmlFor={"path"}>Path: </label>
      <output id={"path"}>
        {path.split("/").map((entry, id) => (
          <button key={id} onClick={() => setPath(path.split("/").slice(0, id - 1).join("/"))}>
            {"/" + entry}
          </button>
        ))}
      </output>
      <hr />
      <div>
        {dirContent.map((entry) => (
          <button key={entry.fullPath} onClick={() => setPath(entry.fullPath)}>{entry.name}</button>
        ))}
      </div>
      <hr />
      <div>
        <input type="text" value={newEntryName} onChange={e => setNewEntryName(e.target.value)} />
        <button onClick={createDirectory}>Create Dir</button>
        <button onClick={createFile}>Create File</button>
      </div>
    </div>
  );
}