import "./PeerTacToe.css";
import { useState } from "react";
import { TTTGame } from "./components/TTTGame.tsx";
import { TTTLogin } from "./components/TTTLogin.tsx";
import { DataConnection, Peer } from "peerjs";

export default function PeerTacToe() {
  const [peer, setPeer] = useState<Peer | undefined>(undefined);
  const [conn, setConn] = useState<DataConnection | undefined>(undefined);
  const [playerNum, setPlayerNum] = useState(0);
  const [username, setUsername] = useState("");
  const [oppUsername, setOppUsername] = useState("");
  const [gameOn, setGameOn] = useState(false)

  return (
    <div id={"tic-tac-toe"}>
      {gameOn && conn
        ? (<TTTGame conn={conn} setConn={setConn}
                    playerNum={playerNum} setPlayerNum={setPlayerNum}
                    setGameOn={setGameOn}/>)
        : (<TTTLogin setConn={setConn}
                     peer={peer} setPeer={setPeer}
                     setPlayerNum={setPlayerNum} playerNum={playerNum}
                     username={username} setUsername={setUsername}
                     oppUsername={oppUsername} setOppUsername={setOppUsername}
                     setGameOn={setGameOn}/>)
      }
    </div>
  );
}