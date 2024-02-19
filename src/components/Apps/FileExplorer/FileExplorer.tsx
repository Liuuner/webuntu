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
      <details>
        <summary>Advanced Features (currently only available in debug console)</summary>
        <p>The "fs." or "window.fs" can be used to access the filesystem and some functions:</p>
        <ul>
          <li>"fs" ={">"} the filesystem, that must be provided on any other method call</li>
          <li>createDirectoryEntry ={">"} creates a directory</li>
          <li>createFileEntry ={">"} creates a file</li>
          <li>loadFilesystem ={">"} loads the filesystem (use the already loaded filesystem at "fs.fs" or
            "window.fs.fs"
          </li>
          <li>getDirectoryEntry ={">"} get directory (as object)</li>
          <li>getFileEntry ={">"} get file (as object)</li>
          <li>getEntryMetadata ={">"} get the metadata of a entry (file or directory)</li>
          <li>readDirectoryEntry ={">"} read the entries in a dir</li>
          <li>readFileEntry ={">"} read the text in a file</li>
          <li>writeFileEntry ={">"} write blob to a file</li>
          <li>writeFileString</li>
          <li>copyEntryTo ={">"} copy entry to other directory</li>
          <li>getEntryURL ={">"} get url to file, can be used in image tags (and others, like normal source link)</li>
          <li>moveEntryTo ={">"} move entry to other directory</li>
          <li>removeEntry ={">"} remove entry (directory or file)</li>
          <li>removeDirectoryRecursively ={">"} remove directory and all its sub-entries (files and directories)</li>
        </ul>
        <details>
          <summary>Examples</summary>
          <p>fs.createDirectoryEntry("/testDir", fs.fs).then(console.log)</p>
          <p>fs.createFileEntry("/testDir/testFile.txt", fs.fs).then(console.log)</p>
          <p>fs.readDirectoryEntry("/testDir", fs.fs).then(console.log)</p>
          <p>fs.writeFileString("/testDir/testFile.txt", "hello world", fs.fs).then(console.log)</p>
          <p>fs.readFileEntry("/testDir/testFile.txt", fs.fs).then(console.log)</p>
        </details>
      </details>
    </div>
  );
}