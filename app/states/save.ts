import { atom } from "jotai";

type EditingFieldsType = Record<
  "title" | "motivation" | "development_state" | "team_info" | "goal_market",
  boolean
>;

export const _editingFieldStatus = atom<EditingFieldsType>({
  title: false,
  motivation: false,
  development_state: false,
  team_info: false,
  goal_market: false,
});
