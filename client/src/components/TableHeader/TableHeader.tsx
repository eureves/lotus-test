import styles from "../../styles/style.module.css";

export const TableHeader = () => {
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
