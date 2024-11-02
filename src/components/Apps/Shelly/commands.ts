import { command } from "src/components/Apps/Shelly/types.ts";
import { listDirectory, printWorkingDirectory } from "src/components/Apps/Shelly/commands/fsCommands.ts";

export const commands: { [key: string]: command } = {
  "test": (args, shelly) => {
    shelly.println("hallo")
    return new Promise(resolve => resolve(0));
  },
  "ls": listDirectory,
  "pwd": printWorkingDirectory
};