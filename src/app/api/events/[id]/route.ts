import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { deleteDataById } from "@/lib/firebase/service";

export async function DELETE(request: NextRequest) {
  try {
    const token: any = request.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
    const id: any = request.url.split("/").pop();

    if (decoded && decoded.role === "admin") {
      const status = await deleteDataById("events", id);
      if (status) {
        return NextResponse.json(
          {
            success: true,
            message: "Delete event successfully",
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Delete event failed",
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
