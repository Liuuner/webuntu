import { command } from "src/components/Apps/ShellyV2/types.ts";
import { listDirectory, printWorkingDirectory } from "src/components/Apps/ShellyV2/commands/fsCommands.ts";

export const commands: { [key: string]: command } = {
  "test": (args, shelly) => {
    shelly.println("hallo")
    return new Promise(resolve => resolve(0));
  },
  "ls": listDirectory,
  "pwd": printWorkingDirectory
};