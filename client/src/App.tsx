import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Table } from "./components/Table/Table";
import { Bidder } from "./shared/types/types";

const socket = io(import.meta.env.BASE_URL);

function App() {
  const [connected, setConnected] = useState(false);
  const [bidders, setBidders] = useState<Bidder[]>();
  const [currentBidder, setCurrentBidder] = useState(0);
  const [timer, setTimer] = useState(0);

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
    socket.on("timerUpdate", (counter) => {
      setTimer(counter);
    });
    socket.on("room:bidders", (bidders) => {
      setBidders(bidders);
    });
    socket.on("room:currentBidder", (bidder) => {
      setCurrentBidder(bidder);
    });
  }, []);

  return (
    <>
      {connected && bidders ? (
        <Table bidders={bidders} currentBidder={currentBidder} timer={timer} />
      ) : null}
      <button onClick={handleConnect}>Connect</button>
      <button onClick={handleStart}>Start</button>
    </>
  );
}

export default App;
