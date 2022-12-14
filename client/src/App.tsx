import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import styles from "./app.module.css";

type Bidder = {
  id: string;
  hisTurn: boolean;
  parameters: string;
  boostStandards: boolean;
  timeToExecute: number;
  warranty: number;
  payment: number;
  price: number;
};

const socket = io("http://192.168.112.128:8080");

const TableHeader = () => {
  return (
    <div className={styles.subtable}>
      <div className={styles.header}>Ход</div>
      <div className={styles.header}>Параметры и требования </div>
      <div className={styles.cell}>
        Наиличие комплекса меропрятий, повышаюших стандарты качества
        изготовления
      </div>
      <div className={styles.cell}>Срок изготовления лота, дней</div>
      <div className={styles.cell}>Гарантийные обязательства, мес</div>
      <div className={styles.cell}>Условия оплаты</div>
      <div className={styles.cell}>
        Стоимость изготовления лота, руб без НДС
      </div>
      <div className={styles.cell}>Действия:</div>
    </div>
  );
};

const TableData = ({
  bidder,
  timer,
}: {
  bidder: Bidder;
  timer: number | null;
}) => {
  return (
    <div className={styles.subtable}>
      <div className={styles.header}>{timer}</div>
      <div className={styles.header}>{bidder.parameters}</div>
      <div className={styles.cell}>{bidder.boostStandards}</div>
      <div className={styles.cell}>{bidder.timeToExecute}</div>
      <div className={styles.cell}>{bidder.warranty}</div>
      <div className={styles.cell}>{bidder.payment}</div>
      <div className={styles.cell}>{bidder.price}</div>
      <div className={styles.cell}></div>
    </div>
  );
};

function App() {
  const [connected, setConnected] = useState(false);
  const [bidders, setBidders] = useState<Bidder[]>();
  const [currentBidder, setCurrentBidder] = useState(0);
  const [timer, setTimer] = useState(0);

  const handleConnect = () => {
    socket.emit("room:join", "1");
    setConnected(true);
  };

  const handleStart = () => {
    socket.emit("room:startTimer", "1");
  };

  useEffect(() => {
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
      <button onClick={handleConnect}>Connect</button>
      <button onClick={handleStart}>Start</button>
      {connected && bidders ? (
        <div className={styles.table}>
          <TableHeader />
          {bidders.map((bidder, index) => {
            return (
              <TableData
                key={bidder.id}
                bidder={bidder}
                timer={index === currentBidder ? timer : null}
              />
            );
          })}
        </div>
      ) : null}
    </>
  );
}

export default App;
