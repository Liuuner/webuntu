import "./Terminator.css";
import { useEffect, useRef } from "react";
import { XTermV2 } from "src/components/Apps/Terminator/XTermV2.tsx";
import { Terminal } from "@xterm/xterm";
import {Shelly} from "src/components/Apps/ShellyV2/Shelly"

export default function Terminator() {
  const commandRef = useRef<string>("")
  const terminalRef = useRef<Terminal | null>(null);
  const shellyRef = useRef<Shelly>(new Shelly())

  window.shelly = shellyRef.current

  useEffect(() => {
    if (!terminalRef.current?.write) return;
    shellyRef.current.setPrintMethod(terminalRef.current?.write)
  }, [terminalRef])

  function onKey(event: {key: string, domEvent: KeyboardEvent}){
    console.log("Key:" + event.domEvent.key)
  }

  function onData(data: string | Uint8Array){
    if (!terminalRef.current || !shellyRef.current) return
    console.debug("Data:'" + data + "'")
    if (data === "\x1b") {
      console.debug("Escape key pressed");
    } else if (data === "\r") {
      // Process the input when Enter is pressed
      console.debug("Enter")
      terminalRef.current?.writeln("");
      shellyRef.current.runCommand(commandRef.current)
      console.debug(commandRef.current)
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
        onBinary={(data) => console.debug("Binary:" + data)}
        onCursorMove={() => console.debug("Cursor")}
        onKey={onKey}
        onLineFeed={() => console.debug("LineFeed")}
        onRender={(event) => console.debug("Render:" + event.toString())}
        onResize={(event) => console.debug("Resize:" + event.toString())}
        onScroll={(newPosition) => console.debug("Scroll:" + newPosition)}
        onSelectionChange={() => console.debug("SelectionChange")}
        onTitleChange={(newTitle) => console.debug("NewTitle:" + newTitle)}
      />
    </>
  );
}