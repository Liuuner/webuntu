import { ShellyCommand } from "src/components/Apps/ShellyV2/ShellyCommand.ts";

export type envObject = {[key: string]: string};
export type commandResult = { status: number, result?: string }
export type command = (args: string[], shelly: ShellyCommand) => Promise<number>;