import "./Shelly.css";
import { useRef, useState } from "react";
import { runCommand } from "src/components/Apps/CommandInterpreter/commandInterpreter.ts";
import Xterm from "src/components/Apps/Shelly/XTerm.tsx";
import { XTermV2 } from "src/components/Apps/Shelly/XTermV2.tsx";
import { Terminal } from "@xterm/xterm";

export default function Shelly() {
  const [executedCommands, setExecutedCommands] = useState<{ command: string, result: string }[]>([]);
  const commandRef = useRef<string>("")
  const terminalRef = useRef<Terminal | null>(null);
  const pathRef = useRef("root")
  const envRef = useRef<{[key: string]: string}>({"?": "0", "_": "bash"})


  function executeCommand() {
    //setCommand("");
    //const currentCommand = command;
    //runCommand(currentCommand, "root", {})
    //  .then(result => {
    //    setExecutedCommands(executedCommands => [...executedCommands, { command: currentCommand, result }]);
    //  });
  }

  function onKey(event: {key: string, domEvent: KeyboardEvent}){
    console.log("Key:" + event.domEvent.key)
  }

  function onData(data: string | Uint8Array){
    console.log("Data:'" + data + "'")
    if (data === "\x1b") {
      console.log("Escape key pressed");
    } else if (data === "\r") {
      // Process the input when Enter is pressed
      console.log("Enter")
      terminalRef.current?.writeln("")
      terminalRef.current?.writeln(commandRef.current)
      console.log(commandRef.current)
      commandRef.current = ""
    } else if (data === "\x7f" || data === "\b") {
      if (commandRef.current.length > 0) {
        commandRef.current = commandRef.current.substring(0, commandRef.current.length - 1);
        // Move the cursor back one space, print a space (to clear the character), and move back again
        terminalRef.current?.write("\b \b");
      }
    } else {
      commandRef.current += data; // Accumulate the input
      terminalRef.current?.write(data); // Echo the input character
    }
  }

  return (
    <>
      <XTermV2
        onData={onData}
        onTerminal={(terminal) => terminalRef.current = terminal}
        onBinary={(data) => console.log("Binary:" + data)}
        onCursorMove={() => console.log("Cursor")}
        onKey={onKey}
        onLineFeed={() => console.log("LineFeed")}
        onRender={(event) => console.log("Render:" + event.toString())}
        onResize={(event) => console.log("Resize:" + event.toString())}
        onScroll={(newPosition) => console.log("Scroll:" + newPosition)}
        onSelectionChange={() => console.log("SelectionChange")}
        onTitleChange={(newTitle) => console.log("NewTitle:" + newTitle)}
      />
    </>
  );
}