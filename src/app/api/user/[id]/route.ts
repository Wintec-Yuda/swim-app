import { getDataById } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const token: any = request.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");

    if (decoded && decoded.role === "user") {
      const userId: any = request.url.split("/").pop();
      const data: any = await getDataById("users", userId);
      delete data.role;
      return NextResponse.json(
        {
          success: true,
          data,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }
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
