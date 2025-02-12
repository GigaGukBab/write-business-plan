import { z } from "zod";

export const BusinessPlanSchema = z.object({
  title: z.string().min(1),
  motivation: z.string().min(1),
  development_state: z.string().min(1),
  team_info: z.string().min(1),
  goal_market: z.string().min(1),
});
