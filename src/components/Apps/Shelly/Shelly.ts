import { command, commandResult } from "src/components/Apps/Shelly/types.ts";
import { commands } from "src/components/Apps/Shelly/commands.ts";

export class Shelly {
  private static readonly DEFAULT_PATH = "root"
  private static readonly DEFAULT_ENV = {}
  private static readonly DEFAULT_USER = "root"
  private _path: string;
  private _env: {[key: string]: string} = {};
  private _user: string;
  private _print = (text: string) => {
    console.log(text);
  };
  private _resultString = "";

  constructor(path = Shelly.DEFAULT_PATH, user = Shelly.DEFAULT_USER, env = Shelly.DEFAULT_ENV) {
    this._path = path;
    this._user = user;
    this._env = env;
  }

  public async runCommand(input: string): Promise<commandResult> {
    const commandAndArgs = input.split(/\s(?=(?:[^']*'[^']*')*[^']*$)(?=(?:[^"]*"[^"]*")*[^"]*$)/); // splits the command by separator, but not when its in a "" or ''
    let commandFunction: command;
    this._resultString = "";
    if (commandAndArgs[0] in commands){
      commandFunction = commands[commandAndArgs[0]];
      const status = await commandFunction(commandAndArgs.slice(1), this);
      return { status, result: this._resultString };
    }
    return { status: 127 , result: "No command found"};
  }

  public print(text: string) {
    this._resultString += text;
    return this._print(text);
  }

  public println(text: string) {
    return this.print(text + "\n");
  }

  public setPrint(print: (text: string) => void) {
    this._print = print;
  }

  public setPath(path: string) {
    this._path = path;
  }

  public getPath() {
    return this._path;
  }

  public setEnv(env: object) {
    this._env = env;
  }

  public getEnv() {
    return this._env;
  }

  public setUser(user: string) {
    this._user = user;
  }

  public getUser() {
    return this._user;
  }
}