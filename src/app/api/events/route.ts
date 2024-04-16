import { addData, getData } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const data = await getData("events");
    return NextResponse.json(
      {
        success: true,
        data: data,
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

export async function POST(request: NextRequest) {
  try {
    const token: any = request.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");

    if (decoded && decoded.role === "admin") {
      const data = await request.json();

      if (!data.athletes) {
        data.athletes = [];
      }

      const status = await addData("events", data);
      if (status) {
        return NextResponse.json(
          {
            success: true,
            message: "Add event successfully",
            data,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Add event failed",
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
