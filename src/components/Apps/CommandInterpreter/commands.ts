import { listDirectory } from "src/components/Apps/CommandInterpreter/commands/fsCommands.ts";
import { command } from "src/components/Apps/CommandInterpreter/types.ts";

const commands: {[key: string]: command} = {
  "ls": listDirectory,
  "test": (args, path, env) => new Promise((resolve) => resolve(args.join(" ")))
};

export default commands;