import "./TicTacToe.css";
import { useState } from "react";
import { TTTGame } from "./components/TTTGame.tsx";
import { TTTLogin } from "./components/TTTLogin.tsx";
import { DataConnection, Peer } from "peerjs";

export function TicTacToe() {
  const [peer, setPeer] = useState<Peer | undefined>(undefined);
  const [conn, setConn] = useState<DataConnection | undefined>(undefined);
  const [playerNum, setPlayerNum] = useState(0)

  return (
    <>
      {conn
        ? (<TTTGame conn={conn} playerNum={playerNum}/>)
        : (<TTTLogin peer={peer} setPeer={setPeer} setConn={setConn} setPlayerNum={setPlayerNum}/>)
      }
    </>
  );
}