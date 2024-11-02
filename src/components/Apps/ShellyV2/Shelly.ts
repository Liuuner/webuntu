import { command, commandResult } from "src/components/Apps/Shelly/types.ts";
import { commands } from "src/components/Apps/Shelly/commands.ts";
import { ShellyCommand } from "src/components/Apps/ShellyV2/ShellyCommand.ts";
import { AbstractShelly } from "src/components/Apps/ShellyV2/AbstractShelly.ts";

export class Shelly extends AbstractShelly{
  private _history: ShellyCommand[] = []

  public async runCommand(input: string): Promise<commandResult> {
    //const shellyCommand = new ShellyCommand(this.getPath(), this.getUser(), this.getEnv(), this.print)
    const shellyCommand = new ShellyCommand(this)
    this._history.push(shellyCommand);
    return shellyCommand.runCommand(input);
  }

  public print(text: string): void {
    console.log("shelly print");
    console.log(this);
    super.print(text);
  }

}