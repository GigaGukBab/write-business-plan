import FiveMinDocsLogo from "./FiveMinDocsLogo";
import HeaderNav from "./HeaderNav";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4 border-b border-foreground/10">
      <FiveMinDocsLogo />
      <HeaderNav />
    </header>
  );
}
