import { NextRequest, NextResponse } from "next/server";
import { getSearchParams } from "./getSearchParams";

type ApiKey = { apiKey: string };

export const apiRouteValidation = async (req: NextRequest) => {
  const DATA_API_KEY = await getSearchParams<ApiKey>(req);
  if (!DATA_API_KEY && DATA_API_KEY !== process.env.DATA_API_KEY)
    return NextResponse.json({ error: "WRONG API KEY" });
};
