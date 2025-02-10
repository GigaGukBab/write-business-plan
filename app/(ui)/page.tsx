import Link from "next/link";
import styles from "./page.module.scss";

export default function HomePage() {
  return (
    <div className={styles.root}>
      <div className={styles.introMainContainer}>
        <h1 className={styles.introTitle}>
          5분 만에 완성하는 <span>사업계획서</span>
        </h1>
        <p className={styles.introDescription}>키워드를 입력. 계획서가 짠.</p>
        <div className={styles.introButtonContainer}>
          <Link href="/write-business-plan">지금 시작하기</Link>
        </div>
      </div>
    </div>
  );
}
