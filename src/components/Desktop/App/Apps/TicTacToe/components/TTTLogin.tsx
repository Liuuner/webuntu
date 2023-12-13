import React, { Dispatch, SetStateAction, useState } from "react";
import { DataConnection, Peer } from "peerjs";

type TTTLoginProps = {
  peer: Peer | undefined;
  setPeer: Dispatch<SetStateAction<Peer | undefined>>;
  setConn: Dispatch<SetStateAction<DataConnection | undefined>>
  setPlayerNum: Dispatch<SetStateAction<number>>;
}

export function TTTLogin(props: TTTLoginProps) {
  const [username, setUsername] = useState("");
  const [oppUsername, setOppUsername] = useState("");

  function onConnOpen(conn: DataConnection) {
    props.setConn(conn);
    conn.on("close", function() {
      props.setConn(undefined);
      props.setPeer(peer => {
        if (peer) {
          setUsername(peer.id);
        }
        return peer;
      });
    });
  }

  function onPeerClose() {
    props.setConn(undefined);
    props.setPeer(undefined);
  }

  function setupPeer() {
    const peer = new Peer(username, { debug: 3 });
    peer.on("open", function(id) {
      setUsername(id);
      props.setPeer(peer);
      peer.on("connection", function(conn) {
        onConnOpen(conn);
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
        const conn = peer.connect(oppUsername);
        conn.on("open", function() {
          onConnOpen(conn);
          props.setPlayerNum(1)
        });

      }
      return peer;
    });

  }

  return (
    <>
      <h2>TicTacToe</h2>
      <div>
        <p><label htmlFor={"username-input"}>Choose your Username:</label></p>
        <p><input id={"username-input"} type="text" value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
        <p><input id={"oppusername-input"} type="text" value={oppUsername}
                  onChange={(e) => setOppUsername(e.target.value)} disabled={!props.peer} /></p>
        <p>
          <button onClick={connectToGame} disabled={!props.peer}>Connect to Game</button>
        </p>
      </div>
    </>
  );
}