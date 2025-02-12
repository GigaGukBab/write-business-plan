"use client";

import { useEffect, useRef } from "react";
import styles from "./StepContent.module.scss";

export default function StepContent({
  currentStep,
  content,
  businessInfoInputValue,
  onChange,
  onEnterPress,
}: {
  currentStep: number;
  content: {
    title: string;
    subtitle: string;
  }[];
  businessInfoInputValue: string;
  onChange: (value: string) => void;
  onEnterPress: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentStep]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && businessInfoInputValue.trim() !== "") {
      onEnterPress();
    }
  };

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{content[currentStep - 1].title}</h2>
      <p className={styles.subtitle}>{content[currentStep - 1].subtitle}</p>
      <div className={styles.inputContainer}>
        <input
          ref={inputRef}
          type="text"
          placeholder="입력"
          className={styles.businessInfoInput}
          value={businessInfoInputValue}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <span className={styles.enterIcon}>⏎</span>
      </div>
    </div>
  );
}
