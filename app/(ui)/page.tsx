export default function HomePage() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="max-w-6xl px-4">
        <div className="space-y-8 text-center">
          <h1 className="text-5xl font-bold">
            5분 만에 완성하는 <span className="text-[#8000ff]">사업계획서</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            AI가 당신의 비즈니스 아이디어를 전문적인 사업계획서로
            변환해드립니다. 복잡한 형식에 대해 걱정하지 마세요.
          </p>
          <div className="pt-4">
            <a
              href="/write-business-plan"
              className="inline-block px-8 py-4 bg-[#8000ff] text-white rounded-lg 
                       hover:bg-[#8000ff]/90 transition-colors text-lg font-medium"
            >
              지금 시작하기
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
