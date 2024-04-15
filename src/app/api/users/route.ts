import { getData } from "@/lib/firebase/service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getData("users");
    const filteredData = data.filter((user: any) => user.role !== "admin");
    return NextResponse.json(
      {
        success: true,
        data: filteredData,
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
