import fs from "indexeddb-fs";
import { EEntryType, IEntry } from "indexeddb-fs/dist/types";
import { Shelly } from "src/components/Apps/Shelly/Shelly.ts";

export async function listDirectory(args: string[], shelly: Shelly) {
  const output = await fs.readDirectory(shelly.getPath());
  const entries: IEntry<EEntryType>[] = [...output.directories, ...output.files];
  shelly.println(entries.map(entry => entry.name).join(" "));
  return 0;
}

export async function printWorkingDirectory(_: string[], shelly: Shelly) {
  shelly.println(shelly.getPath());
  return 0;
}