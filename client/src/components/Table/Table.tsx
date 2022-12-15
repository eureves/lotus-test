import { Bidder } from "../../shared/types/types";
import { TableData } from "../TableColumn/TableColumn";
import { TableHeader } from "../TableHeader/TableHeader";
import styles from "../../shared/styles/style.module.css";

type Props = {
  bidders: Bidder[];
  currentBidder: number;
  timer: number;
};

export const Table = ({ bidders, currentBidder, timer }: Props) => {
  return (
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
  );
};
