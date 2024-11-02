import commands from "src/components/Apps/CommandInterpreter/commands.ts";
import { Terminal } from "@xterm/xterm";
import { command } from "src/components/Apps/CommandInterpreter/types.ts";


export function runCommand(commandAsString: string, path: string, env: object, terminal: Terminal): Promise<string> {
  const commandAndArgs = commandAsString.split(/\s(?=(?:[^']*'[^']*')*[^']*$)(?=(?:[^"]*"[^"]*")*[^"]*$)/); // splits the command by separator, but not when its in a "" or ''
  let commandFunction: command;
    try {
      commandFunction = commands[commandAndArgs[0]];
      return commandFunction(commandAndArgs.slice(1), path, env, terminal);
    } catch (e) {
      return new Promise<string>((resolve) => resolve("No command found"))
    }
}

export class CommandInterpreter {
  readonly static DEFAULT_ENV = {}
  readonly static DEFAULT_PATH = "/"
  readonly static DEFAULT_USER = ""
  private env =
  private path = "/"
  constructor(env: {}, path: string) {
    this.env
  }
}