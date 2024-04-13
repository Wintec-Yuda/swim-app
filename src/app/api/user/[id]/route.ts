import { getDataById } from "@/lib/firebase/service";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  const userId = req.url.split("/").pop();
  try {
    const data: any = await getDataById("users", userId);
    delete data.role;

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
