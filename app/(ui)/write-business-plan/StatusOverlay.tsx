import { useEffect } from "react";
import styles from "./StatusOverlay.module.scss";

type StatusType = "idle" | "processing" | "success" | "error";

interface StatusConfig {
  icon: string;
  title: string;
  description: string;
}

const STATUS_CONFIGS: Record<Exclude<StatusType, "idle">, StatusConfig> = {
  processing: {
    icon: "🔄",
    title: "제출 중입니다",
    description: "잠시만 기다려주세요...",
  },
  error: {
    icon: "❌",
    title: "오류가 발생했습니다",
    description: "다시 시도해주세요",
  },
  success: {
    icon: "✅",
    title: "성공!",
    description: "사업계획서가 성공적으로 제출되었습니다",
  },
};

export default function StatusOverlay({
  status,
  onClose,
  closeDelay,
}: {
  status: StatusType;
  onClose?: () => void;
  closeDelay: number;
}) {
  useEffect(() => {
    if (status === "success" && onClose) {
      const timer = setTimeout(onClose, closeDelay);
      return () => clearTimeout(timer);
    }
  }, [status, onClose, closeDelay]);

  return status === "idle" ? null : (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.icon}>{STATUS_CONFIGS[status].icon}</div>
        <h3 className={styles.title}>{STATUS_CONFIGS[status].title}</h3>
        <p className={styles.description}>
          {STATUS_CONFIGS[status].description}
        </p>
        {status === "error" && (
          <button onClick={onClose} className={styles.button}>
            다시 시도하기
          </button>
        )}
      </div>
    </div>
  );
}
