import styles from "./layout.module.scss";
import Header from "@/components/Header";
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
