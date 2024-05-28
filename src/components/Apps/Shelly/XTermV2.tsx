import { ITerminalAddon, ITerminalOptions, Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import "@xterm/xterm/css/xterm.css"

type XTermV2Props = {
  /**
   * Class name to add to the terminal container.
   */
  className?: string
  id?: string

  /**
   * Options to initialize the terminal with.
   */
  options?: ITerminalOptions

  /**
   * An array of XTerm addons to load along with the terminal.
   */
  addons?: Array<ITerminalAddon>

  onTerminal?(terminal: Terminal): void

  /**
   * Adds an event listener for when a binary event fires. This is used to
   * enable non UTF-8 conformant binary messages to be sent to the backend.
   * Currently this is only used for a certain type of mouse reports that
   * happen to be not UTF-8 compatible.
   * The event value is a JS string, pass it to the underlying pty as
   * binary data, e.g. `pty.write(Buffer.from(data, 'binary'))`.
   */
  onBinary?(data: string): void

  /**
   * Adds an event listener for the cursor moves.
   */
  onCursorMove?(): void

  /**
   * Adds an event listener for when a data event fires. This happens for
   * example when the user types or pastes into the terminal. The event value
   * is whatever `string` results, in a typical setup, this should be passed
   * on to the backing pty.
   */
  onData?(data: string): void

  /**
   * Adds an event listener for when a key is pressed. The event value contains the
   * string that will be sent in the data event as well as the DOM event that
   * triggered it.
   */
  onKey?(event: { key: string; domEvent: KeyboardEvent }): void

  /**
   * Adds an event listener for when a line feed is added.
   */
  onLineFeed?(): void

  /**
   * Adds an event listener for when a scroll occurs. The event value is the
   * new position of the viewport.
   * @returns an `IDisposable` to stop listening.
   */
  onScroll?(newPosition: number): void

  /**
   * Adds an event listener for when a selection change occurs.
   */
  onSelectionChange?(): void

  /**
   * Adds an event listener for when rows are rendered. The event value
   * contains the start row and end rows of the rendered area (ranges from `0`
   * to `Terminal.rows - 1`).
   */
  onRender?(event: { start: number; end: number }): void

  /**
   * Adds an event listener for when the terminal is resized. The event value
   * contains the new size.
   */
  onResize?(event: { cols: number; rows: number }): void

  /**
   * Adds an event listener for when an OSC 0 or OSC 2 title change occurs.
   * The event value is the new title.
   */
  onTitleChange?(newTitle: string): void

  /**
   * Attaches a custom key event handler which is run before keys are
   * processed, giving consumers of xterm.js ultimate control as to what keys
   * should be processed by the terminal and what keys should not.
   *
   * @param event The custom KeyboardEvent handler to attach.
   * This is a function that takes a KeyboardEvent, allowing consumers to stop
   * propagation and/or prevent the default action. The function returns
   * whether the event should be processed by xterm.js.
   */
  customKeyEventHandler?(event: KeyboardEvent): boolean
}

export function XTermV2(props: XTermV2Props){
  const terminalDivRef = useRef<HTMLDivElement | null>(null)
  const terminalRef = useRef<Terminal | null>(null)

  useEffect(() => {
    if (terminalRef.current) return
    terminalRef.current = new Terminal(props.options)

    if (props.addons) {
      props.addons.forEach((addon) => {
        terminalRef.current?.loadAddon(addon)
      })
    }

    if (props.onBinary) terminalRef.current?.onBinary(props.onBinary)
    if (props.onCursorMove) terminalRef.current?.onCursorMove(props.onCursorMove)
    if (props.onData) terminalRef.current?.onData(props.onData)
    if (props.onTerminal) props.onTerminal(terminalRef.current)
    if (props.onKey) terminalRef.current?.onKey(props.onKey)
    if (props.onLineFeed) terminalRef.current?.onLineFeed(props.onLineFeed)
    if (props.onScroll) terminalRef.current?.onScroll(props.onScroll)
    if (props.onSelectionChange) terminalRef.current?.onSelectionChange(props.onSelectionChange)
    if (props.onRender) terminalRef.current?.onRender(props.onRender)
    if (props.onResize) terminalRef.current?.onResize(props.onResize)
    if (props.onTitleChange) terminalRef.current?.onTitleChange(props.onTitleChange)

    if (props.customKeyEventHandler) {
      terminalRef.current?.attachCustomKeyEventHandler(props.customKeyEventHandler)
    }

    if (terminalDivRef.current){
      terminalRef.current?.open(terminalDivRef.current)
    }
  }, [])

  return (
    <div id={props.id} className={props.className} ref={terminalDivRef}></div>
  )
}