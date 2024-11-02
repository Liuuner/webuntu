export type terminal = {
  print: (data: string) => void
  readLine: () => string;
}
// eslint-disable-next-line no-unused-vars
export type command = (args: string[], path: string, env: {[key: string]: string}, terminal: terminal) => Promise<number>;