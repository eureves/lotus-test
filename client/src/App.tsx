import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Table } from "./components/Table/Table";
import { Bidder } from "./shared/types/types";

const api = import.meta.env.PROD
  ? import.meta.env.BASE_URL
  : "http://192.168.112.128:3000";
console.log(api);

const socket = io(api);

function App() {
  const [connected, setConnected] = useState(false);
  const [bidders, setBidders] = useState<Bidder[]>();
  const [currentBidder, setCurrentBidder] = useState(0);
  const [timer, setTimer] = useState(0);
  const [rooms, setRoom] = useState(null);

  const handleConnect = () => {
    socket.emit("room:join", "1");
  };

  const handleStart = () => {
    socket.emit("room:startTimer", "1");
  };

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });
    socket.on("room:timerUpdate", (counter) => {
      setTimer(counter);
    });
    socket.on("room:bidders", (bidders) => {
      setBidders(bidders);
    });
    socket.on("room:currentBidder", (bidder) => {
      setCurrentBidder(bidder);
    });

    fetch(api + "/api/rooms")
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);

  return (
    <div style={{ margin: "auto", width: "75vw" }}>
      {connected && bidders ? (
        <Table bidders={bidders} currentBidder={currentBidder} timer={timer} />
      ) : null}
      <button onClick={handleConnect}>Connect</button>
      <button onClick={handleStart}>Start</button>
    </div>
  );
}

export default App;
