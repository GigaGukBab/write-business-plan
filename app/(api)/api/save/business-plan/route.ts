export async function POST(request: Request) {
  const body = await request.json();
  const flagForTest = true;
  if (flagForTest) {
    return Response.json({ body });
  } else {
    throw new Error("저장 실패");
  }
}
