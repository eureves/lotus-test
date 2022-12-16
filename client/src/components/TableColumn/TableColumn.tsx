import { Bidder } from "../../shared/types/types";
import styles from "../../shared/styles/style.module.css";
import { Timer } from "../Timer/TImer";

type Props = {
  bidder: Bidder;
  timer: number | null;
};

export const TableColumn = ({ bidder, timer }: Props) => {
  return (
    <div className={styles.subtable}>
      <div className={styles.header}>
        {timer ? <Timer time={timer} /> : null}
      </div>
      <div className={styles.header}>{bidder.parameters}</div>
      <div className={styles.cell}>{bidder.boostStandards ? "+" : "-"}</div>
      <div className={styles.cell}>{bidder.timeToExecute}</div>
      <div className={styles.cell}>{bidder.warranty}</div>
      <div className={styles.cell}>{bidder.payment}</div>
      <div className={styles.cell}>{bidder.price}</div>
      <div className={styles.cell}></div>
    </div>
  );
};
