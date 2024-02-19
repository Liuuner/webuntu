const PERSISTENT = 1;
const TEMPORARY = 0;

type FileWriter = {
  write: (date: Blob) => void;
}

type Metadata = {
  modificationTime: Date;
  size: number;
}

interface MyFileSystemEntry extends FileSystemEntry {
  copyTo: (newParent: MyFileSystemDirectoryEntry, newName?: string, successCallback?: (entry: MyFileSystemEntry) => void, errorCallback?: (error: string) => void) => void;
  getMetadata: (successCallback: (metadata: Metadata) => void, errorCallback: (error: string) => void) => void;
  moveTo: (newParent: MyFileSystemDirectoryEntry, newName?: string, successCallback?: (entry: FileSystemEntry) => void, errorCallback?: (error: string) => void) => void;
  remove: (successCallback: () => void, errorCallback: (error: string) => void) => void;
  toURL: (mimeType?: string) => string;
}

interface MyFileSystemFileEntry extends FileSystemFileEntry, MyFileSystemEntry {
  createWriter: (successCallback: (writer: FileWriter) => void, errorCallback: (error: string) => void) => void;
}

interface MyFileSystemDirectoryEntry extends FileSystemDirectoryEntry, MyFileSystemEntry {
  removeRecursively: (successCallback: () => void, errorCallback: (error: string) => void) => void;
}

export function loadFilesystem(): Promise<FileSystem> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    window.webkitRequestFileSystem(PERSISTENT, 1048576, resolve, reject);
  });
}

export function createDirectoryEntry(path: string, filesystem: FileSystem): Promise<MyFileSystemDirectoryEntry> {
  return new Promise((resolve, reject) => {
    filesystem.root.getDirectory(path, {
      create: true,
      exclusive: true
    }, (r) => resolve(r as MyFileSystemDirectoryEntry), reject);
  });
}

export function createFileEntry(path: string, filesystem: FileSystem): Promise<MyFileSystemFileEntry> {
  return new Promise((resolve, reject) => {
    filesystem.root.getFile(path, {
      create: true,
      exclusive: true
    }, (r) => resolve(r as MyFileSystemFileEntry), reject);
  });
}

export function getDirectoryEntry(path: string, filesystem: FileSystem): Promise<MyFileSystemDirectoryEntry> {
  return new Promise((resolve, reject) => {
    filesystem.root.getDirectory(path, {}, (r) => resolve(r as MyFileSystemDirectoryEntry), reject);
  });
}

export function getFileEntry(path: string, filesystem: FileSystem): Promise<MyFileSystemFileEntry> {
  return new Promise((resolve, reject) => {
    filesystem.root.getFile(path, {}, (r) => resolve(r as MyFileSystemFileEntry), reject);
  });
}

export function readDirectoryEntry(path: string, filesystem: FileSystem): Promise<FileSystemEntry[]> {
  return getDirectoryEntry(path, filesystem)
    .then((dir) => {
      const reader = dir.createReader();
      return new Promise((resolve, reject) => {
        reader.readEntries(resolve, reject);
      });
    });
}

export function readFileEntry(path: string, filesystem: FileSystem): Promise<string> {
  return getFileEntry(path, filesystem)
    .then(fileEntry => {
      return new Promise<string>((resolve, reject) => {
        fileEntry.file(file => {
          resolve(file.text());
        }, reject);
      });
    });
}

export function writeFileEntry(path: string, content: Blob, filesystem: FileSystem): Promise<void> {
  return getFileEntry(path, filesystem)
    .then(fileEntry => {
      return new Promise<void>((resolve, reject) => {
        fileEntry.createWriter((writer: FileWriter) => {
          writer.write(content);
          resolve();
        }, reject);
      });
    });
}

export function writeFileString(path: string, content: string, filesystem: FileSystem) {
  return writeFileEntry(path, new Blob([content], { type: "text/plan" }), filesystem);
}

function executeOnEntry(path: string, action: (entry: MyFileSystemEntry) => void, filesystem: FileSystem): Promise<any> {
  return getDirectoryEntry(path, filesystem)
    .then(action)
    .catch(() => {
      return getFileEntry(path, filesystem)
        .then(action);
    });
}

export function getEntryMetadata(path: string, filesystem: FileSystem): Promise<Metadata> {
  return executeOnEntry(path, entry => {
    return new Promise<Metadata>((resolve, reject) => {
      entry.getMetadata(resolve, reject);
    });
  }, filesystem);
}

export function copyEntryTo(path: string, to: string, filesystem: FileSystem, newName?: string): Promise<MyFileSystemEntry> {
  return executeOnEntry(path, entry => {
    return new Promise<MyFileSystemEntry>((resolve, reject) => {
      getDirectoryEntry(to, filesystem).then(toEntry => {
        entry.copyTo(toEntry, newName, resolve, reject);
      });
    });
  }, filesystem);
}

export function moveEntryTo(path: string, to: string, filesystem: FileSystem, newName?: string): Promise<MyFileSystemEntry> {
  return executeOnEntry(path, entry => {
    return new Promise<MyFileSystemEntry>((resolve, reject) => {
      getDirectoryEntry(to, filesystem).then(toEntry => {
        entry.copyTo(toEntry, newName, resolve, reject);
      });
    });
  }, filesystem);
}

export function removeEntry(path: string, filesystem: FileSystem): Promise<void> {
  return executeOnEntry(path, entry => {
    return new Promise<void>((resolve, reject) => {
      entry.remove(resolve, reject);
    });
  }, filesystem);
}

export function removeDirectoryRecursively(path: string, filesystem: FileSystem) {
  return getDirectoryEntry(path, filesystem)
    .then(dir => {
      return new Promise<void>((resolve, reject) => {
        dir.removeRecursively(resolve, reject)
      })
    });
}

export function getEntryURL(path: string, filesystem: FileSystem, mimeType?: string): Promise<string> {
  return executeOnEntry(path, entry => {
    return entry.toURL(mimeType);
  }, filesystem);
}


