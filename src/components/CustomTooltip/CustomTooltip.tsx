import styles from "./CustomTooltip.module.css"

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const minutes = payload[0].value;
    return (
      <div className={styles.tooltip}>
        <p><strong>{label}</strong></p>
        <p>Время: {minutes} мин</p>
      </div>
    );
  }
  return null;
};
