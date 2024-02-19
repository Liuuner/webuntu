const PERSISTENT = 1;
const TEMPORARY = 0;

type FileWriter = {
  write: (date: Blob) => void;
}

interface MyFileSystemFileEntry extends FileSystemFileEntry{
  createWriter: (successCallback: (writer: FileWriter) => void, errorCallback: (error: string) => void) => void;
}

export function loadFilesystem(): Promise<FileSystem> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    window.webkitRequestFileSystem(PERSISTENT, 1024 * 1024, resolve, reject);
  });
}

export function createDirectory(path: string, filesystem: FileSystem): Promise<FileSystemDirectoryEntry> {
  return new Promise((resolve, reject) => {
    filesystem.root.getDirectory(path, {
      create: true,
      exclusive: true
    }, (r) => resolve(r as FileSystemDirectoryEntry), reject);
  });
}

export function createFile(path: string, filesystem: FileSystem): Promise<MyFileSystemFileEntry> {
  return new Promise((resolve, reject) => {
    filesystem.root.getFile(path, { create: true, exclusive: true }, (r) => resolve(r as MyFileSystemFileEntry), reject);
  });
}

export function getDirectory(path: string, filesystem: FileSystem): Promise<FileSystemDirectoryEntry> {
  return new Promise((resolve, reject) => {
    filesystem.root.getDirectory(path, {}, (r) => resolve(r as FileSystemDirectoryEntry), reject);
  });
}

export function getFile(path: string, filesystem: FileSystem): Promise<MyFileSystemFileEntry> {
  return new Promise((resolve, reject) => {
    filesystem.root.getFile(path, {}, (r) => resolve(r as MyFileSystemFileEntry), reject);
  });
}

export function readDirectory(path: string, filesystem: FileSystem): Promise<FileSystemEntry[]> {
  return getDirectory(path, filesystem).then((dir) => {
    const reader = dir.createReader()
    return new Promise((resolve, reject) => {
      reader.readEntries(resolve, reject);
    });
  })
}

export function readFile(path: string, filesystem: FileSystem){
  return getFile(path, filesystem).then(fileEntry => {
    fileEntry.file(file => {
      return file.text()
    })
  })
}

export function writeFile(path: string, content: Blob, filesystem: FileSystem): Promise<void>{
  return getFile(path, filesystem).then(fileEntry => {
    return new Promise<void>((resolve, reject) => {
      fileEntry.createWriter((writer: FileWriter) => {
        writer.write(content);
        resolve()
      }, reject)
    });
  })
}

export function writeFileString(path: string, content: string, filesystem: FileSystem){
  return writeFile(path, new Blob([content], {type: "text/plan"}), filesystem)
}