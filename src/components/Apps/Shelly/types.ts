import { Shelly } from "src/components/Apps/Shelly/Shelly.ts";

export type envObject = {[key: string]: string};
export type commandResult = {status: number, result?: string}
export type command = (args: string[], shelly: Shelly) => Promise<number>;