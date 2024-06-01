import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DataConnection, Peer } from "peerjs";
import { Alert, AlertColor, Box, Button, Container, TextField, Typography } from "@mui/material";

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
  const [msg, setMsg] = useState("Connect to a game");
  const [msgSeverity, setMsgSeverity] = useState<AlertColor>("info");

  function onConnOpen(conn: DataConnection) {
    props.setConn(conn);
    props.setGameOn(true);
  }

  function onPeerClose() {
    props.setPlayerNum(6);
    props.setGameOn(false);
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
        props.setOppUsername(conn.peer);
        props.setPlayerNum(2);
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
          props.setPlayerNum(1);
        });

      }
      return peer;
    });

  }

  useEffect(() => {
    let tmpMsg = "Connect to a game";
    let tmpMsgSeverity: AlertColor = "info";
    switch (props.playerNum) {
      case 3:
        tmpMsg = "You won against " + props.oppUsername;
        break;
      case 4:
        tmpMsg = "You lost against " + props.oppUsername;
        break;
      case 5:
        tmpMsg = "Error: Game corrupted";
        tmpMsgSeverity = "error";
        break;
      case 6:
        tmpMsg = "Error: Disconnected";
        tmpMsgSeverity = "error";
        break;
    }
    setMsg(tmpMsg);
    setMsgSeverity(tmpMsgSeverity);
  }, [props.playerNum]);

  return (
    <>
      <Container maxWidth={"xs"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Alert severity={msgSeverity}>
            {msg}
          </Alert>
          <Box component="form">
            <TextField margin={"normal"} fullWidth id={"username-input"} type="text" value={props.username}
                       label={"Choose your Username"}
                       onChange={(e) => props.setUsername(e.target.value)}
                       disabled={!!props.peer} />
            <Button fullWidth onClick={setupPeer} variant={"contained"} disabled={!!props.peer}>Connect</Button>
            <TextField margin={"normal"} fullWidth id={"oppusername-input"} type="text" value={props.oppUsername}
                       label={"Your opponents Username"}
                       onChange={(e) => props.setOppUsername(e.target.value)} disabled={!props.peer} />
            <Button fullWidth variant={"contained"} onClick={connectToGame} disabled={!props.peer}>Connect to
              Game</Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}