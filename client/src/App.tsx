import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Table } from "./components/Table/Table";
import { Bidder } from "../../src/types/types";

const api = import.meta.env.PROD
  ? import.meta.env.BASE_URL
  : "http://192.168.112.128:3000";

const socket = io(api);
const roomId = "1";

function App() {
  const [connected, setConnected] = useState(false);
  const [bidders, setBidders] = useState<Bidder[]>();
  const [currentBidder, setCurrentBidder] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });
    socket.on("room:timerUpdate", (timer) => {
      setTimer(timer);
    });
    socket.on("room:bidders", (bidders) => {
      setBidders(bidders);
    });
    socket.on("room:currentBidder", (bidder) => {
      setCurrentBidder(bidder);
    });
  }, []);

  const handleConnect = () => {
    socket.emit("room:join", roomId);
  };

  const handleStart = () => {
    socket.emit("room:startTimer", roomId);
  };

  return (
    <div
      style={{
        margin: "auto",
        width: "75vw",
      }}
    >
      {connected && bidders ? (
        <>
          <Table
            bidders={bidders}
            currentBidder={currentBidder}
            timer={timer}
          />
          <button onClick={handleStart}>Запустить таймер</button>
        </>
      ) : (
        <button onClick={handleConnect}>Присоединиться</button>
      )}
    </div>
  );
}

export default App;
