import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DataConnection, Peer } from "peerjs";

type TTTLoginProps = {
  peer: Peer | undefined;
  setPeer: Dispatch<SetStateAction<Peer | undefined>>;
  setConn: Dispatch<SetStateAction<DataConnection | undefined>>
  setPlayerNum: Dispatch<SetStateAction<number>>;
  playerNum: number
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  oppUsername: string;
  setOppUsername: Dispatch<SetStateAction<string>>;
  setGameOn: Dispatch<SetStateAction<boolean>>;
}

export function TTTLogin(props: TTTLoginProps) {
  const [msg, setMsg] = useState("Connect to a game")

  function onConnOpen(conn: DataConnection) {
    props.setConn(conn);
    props.setGameOn(true)
  }

  function onPeerClose() {
    props.setPlayerNum(6)
    props.setGameOn(false)
    props.setConn(undefined);
    props.setPeer(undefined);
  }

  function setupPeer() {
    const peer = new Peer(props.username, { debug: 3 });
    peer.on("open", function(id) {
      props.setUsername(id);
      props.setPeer(peer);
      peer.on("connection", function(conn) {
        onConnOpen(conn);
        props.setOppUsername(conn.peer)
        props.setPlayerNum(2)
      });
      peer.on("close", function() {
        onPeerClose();
      });
      peer.on("disconnected", function() {
        onPeerClose();
      });
    });
  }

  function connectToGame() {
    props.setPeer(peer => {
      if (peer) {
        const conn = peer.connect(props.oppUsername);
        conn.on("open", function() {
          onConnOpen(conn);
          props.setPlayerNum(1)
        });

      }
      return peer;
    });

  }

  useEffect(() => {
    let tmpMsg = "Connect to a game"
    switch (props.playerNum){
      case 3: tmpMsg = "You won against " + props.oppUsername; break;
      case 4: tmpMsg = "You lost against " + props.oppUsername; break;
      case 5: tmpMsg = "Error: Game corrupted"; break;
      case 6: tmpMsg = "Error: Disconnected"; break
    }
    setMsg(tmpMsg)
  }, [props.playerNum]);

  return (
    <>
      <h2>Peer-to-Peer TicTacToe</h2>
      <h3>{msg}</h3>
      <div>
        <p><label htmlFor={"username-input"}>Choose your Username:</label></p>
        <p><input id={"username-input"} type="text" value={props.username}
                  onChange={(e) => props.setUsername(e.target.value)}
                  disabled={!!props.peer} />
        </p>
        <p>
          <button onClick={setupPeer}
                  disabled={!!props.peer}>Connect
          </button>
        </p>
      </div>
      <div>
        <p><label htmlFor={"oppusername-input"}>Your opponents Username:</label></p>
        <p><input id={"oppusername-input"} type="text" value={props.oppUsername}
                  onChange={(e) => props.setOppUsername(e.target.value)} disabled={!props.peer} /></p>
        <p>
          <button onClick={connectToGame} disabled={!props.peer}>Connect to Game</button>
        </p>
      </div>
    </>
  );
}