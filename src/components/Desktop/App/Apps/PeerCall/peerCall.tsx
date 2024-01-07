import { useEffect, useRef, useState } from "react";
import { MediaConnection, Peer } from "peerjs";

export function PeerCall(){
  const [connId, setConnId] = useState("")
  const [peerId, setPeerId] = useState("")
  const [peer, setPeer] = useState<undefined | Peer>()
  const [call, setCall] = useState<undefined | MediaConnection>()
  const localVideo = useRef<null | HTMLVideoElement>(null)
  const remoteVideo = useRef<null | HTMLVideoElement>(null)

  function startPeer() {
    const peer = new Peer(peerId, { debug: 3 });
    peer.on("open", function(id) {
      setPeerId(id)
      setPeer(peer)
      peer.on("call", (call) => {
        if (confirm(`Accept call from ${call.peer}?`)) {
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
              if (localVideo.current){
                localVideo.current.srcObject = stream;
                localVideo.current.play();
                call.answer(stream);
                setCall(call)

                call.on("stream", (remoteStream) => {
                  if (remoteVideo.current){
                    remoteVideo.current.srcObject = remoteStream;
                    remoteVideo.current.play();
                  }
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

  async function startCall(){
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (localVideo.current){
      localVideo.current.srcObject = stream
      localVideo.current.play()
    }

    if (peer){
      const call = peer.call(peerId, stream);
      call.on("stream", (stream) => {
        if (remoteVideo.current != null){
          remoteVideo.current.srcObject = stream
          remoteVideo.current.play()
        }
      });
      call.on("error", (err) => {
        console.log(err);
      });
      call.on('close', () => {
        endCall()
      })

      setCall(call)
    }
  }

  function endCall(){
    if (call){
      call.close()
    }
  }

  return (
    <div>
      <input type="text" value={peerId} onChange={(e) => setPeerId(e.target.value)} />
      <button onClick={startPeer}>start peer</button>
      <input type="text" value={connId} onChange={(e) => setConnId(e.target.value)}/>
      <button onClick={startCall}>start call</button>
      <button onClick={endCall}>end call</button>
      <video ref={remoteVideo}/>
      <video ref={localVideo}/>
    </div>
  )
}