import styles from "./FormReviewContent.module.scss";
import { useAtom } from "jotai";
import {
  _editingFieldStatus,
  BusinessPlanInfoField,
  BusinessPlanInfoFormData,
} from "@/app/states/save";
import React, { useCallback } from "react";

export default function FormReviewContent({
  businessPlanInfoContent,
  formData,
  setFormData,
}: {
  businessPlanInfoContent: {
    title: string;
    subtitle: string;
    businessPlanInfoField: BusinessPlanInfoField;
  }[];
  formData: BusinessPlanInfoFormData;
  setFormData: React.Dispatch<React.SetStateAction<BusinessPlanInfoFormData>>;
}) {
  const [editingFieldStatus, setEditingFieldStatus] =
    useAtom(_editingFieldStatus);

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleEditField = useCallback((field: BusinessPlanInfoField) => {
    setEditingFieldStatus((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  return businessPlanInfoContent.map((item) => (
    <div key={item.businessPlanInfoField} className={styles.reviewItem}>
      <div className={styles.reviewHeader}>
        <h3>{item.title}</h3>
        <button
          className={styles.editButton}
          onClick={() => handleEditField(item.businessPlanInfoField)}
        >
          {editingFieldStatus[item.businessPlanInfoField] ? "완료" : "수정"}
        </button>
      </div>
      <input
        type="text"
        value={formData[item.businessPlanInfoField]}
        onChange={(e) => {
          handleInputChange(item.businessPlanInfoField, e.target.value);
        }}
        disabled={!editingFieldStatus[item.businessPlanInfoField]}
        className={styles.reviewInput}
      />
    </div>
  ));
}
