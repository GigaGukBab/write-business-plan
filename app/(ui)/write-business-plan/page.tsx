"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import StepContent from "./StepContent";
import ActionButton from "./ActionButton";
import FormReviewContent from "./FormReviewContent";
import {
  _editingFieldStatus,
  BusinessPlanInfoField,
  BusinessPlanInfoFormData,
  StepNumber,
} from "@/states/save";
import { useAtomValue } from "jotai";
import StatusOverlay from "./StatusOverlay";
import { useRouter } from "next/navigation";

const businessPlanInfoContent: {
  title: string;
  subtitle: string;
  businessPlanInfoField: BusinessPlanInfoField;
}[] = [
  {
    title: "아이템의 한 줄 제목을 입력해주세요",
    subtitle: '(OO를 위해 OOO를 접목한 OOO 제품/서비스 "제품/서비스명")',
    businessPlanInfoField: "title" as const,
  },
  {
    title: "아이템의 개발 동기를 입력해주세요",
    subtitle:
      "(시장에서 OO 문제를 발견하고, 이 문제를 해결하기 위해 OOO 기술을 접목한 서비스를 만듦)",
    businessPlanInfoField: "motivation" as const,
  },
  {
    title: "아이템의 현재 개발 상황에 대해 입력해주세요",
    subtitle: "(서비스 기획 완료, 서비스 론칭 완료, 제품 개발 완료 등)",
    businessPlanInfoField: "development_state" as const,
  },
  {
    title: "대표님과 팀원에 대해 소개를 입력해주세요",
    subtitle:
      "(대표자는 OO 분야의 전문가로 n년의 경험을 통해 이전 문제들을 파악함)",
    businessPlanInfoField: "team_info" as const,
  },
  {
    title: "아이템의 목표 시장을 입력해주세요",
    subtitle:
      "(tam: 글로벌 유아용 화장품 시장, sam: 아시아 유아용 화장품 시장, som: 한국 유아용 화장품 시장)",
    businessPlanInfoField: "goal_market" as const,
  },
];

export default function WriteBusinessPlanFormPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [status, setStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState<BusinessPlanInfoFormData>({
    title: "",
    motivation: "",
    development_state: "",
    team_info: "",
    goal_market: "",
  });
  const editingFieldStatus = useAtomValue(_editingFieldStatus);
  const [isAnyFieldEditing, setIsAnyFieldEditing] = useState(false);

  const isReviewStep = currentStep === 6;
  const progressPercentage = (Math.min(currentStep, 5) / 5) * 100;

  const handleInputChange = (step: StepNumber, value: string) => {
    const field = businessPlanInfoContent[step - 1].businessPlanInfoField;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStepBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1) as StepNumber);
  };

  const handleStepForward = () => {
    setCurrentStep((prev) => Math.min(6, prev + 1) as StepNumber);
  };

  const handleSubmit = async () => {
    setStatus("processing");
    try {
      const response = await fetch("/api/save/business-plan", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.status !== 200) {
        throw new Error();
      }
      setStatus("success");
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    setIsAnyFieldEditing(
      Object.values(editingFieldStatus).some((value) => value === true)
    );
  }, [editingFieldStatus]);

  return (
    <div className={styles.root}>
      <div className={styles.mainForm}>
        <h1 className={styles.title}>사업계획서 작성하기</h1>
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className={styles.stepIndicator}>
          {isReviewStep ? "최종 확인" : `Step ${currentStep} of 5`}
        </div>

        {isReviewStep ? (
          <div className={styles.reviewContainer}>
            <h2 className={styles.reviewTitle}>입력하신 내용을 확인해주세요</h2>
            <FormReviewContent
              businessPlanInfoContent={businessPlanInfoContent}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        ) : (
          <StepContent
            currentStep={currentStep}
            content={businessPlanInfoContent}
            businessInfoInputValue={
              formData[
                businessPlanInfoContent[currentStep - 1].businessPlanInfoField
              ]
            }
            onChange={(value) => handleInputChange(currentStep, value)}
          />
        )}

        <div className={styles.buttonContainer}>
          <ActionButton
            type="back"
            onClick={handleStepBack}
            disabled={currentStep === 1 || status === "processing"}
          />
          {isReviewStep ? (
            <ActionButton
              type="submit"
              onClick={handleSubmit}
              disabled={status === "processing" || isAnyFieldEditing}
            />
          ) : (
            <ActionButton
              type="next"
              onClick={handleStepForward}
              disabled={
                formData[
                  businessPlanInfoContent[currentStep - 1].businessPlanInfoField
                ] === ""
              }
            />
          )}
        </div>
      </div>

      <StatusOverlay
        status={status}
        onClose={() => setStatus("idle")}
        closeDelay={2000}
      />
    </div>
  );
}
