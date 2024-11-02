import { commandResult } from "src/components/Apps/Shelly/types.ts";
import { envObject } from "src/components/Apps/ShellyV2/types.ts";

export abstract class AbstractShelly {
  public static readonly DEFAULT_PATH = "root";
  public static readonly DEFAULT_ENV = {};
  public static readonly DEFAULT_USER = "root";
  public static readonly DEFAULT_PRINT_METHOD = (data: string) => {
    console.log(data);
  };

  private _path: string;
  private _env: envObject= {};
  private _user: string;
  private _printMethod: (data: string) => void;

  constructor(path = AbstractShelly.DEFAULT_PATH, user = AbstractShelly.DEFAULT_USER, env = AbstractShelly.DEFAULT_ENV, printMethod = AbstractShelly.DEFAULT_PRINT_METHOD) {
    this._path = path;
    this._user = user;
    this._env = env;
    this._printMethod = printMethod;
  }

  public abstract runCommand(input: string): Promise<commandResult>;

  public print(text: string) {
    console.log("abstract print");
    console.log(this);
    return this._printMethod(text);
  }

  public println(text: string) {
    return this.print(text + "\n");
  }

  public setPrintMethod(print: (data: string) => void) {
    this._printMethod = print;
    console.log(this._printMethod)
  }

  public getPrintMethod(){
    return this._printMethod;
  }

  public setPath(path: string) {
    this._path = path;
  }

  public getPath() {
    return this._path;
  }

  public setEnv(env: envObject) {
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