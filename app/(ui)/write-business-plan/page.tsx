"use client";

import { useState } from "react";
import styles from "./page.module.scss";

const steps = [
  {
    title: "아이템의 한 줄 제목을 입력해주세요",
    subtitle: '(OO를 위해 OOO를 접목한 OOO 제품/서비스 "제품/서비스명")',
  },
  {
    title: "아이템의 개발 동기를 입력해주세요",
    subtitle:
      "(시장에서 OO 문제를 발견하고, 이 문제를 해결하기 위해 OOO 기술을 접목한 서비스를 만듦)",
  },
  {
    title: "아이템의 현재 개발 상황에 대해 입력해주세요",
    subtitle: "(서비스 기획 완료, 서비스 론칭 완료, 제품 개발 완료 등)",
  },
  {
    title: "대표님과 팀원에 대해 소개를 입력해주세요",
    subtitle:
      "(대표자는 OO 분야의 전문가로 n년의 경험을 통해 이전 문제들을 파악함)",
  },
  {
    title: "아이템의 목표 시장을 입력해주세요",
    subtitle:
      "(tam: 글로벌 유아용 화장품 시장, sam: 아시아 유아용 화장품 시장, som: 한국 유아용 화장품 시장)",
  },
];

export default function WriteBusinessPlanFormPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className={styles.root}>
      <main className="max-w-3xl mx-auto px-8 py-8">
        <h1 className="text-2xl mb-8 text-foreground">사업계획서 작성하기</h1>

        <div className="h-2 bg-foreground/10 rounded mb-4">
          <div
            className="h-full bg-[#8000ff] rounded transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
        <div className="text-foreground/60 mb-8">Step {currentStep} of 5</div>
        <div className="mb-8">
          <h2 className="text-xl mb-2 text-foreground font-bold">
            {steps[currentStep - 1].title}
          </h2>
          <p className="text-foreground/60 mb-6">
            {steps[currentStep - 1].subtitle}
          </p>
          <input
            type="text"
            placeholder="입력"
            className="w-full p-4 border border-foreground/10 rounded-md bg-background text-foreground placeholder:text-foreground/40 
            focus:outline-none focus:ring-1 focus:ring-[#8000ff]/50 dark:focus:ring-[#8000ff] dark:focus:border-[#8000ff] 
            dark:border-white/20"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="px-6 py-3 rounded-md dark:bg-white/10 bg-foreground/5 text-foreground hover:bg-foreground/10 dark:hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
            disabled={currentStep === 5}
            className="px-6 py-3 rounded-md bg-[#8000ff] text-white hover:bg-[#8000ff]/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
