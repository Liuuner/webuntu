import { AbstractShelly } from "src/components/Apps/ShellyV2/AbstractShelly.ts";
import { commandResult } from "src/components/Apps/ShellyV2/types.ts";
import { command } from "src/components/Apps/ShellyV2/types.ts";
import { commands } from "src/components/Apps/ShellyV2/commands.ts";
import { Shelly } from "src/components/Apps/ShellyV2/Shelly.ts";

export class ShellyCommand extends AbstractShelly{
  private _resultString = "";
  private _shelly: Shelly;

  constructor(shelly: Shelly) {
    super();
    this._shelly = shelly;
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
    console.log("command print")
    console.log(this._shelly)
    this._resultString += text;
    return this._shelly.print(text);
  }

}