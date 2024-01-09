import { TTTRow } from "./TTTRow.tsx";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { DataConnection } from "peerjs";

type TTTGameProps = {
  setConn: Dispatch<SetStateAction<DataConnection | undefined>>;
  conn: DataConnection;
  setPlayerNum: Dispatch<SetStateAction<number>>;
  playerNum: number;
  setGameOn: Dispatch<SetStateAction<boolean>>;
}

export function TTTGame(props: TTTGameProps) {
  const [gameState, setGameState] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [newGameState, setNewGameState] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const inputType = useRef(0);

  useEffect(() => {
    props.conn.on("data", function(data) {
      inputType.current = 2;
      console.log("recv", data);
      setNewGameState(data as number[]);
    });
    props.conn.on("close", function() {
      props.setGameOn(false)
      props.setConn(undefined)
    });
  }, [props.conn]);

  function setField(index: number) {
    setNewGameState(newGameState => {
      const tmpGameState = [...newGameState];
      tmpGameState[index] = props.playerNum;
      inputType.current = 1;
      props.conn.send(tmpGameState);
      return tmpGameState;
    });
  }

  useEffect(() => {
    console.log("use-effect-new", newGameState);
    if (inputType.current > 0) {
      evaluate(newGameState, gameState);
      setGameState(newGameState);
      inputType.current = 0;
    }
  }, [newGameState]);

  function endGame(status: number) {
    console.log("exit-game", status);
    props.setPlayerNum(status);
    props.setGameOn(false)
  }

  function checkIfWon(num1: number, num2: number, num3: number, newGameState: number[]) {
    if (newGameState[num1] == newGameState[num2] && newGameState[num2] == newGameState[num3]) {
      if (newGameState[num1] == 0) {
        return;
      } else if (newGameState[num1] == props.playerNum) {
        endGame(3);
      } else {
        endGame(4);
      }
    }
  }

  function evaluate(newGameState: number[], oldGameState: number[]) {
    console.log("=============evaluate==========");
    console.log("old", oldGameState);
    console.log("new", newGameState);
    //Check if player can do move
    if ((gameState.filter(state => state == 0).length % 2 == props.playerNum - 1) && inputType.current == 1) {
      console.log("player not at turn");
      endGame(5);
    }

    //Check if not more than on field has been changed

    //Check if field has not already been set
    for (let i = 0; i < oldGameState.length - 1; i++) {
      if (newGameState[i] != 0 && oldGameState[i] != 0 && newGameState[i] != oldGameState[i]) {
        console.log("field already set");
        endGame(5);
      }
    }

    //Check if someone has won
    //horizontal
    for (let i = 1; i <= 3; i++) {
      checkIfWon(i * 3 - 1, i * 3 - 2, i * 3 - 3, newGameState);
    }
    //vertical
    for (let i = 6; i <= 8; i++) {
      checkIfWon(i, i - 3, i - 6, newGameState);
    }
    //diagonal
    checkIfWon(0, 4, 8, newGameState);
    checkIfWon(2, 4, 6, newGameState);
    console.log("=============ev done==========");
    return;
  }


  function isBtnDisabled(index: number): boolean {
    return gameState.filter(state => state == 0).length % 2 == props.playerNum - 1 || gameState[index] != 0;
  }

  function getBtnState(index: number): JSX.Element | string{
    switch (gameState[index]) {
      case 1:
        return "X";
      case 2:
        return "O";
    }
    if (gameState.filter(state => state == 0).length % 2 != props.playerNum - 1){
      switch (props.playerNum){
        case 1:
          return "X";
        case 2:
          return "O";
      }
    }
    return <>&emsp;</>
  }

  return (
    <table id={"ttt-game"}>
      <tbody>
        <TTTRow rowIndex={1} isBtnDisabled={isBtnDisabled} getBtnState={getBtnState} setField={setField} />
        <TTTRow rowIndex={2} isBtnDisabled={isBtnDisabled} getBtnState={getBtnState} setField={setField} />
        <TTTRow rowIndex={3} isBtnDisabled={isBtnDisabled} getBtnState={getBtnState} setField={setField} />
      </tbody>
    </table>
  );
}