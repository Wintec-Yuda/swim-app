import { addAthlete } from "@/lib/firebase/service";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const token: any = request.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");

    if (decoded && decoded.role === "user") {
      const status = await addAthlete(decoded.id, data);
      if (status) {
        return NextResponse.json(
          {
            success: true,
            message: "Add athlete successfully",
            data,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Add athlete failed",
          },
          { status: 500 }
        );
      }
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
