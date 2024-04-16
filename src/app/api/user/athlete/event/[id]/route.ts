import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { addAthlete } from "@/lib/firebase/service";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const token: any = request.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
    const id: any = request.url.split("/").pop();

    if (decoded && decoded.role === "user") {
      const status = await addAthlete("events", id, data);
      if (status) {
        return NextResponse.json(
          {
            success: true,
            message: `Add ${data.fullname} to event successfully`,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Add athlete to event failed",
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
