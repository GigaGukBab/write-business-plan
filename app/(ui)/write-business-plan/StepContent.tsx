"use client";

import { useEffect, useRef } from "react";
import styles from "./StepContent.module.scss";

export default function StepContent({
  currentStep,
  content,
  businessInfoInputValue,
  onChange,
}: {
  currentStep: number;
  content: {
    title: string;
    subtitle: string;
  }[];
  businessInfoInputValue: string;
  onChange: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentStep]);

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{content[currentStep - 1].title}</h2>
      <p className={styles.subtitle}>{content[currentStep - 1].subtitle}</p>
      <input
        ref={inputRef}
        type="text"
        placeholder="입력"
        className={styles.businessInfoInput}
        value={businessInfoInputValue}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
