import { TTTRow } from "./TTTRow.tsx";
import { useEffect, useState } from "react";
import { DataConnection } from "peerjs";

type TTTGameProps = {
  conn: DataConnection;
  playerNum: number;
}

export function TTTGame(props: TTTGameProps) {
  const [gameState, setGameState] = useState([0, 1, 2, 0, 1, 2, 0, 1, 2]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    props.conn.on("data", function(data: number[]) {
      evaluate(data, true)
      setGameState(data)
    })
  }, []);

  function evaluate(tmpGameState: number[], inc: boolean) {
    //Check if right person on move
    //Check if no one has won
    //Check if move is legal (not already set)
    return;
  }

  function setField(index: number) {
    setGameState(gameState => {
      const tmpGameState = [...gameState];
      tmpGameState[index] = props.playerNum;
      evaluate(tmpGameState, false);
      props.conn.send(tmpGameState);
      return tmpGameState;
    });
  }

  function isBtnDisabled(index: number): boolean{
    return true;
  }

  return (
    <table>
      <tbody>
        <TTTRow rowIndex={1} rowBtnStates={gameState.slice(0, 3)} />
        <TTTRow rowIndex={2} rowBtnStates={gameState.slice(3, 6)} />
        <TTTRow rowIndex={3} rowBtnStates={gameState.slice(6, 9)} />
      </tbody>
    </table>
  );
}