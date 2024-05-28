import commands from "src/components/Apps/CommandInterpreter/commands.ts";
import { Terminal } from "@xterm/xterm";


export function runCommand(commandAsString: string, path: string, env: object, terminal: Terminal): Promise<string> {
  const commandAndArgs = commandAsString.split(/\s(?=(?:[^']*'[^']*')*[^']*$)(?=(?:[^"]*"[^"]*")*[^"]*$)/); // splits the command by separator, but not when its in a "" or ''
  let commandFunction: (args: string[], path: string, env: object, terminal: Terminal) => Promise<string>;
    try {
      commandFunction = commands[commandAndArgs[0]];
      return commandFunction(commandAndArgs.slice(1), path, env, terminal);
    } catch (e) {
      return new Promise<string>((resolve) => resolve("No command found"))
    }
}