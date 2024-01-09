import { useRef, useState } from "react";
import { MediaConnection, Peer } from "peerjs";
import "./peerCall.css";

export default function PeerCall() {
  const [callId, setCallId] = useState("");
  const [peerId, setPeerId] = useState("");
  const [peer, setPeer] = useState<undefined | Peer>();
  const [call, setCall] = useState<undefined | MediaConnection>();
  const localVideo = useRef<null | HTMLVideoElement>(null);
  const remoteVideo = useRef<null | HTMLVideoElement>(null);

  function startPeer() {
    const peer = new Peer(peerId, { debug: 3 });
    peer.on("open", function(id) {
      setPeerId(id);
      setPeer(peer);
      peer.on("call", (call) => {
        if (window.confirm(`Accept call from ${call.peer}?`)) {
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
              if (localVideo.current) {
                localVideo.current.style.display = "block";
                localVideo.current.srcObject = stream;
                localVideo.current.play();
                call.answer(stream);
                call.on("stream", (remoteStream) => {
                  if (remoteVideo.current) {
                    remoteVideo.current.style.display = "block";
                    remoteVideo.current.srcObject = remoteStream;
                    remoteVideo.current.play();
                  }
                });
                setCall(call);
                setCallId(call.peer);
                call.on("close", () => {
                  endCall();
                });

              }
            })
            .catch((err) => {
              console.log("Failed to get local stream:", err);
            });
        } else {
          call.close();
        }
      });
    });
  }

  async function startCall() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    if (localVideo.current) {
      localVideo.current.style.display = "block";
      localVideo.current.srcObject = stream;
      localVideo.current.play();
    }

    if (peer) {
      const call = peer.call(callId, stream);
      call.on("stream", (stream) => {
        if (remoteVideo.current) {
          remoteVideo.current.style.display = "block";
          remoteVideo.current.srcObject = stream;
          remoteVideo.current.play();
        }
      });
      call.on("error", (err) => {
        console.log(err);
      });
      call.on("close", () => {
        endCall();
      });

      setCall(call);
    }
  }

  function endCall() {
    if (localVideo.current) localVideo.current.style.display = "none";
    if (remoteVideo.current) remoteVideo.current.style.display = "none";
    if (!call) return;
    if (call) {
      call.localStream.getTracks().forEach(value => value.stop());
    }
    try {
      call.close();
    } catch {
    }
    setCall(undefined);
  }

  return (
    <div id={"peer-call"}>
      <div id={"peer-call-menu"}>
        <h2>Peer-Call</h2>
        <input type="text" placeholder={"Your username"} value={peerId} onChange={(e) => setPeerId(e.target.value)}
               disabled={peer?.open} />
        <button onClick={startPeer} disabled={peer?.open}>start peer</button>
        <br />
        <input type="text" placeholder={"Connect to username"} value={callId}
               onChange={(e) => setCallId(e.target.value)}
               disabled={call?.open || !peer?.open} />
        <button onClick={startCall} disabled={call?.open || !peer}>start call</button>
      </div>
      <>
        <button id={"end-call"} onClick={endCall} disabled={!call?.open}>end call</button>
        <video id={"remote-video"} ref={remoteVideo} />
        <video id={"local-video"} ref={localVideo} />
      </>
    </div>
  );
}