import fs from "indexeddb-fs"
import { EEntryType, IEntry } from "indexeddb-fs/dist/types";
import { Terminal } from "@xterm/xterm";

export async function listDirectory(args: string[], path: string, env: object, terminal: Terminal) {
  const output = await fs.readDirectory(path)
  const entries: IEntry<EEntryType>[] = [...output.directories, ...output.files]
  return entries.map(entry => entry.name).join(" ")
}