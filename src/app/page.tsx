import { ExpenseExtractor } from "../components/ExpenseExtractor/ExpenseExtractor";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <h1>ExpenseExtractor</h1>
      </header>
      <main className={styles.main}>
        <ExpenseExtractor />
      </main>
    </div>
  );
}
