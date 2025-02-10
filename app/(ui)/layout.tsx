import Header from "../components/Header";
import styles from "./layout.module.scss";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.root}>
      <Header />
      {children}
    </div>
  );
}
