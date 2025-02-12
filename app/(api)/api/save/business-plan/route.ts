import { z } from "zod";
import { initializeDatabase } from "@/api/lib/db";
import { BusinessPlanInfo } from "@/api/lib/entity";
import { v4 } from "uuid";
import { BusinessPlanSchema } from "./types";

export async function POST(request: Request) {
  try {
    const dataSource = await initializeDatabase();

    const body = await request.json();
    const validatedData = BusinessPlanSchema.parse(body);

    const businessPlanInfo = new BusinessPlanInfo();
    businessPlanInfo.id = v4();
    businessPlanInfo.title = validatedData.title;
    businessPlanInfo.motivation = validatedData.motivation;
    businessPlanInfo.development_state = validatedData.development_state;
    businessPlanInfo.team_info = validatedData.team_info;
    businessPlanInfo.goal_market = validatedData.goal_market;
    businessPlanInfo.created_at = new Date();

    const businessPlanInfoRepository =
      dataSource.getRepository(BusinessPlanInfo);
    await businessPlanInfoRepository.save(businessPlanInfo);

    return Response.json({ success: true, data: businessPlanInfo });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return Response.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    return Response.json(
      { success: false, message: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
