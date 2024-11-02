import { envObject } from "src/components/Apps/Shelly/types.ts";

export interface CommandInterface {
  nestedCommandInterface: CommandInterface;

  get env(): envObject;

  get path(): string;

  get user(): string;


}