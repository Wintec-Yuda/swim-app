import bcrypt from "bcrypt";
import { getDataByField, addData } from "@/lib/firebase/service";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const existingUser = await getDataByField("users", "email", data.email);
    
    if (existingUser.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is already registered",
        },
        { status: 400 }
      );
    } else {
      if (!data.role) {
        data.role = "user";
      }
      if (!data.athletes) {
        data.athletes = [];
      }

      data.password = await bcrypt.hash(data.password, 10);

      const status = await addData("users", data);
      if (status) {
        return NextResponse.json(
          {
            success: true,
            message: "Registration successfully",
            data,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Registration failed",
          },
          { status: 500 }
        );
      }
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
