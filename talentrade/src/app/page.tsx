import Link from "next/link";
import styles from "./page.module.css";
import { IoSearch } from "react-icons/io5";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 className={styles.mainBigTxt}>LOOKING <br /> FOR HELP?</h1>
        <h3 className={styles.mainSmallTxt}>Just look up the field of your choice!</h3>
        <div className={styles.mainSearch}>
          <input type="text" placeholder="Search..." className={styles.mainInput} />
          <Link href="/results">
            <IoSearch className={styles.mainIcon} />
          </Link>
        </div>
      </div>
    </main>
  );
}
