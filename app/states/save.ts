import { atom } from "jotai";

export type StepNumber = 1 | 2 | 3 | 4 | 5 | 6;
export type BusinessPlanInfoField =
  | "title"
  | "motivation"
  | "development_state"
  | "team_info"
  | "goal_market";
export type BusinessPlanInfoFormData = Record<BusinessPlanInfoField, string>;
export type EditingFieldsType = Record<BusinessPlanInfoField, boolean>;
export const _editingFieldStatus = atom<EditingFieldsType>({
  title: false,
  motivation: false,
  development_state: false,
  team_info: false,
  goal_market: false,
});
