import { CommandInterface } from "src/components/Apps/Shelly/CommandInterface.ts";

export class ShellyCommandSession implements CommandInterface{
  private _commandString: string;
  private _path: string;
  private _env: {[key: string]: string} = {};
  private _user: string;
  private _resultString = ""
  private _returnCode: number;

  constructor(commandString: string, path: string, env: {[key: string]: string} = {}) {
    this._commandString = commandString;
    this._path = path;
    this._env = env;
    this._user = env.user;
  }

  run(){

  }

}