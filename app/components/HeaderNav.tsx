import Link from "next/link";

const navItems = [
  {
    name: "AI 사업계획서 작성",
    href: "/write-business-plan",
  },
  {
    name: "정부지원 사업 추천",
    href: "#",
  },
  {
    name: "사업계획서 분석",
    href: "#",
  },
  {
    name: "요금",
    href: "#",
  },
  {
    name: "전문가 상담",
    href: "#",
  },
  {
    name: "프로모션",
    href: "#",
  },
  {
    name: "로그인/회원가입",
    href: "#",
  },
  {
    name: "고객센터",
    href: "#",
  },
];

export default function HeaderNav() {
  return (
    <nav className="flex gap-8">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="cursor-pointer text-foreground/80 hover:text-foreground"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
