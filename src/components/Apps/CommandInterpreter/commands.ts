import { listDirectory } from "src/components/Apps/CommandInterpreter/commands/fsCommands.ts";

const commands: {[key: string]: (args: string[], path: string, env: object) => Promise<string>} = {
  "ls": listDirectory,
  "test": (args, path, env) => new Promise((resolve) => resolve(args.join(" ")))
};

export default commands;