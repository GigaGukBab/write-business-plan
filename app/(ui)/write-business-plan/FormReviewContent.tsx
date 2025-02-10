import styles from "./FormReviewContent.module.scss";
import { useAtom } from "jotai";
import { _editingFieldStatus } from "@/app/states/save";
import React from "react";

export default function FormReviewContent({
  businessPlanInfoContent,
  formData,
  setFormData,
}: {
  businessPlanInfoContent: {
    title: string;
    subtitle: string;
    field:
      | "title"
      | "motivation"
      | "development_state"
      | "team_info"
      | "goal_market";
  }[];
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  const [editingFieldStatus, setEditingFieldStatus] =
    useAtom(_editingFieldStatus);
  return businessPlanInfoContent.map((item) => (
    <div key={item.field} className={styles.reviewItem}>
      <div className={styles.reviewHeader}>
        <h3>{item.title}</h3>
        <button
          className={styles.editButton}
          onClick={() =>
            setEditingFieldStatus((prev) => ({
              ...prev,
              [item.field]: !prev[item.field],
            }))
          }
        >
          {editingFieldStatus[item.field] ? "완료" : "수정"}
        </button>
      </div>
      <input
        type="text"
        value={formData[item.field]}
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            [item.field]: e.target.value,
          }));
        }}
        disabled={!editingFieldStatus[item.field]}
        className={styles.reviewInput}
      />
    </div>
  ));
}
