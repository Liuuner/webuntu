import './TicTacToe.css'
import {TTTRow} from "./components/TTTRow.tsx";
import {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";

export const GameStateContext = createContext<[number[], Dispatch<SetStateAction<number[]>>] | null>(null)

export function TicTacToe() {
  const [gameState, setGameState] = useState([0, 1, 2, 0, 1, 2, 0, 1, 2])

  useEffect(() => {

  }, [])

  return (
    <>
      <GameStateContext.Provider value={[gameState, setGameState]}>
        <table>
          <tbody>
            <TTTRow rowIndex={1} rowBtnStates={gameState.slice(0, 3)}/>
            <TTTRow rowIndex={2} rowBtnStates={gameState.slice(3, 6)}/>
            <TTTRow rowIndex={3} rowBtnStates={gameState.slice(6, 9)}/>
          </tbody>
        </table>
      </GameStateContext.Provider>
    </>
  )
}